import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  StartExercisePrompt,
  CountDownToExercise,
  ExerciseCountDown,
  ExerciseComplete,
} from './components/ExerciseComponents';

const PushUpScreen = ({ navigation }) => {
  const [isCountDown, setIsCountDown] = useState(false);
  const [countDown, setCountDown] = useState(5);
  const [timer, setTimer] = useState(60);
  const [isFinished, setIsFinished] = useState(false);

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
    console.log(pushUpCount);

    navigation.navigate('profile');
  };

  return (
    <View style={styles.container}>
      {!isCountDown ? 
        <StartExercisePrompt 
          heading={"Push up challenge"} 
          subheading={"Perform 35 sit ups"} 
          handleStart={handleStart} 
        />
        : countDown > 0 ?
          <CountDownToExercise countDown={countDown} />
          : (
          <View style={styles.displayContainer}>
            {!isFinished ? 
              <ExerciseCountDown timer={timer} handleFinish={handleFinish} /> 
              : <ExerciseComplete handleComplete={handleComplete} prompt={'Number of push ups performed'}/>
            }
          </View>
          )
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
  displayContainer: {
    alignItems: 'center',
  }
});

export default PushUpScreen;
