import React, { useState, useEffect } from 'react';
import { View, Linking, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
  StartExercisePrompt,
  CountDownToExercise,
  ExerciseCountDown,
  ExerciseComplete,
} from './components/ExerciseComponents';
import { Camera, CameraType } from 'expo-camera';

const PushUpScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isCountDown, setIsCountDown] = useState(false);
  const [countDown, setCountDown] = useState(1);
  const [timer, setTimer] = useState(60);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
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
    <View style={styles.container}>
      {!isCountDown ? 
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
                <Camera style={styles.camera} type={CameraType.front}/>
                <ExerciseCountDown seconds={timer} handleFinish={handleFinish} hasPermission={hasPermission}/> 
              </>
            )
            : <ExerciseComplete handleComplete={handleComplete} prompt={'Number of push ups performed'}/>
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
  camera: {
    borderRadius: 1,
    borderColor:'white',
    width:'100%',
    height:'65%',
    marginVertical: 20,
  },
});

export default PushUpScreen;
