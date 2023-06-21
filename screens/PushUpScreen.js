import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  StartExercisePrompt,
  CountDownToExercise,
  ExerciseCountDown,
  ExerciseSummary,
} from './components/ExerciseComponents';
import { Camera, CameraType } from 'expo-camera';
import * as tf from "@tensorflow/tfjs";
import * as posenet from '@tensorflow-models/posenet';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

const TENSOR_SIZE = {width: 152, height: 200};

const TensorCamera = cameraWithTensors(Camera);

const initialiseTensorflow = async () => {
  await tf.ready();
}

const isNull = item => item === null;

const calculateAngle = (shoulder, elbow, wrist) => {
  const shoulderToElbowVector = [elbow.x - shoulder.x, elbow.y - shoulder.y];
  const wristToElbowVector = [elbow.x - wrist.x, elbow.y - wrist.y];
  const dotProduct = shoulderToElbowVector[0] * wristToElbowVector[0] + shoulderToElbowVector[1] * wristToElbowVector[1];
  const shoulderToElbowMagnitude = Math.sqrt(shoulderToElbowVector[0] * shoulderToElbowVector[0] + shoulderToElbowVector[1] * shoulderToElbowVector[1]);
  const wristToElbowMagnitude = Math.sqrt(wristToElbowVector[0] * wristToElbowVector[0] + wristToElbowVector[1] * wristToElbowVector[1]);
  const cosineAngle = dotProduct / (shoulderToElbowMagnitude * wristToElbowMagnitude);
  const angleRadians = Math.acos(cosineAngle);
  const angleDegrees = angleRadians * (180 / Math.PI);

  return angleDegrees;
}

const PushUpScreen = ({ navigation }) => {
  const [pose, setPose] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [hasStarted, sethasStarted] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const frame = useRef(null);
  const prevPushUpPosition = useRef('up');
  const pushUpCount = useRef(0);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      await initialiseTensorflow();
    })();
    
    return () => {
      cancelAnimationFrame(frame.current);
      tf.dispose();
    }
  }, []);

  useEffect(() => {
    let countDownIntervalId;
    let timerIntervalId;

    if (hasStarted) {
      countDownIntervalId = setInterval(() => {
        setCountDown(prevCountDown => prevCountDown - 1);
      }, 1000);
    }

    if (countDown === 0) {
      clearInterval(countDownIntervalId);

      timerIntervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0 || isFinished) {
      clearInterval(timerIntervalId);
      handleFinish();
    }

    return () => {
      clearInterval(countDownIntervalId);
      clearInterval(timerIntervalId);
    };
  }, [hasStarted, countDown, timer, isFinished]);

  const handleStart = () => sethasStarted(true);

  const handleFinish = () => setIsFinished(true);

  const handleComplete = pushUpCount => {
    // Send pushUpCount to backend and handle success
    navigation.navigate('profile');
  };

  let textureDims = { width: 1920, height: 1080 };
  if (Platform.OS === 'ios') {
    textureDims = {
      height: 1920,
      width: 1080,
    };
  } else {
    textureDims = {
      height: 1200,
      width: 1600,
    };
  }

  const estimatePoseOnImage = async (imageElement) => {
    let [leftShoulder, leftElbow, leftWrist] = [null, null, null];
    let pushUpPosition = null;
    const net = await posenet.load({
      // Can be either `MobileNetV1` or `ResNet50`. It determines which PoseNet architecture to load.
      architecture: 'MobileNetV1',
      // Can be one of `8`, `16`, `32` (Stride `16`, `32` are supported for the ResNet architecture 
      // and stride `8`, `16`, `32` are supported for the MobileNetV1 architecture). 
      // It specifies the output stride of the PoseNet model. 
      // The smaller the value, the larger the output resolution, and more accurate the model at the cost of speed. 
      // Set this to a larger value to increase speed at the cost of accuracy.
      outputStride: 8,
      // This argument controls the bytes used for weight quantization. The available options are:
      // - `4`. 4 bytes per float (no quantization). Leads to highest accuracy and original model size (~90MB).
      // - `2`. 2 bytes per float. Leads to slightly lower accuracy and 2x model size reduction (~45MB).
      // - `1`. 1 byte per float. Leads to lower accuracy and 4x model size reduction (~22MB).
      quantBytes: 2,
      // A `number` or an `Object` of type `{width: number, height: number}`. Defaults to `257.` 
      // It specifies the size the image is resized and padded to before it is fed into the PoseNet model. 
      // The larger the value, the more accurate the model at the cost of speed. Set this to a smaller value to increase speed at the cost of accuracy. 
      // If a number is provided, the image will be resized and padded to be a square with the same width and height.  
      // If `width` and `height` are provided, the image will be resized and padded to the specified width and height.
      inputResolution: { width: TENSOR_SIZE.width, height: TENSOR_SIZE.height },
      // Can be one of `1.01`, `1.0`, `0.75`, or `0.50` (The value is used *only* by the MobileNetV1 architecture and not by the ResNet architecture). 
      // It is the float multiplier for the depth (number of channels) for all convolution ops. 
      // The larger the value, the larger the size of the layers, and more accurate the model at the cost of speed. 
      // Set this to a smaller value to increase speed at the cost of accuracy.
      multiplier: 0.75
    }).catch((err) => err);
    const pose = await net.estimateSinglePose(imageElement, {
      flipHorizontal: false,
    }).catch((err) => err);

    posenet.getAdjacentKeyPoints(pose.keypoints, 0.2).map(
      ([from, to], i) => {
        if (from.part === 'leftShoulder') {
          leftShoulder = from.position;
        } else if (from.part === 'leftElbow') {
          leftElbow = from.position;
          leftWrist = to.part === 'leftWrist' ? to.position : null;
        }
      }
    );

    if (!(isNull(leftShoulder) || isNull(leftElbow) || isNull(leftWrist))) {
      const angle = calculateAngle(leftShoulder, leftElbow, leftWrist);
      console.log(`angle: ${angle}`);

      pushUpPosition = angle < 105 ? 'down' : 'up';
    }

    if (pushUpPosition && pushUpPosition !== prevPushUpPosition.current) { 
      if (prevPushUpPosition.current === 'down' && pushUpPosition === 'up') {
        pushUpCount.current = pushUpCount.current + 1;
        console.log(pushUpCount.current)
      } 
      prevPushUpPosition.current = pushUpPosition;
    }
    
    setPose(pose);
    return pose;
  }

  const handleCameraStream = ( images ) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      await estimatePoseOnImage(nextImageTensor).catch((err) => err);

      tf.dispose([nextImageTensor]);
      frame.current = requestAnimationFrame(loop);
    };
    loop();
  }

  return (
    <View style={styles.container}>
      {!hasStarted ? 
        <StartExercisePrompt 
          heading={"Push up challenge"} 
          subheading={"Perform 35 push ups under 60 seconds"} 
          handleStart={handleStart} 
        />
        : countDown > 0 ?
          <CountDownToExercise countDown={countDown} exerciseType={'push up'}/>
          : !isFinished
            ? (
              <>
                <TensorCamera 
                  style={styles.camera} 
                  type={CameraType.front}
                  resizeHeight={TENSOR_SIZE.height}
                  resizeWidth={TENSOR_SIZE.width}
                  resizeDepth={3}
                  autorender={false}
                  cameraTextureHeight={textureDims.height}
                  cameraTextureWidth={textureDims.width}  
                  onReady={handleCameraStream}
                />
                <Text style={styles.pushUpCountText}>{pushUpCount.current}</Text>
                <ExerciseCountDown seconds={timer} handleFinish={handleFinish}/> 
              </>
            )
            : <ExerciseSummary 
              summary={`You performed ${pushUpCount.current} push ups in ${60 - timer} seconds`} 
              handleComplete={handleComplete}
            />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7D57C1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera : {
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height: '65%',
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 0,
  },
  pushUpCountText: {
    position: 'absolute',
    top: 100,
    zIndex: 5,
    width:'100%',
    height: '100%',
    fontSize: 150,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  }
});

export default PushUpScreen;
