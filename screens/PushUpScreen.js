import React, { useState, useEffect, useRef } from 'react';
import { View, Linking, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Rect, G, Line} from 'react-native-svg';
import {
  StartExercisePrompt,
  CountDownToExercise,
  ExerciseCountDown,
  ExerciseComplete,
} from './components/ExerciseComponents';
import { Camera, CameraType } from 'expo-camera';
import * as tf from "@tensorflow/tfjs";
import * as posenet from '@tensorflow-models/posenet';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

const TENSOR_SIZE = {width: 152, height: 200};

const TensorCamera = cameraWithTensors(Camera);

const initialiseTensorflow = async () => {
  await tf.ready();
  // tf.getBackend();
  //  await posenet.load();
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
  // const [pushUpCount, setPushUpCount] = useState(0);
  const [pose, setPose] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isCountDown, setIsCountDown] = useState(false);
  const [countDown, setCountDown] = useState(1);
  const [timer, setTimer] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const frame = React.useRef(null);
  const prevPushUpPosition = React.useRef('up');
  const pushUpCount = React.useRef(0);

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
      quantBytes: 4,
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
    });
    const pose = await net.estimateSinglePose(imageElement, {
      flipHorizontal: false,
    });

      // let [rightP1, rightP2, rightP3] = [null, null, null];

    posenet.getAdjacentKeyPoints(pose.keypoints, 0.2).map(
      ([from, to], i) => {
        // console.log("from")
        // console.log(from.part);
        // console.log(from.position);
        // console.log("to")
        // console.log(to.part);
        // console.log(to.position);
        // console.log("")
        // console.log(`${from.part} to ${to.part}`);
        if (from.part === 'leftShoulder') {
          leftShoulder = from.position;
        } else if (from.part === 'leftElbow') {
          leftElbow = from.position;
          leftWrist = to.part === 'leftWrist' ? to.position : null;
        }
        // } else if (from.part === 'rightShoulder') {
        //   rightP1 = from.position;
        // } else if (from.part === 'rightElbow') {
        //   rightP2 = from.position;
        //   rightP3 = to.part === 'rightWrist' ? to.position : null;
        // }
      }
    );
    console.log("___________________________________")

    // console.log(leftShoulder);
    // console.log(leftElbow);
    // console.log(leftWrist);
    // console.log("--");

    // console.log(rightP1);
    // console.log(rightP2);
    // console.log(rightP3);

    if (!(isNull(leftShoulder) || isNull(leftElbow) || isNull(leftWrist))) {
      // console.log("calculating left");
      const angle = calculateAngle(leftShoulder, leftElbow, leftWrist);
      console.log("angle");
      console.log(angle);

      pushUpPosition = angle < 90 ? 'down' : 'up';
    }

    // if(!(isNull(rightP1) || isNull(rightP2) || isNull(rightP3))) {
    //   console.log("calculating right");
    //   console.log(calculateAngle(rightP1, rightP2, rightP3));
    // }
    // console.log(`${pushUpPosition} pushUpPosition`);
    // console.log(`${currPushUpPosition} currPushUpPosition`);
    // prevPushUpPosition.current === 'down' && pushUpPosition === 'up' && setPushUpCount(pushUpCount + 1);
    if (pushUpPosition && pushUpPosition !== prevPushUpPosition.current) { 
      if (prevPushUpPosition.current === 'down' && pushUpPosition === 'up') {
        // console.log(`${pushUpCount.current + 1} pushUpCount`);
        pushUpCount.current = pushUpCount.current + 1;
      } 
      // console.log(`SETTING CURRENT PUSH UP POSITION ${pushUpPosition} ${prevPushUpPosition.current}`);
      prevPushUpPosition.current = pushUpPosition;
    }
    
    setPose(pose);
    return pose;
  }

  const handleCameraStream = ( images ) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      const pose = await estimatePoseOnImage(nextImageTensor);

      tf.dispose([nextImageTensor]);
      frame.current = requestAnimationFrame(loop);
    };
    loop();
  }
  console.log("test");
  console.log(pushUpCount.current);

  const renderPose = () => {
    const MIN_KEYPOINT_SCORE = 0.2;
    if (pose != null) {
      const keypoints = pose.keypoints
        .filter(k => k.score > MIN_KEYPOINT_SCORE)
        .map((k,i) => {
          return <Circle
            key={`skeletonkp_${i}`}
            cx={k.position.x}
            cy={k.position.y}
            r='6'
            strokeWidth='0'
            fill='blue'
          />;
        });

      const adjacentKeypoints =
        posenet.getAdjacentKeyPoints(pose.keypoints, MIN_KEYPOINT_SCORE);

      const skeleton = adjacentKeypoints.map(([from, to], i) => {
        return <Line
          key={`skeletonls_${i}`}
          x1={from.position.x}
          y1={from.position.y}
          x2={to.position.x}
          y2={to.position.y}
          stroke='magenta'
          strokeWidth='4'
        />;
      });

      return <Svg height='100%' width='100%'
        viewBox={`0 0 ${textureDims.width} ${textureDims.height}`}>
          {skeleton}
          {keypoints}
        </Svg>;
    } else {
      return null;
    }
  }

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

  // if (!hasPermission) {
  //   requestPermission
  //   const openSetting = async () => await Linking.openSettings();
  //   openSetting();
  // }

  useEffect(() => {
    let countDownIntervalId;
    let timerIntervalId;

    if (isCountDown) {
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
  }, [isCountDown, countDown, timer, isFinished]);

  const handleStart = () => setIsCountDown(true);

  const handleFinish = () => setIsFinished(true);

  const handleComplete = pushUpCount => {
    // Send pushUpCount to backend and handle success
    navigation.navigate('profile');
  };

  // console.log(permission)

  return (
    // <View style={styles.cameraContainer}>
    <View style={styles.container}>
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
      <View style={styles.modelResults}>
        {renderPose()}
      </View>
      <Text style={styles.pushUpCountText}>{pushUpCount.current}</Text>


      {/* {!isCountDown ? 
        <StartExercisePrompt 
          heading={"Push up challenge"} 
          subheading={"Perform 35 push ups"} 
          handleStart={handleStart} 
        />
        : countDown > 0 ?
          <CountDownToExercise countDown={countDown} />
          : !isFinished
            ? (
              <>
                <TensorCamera style={styles.camera} type={CameraType.front}/>
                <ExerciseCountDown seconds={timer} handleFinish={handleFinish} hasPermission={hasPermission}/> 
              </>
            )
            : <ExerciseComplete handleComplete={handleComplete} prompt={'Number of push ups performed'}/>
      } */}
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
  // camera: {
  //   borderRadius: 1,
  //   borderColor:'white',
  //   width:'100%',
  //   height:'65%',
  //   marginVertical: 20,
  // },
  cameraContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
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
  modelResults: {
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height: '65%',
    zIndex: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 0,
  },
  pushUpCountText: {
    position:'absolute',
    zIndex: 10,
    bottom: 0,
    width:'100%',
    height: '30%',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 2,
  }
});

export default PushUpScreen;
