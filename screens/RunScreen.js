import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  StartExercisePrompt,
  CountDownToExercise,
  ExerciseCountDown,
  ExerciseSummary,
} from './components/ExerciseComponents';

const SitUpPage = ({ navigation }) => {
  const [isCountDown, setIsCountDown] = useState(false);
  const [countDown, setCountDown] = useState(1);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const initialMinutes = useRef();
  const initialSeconds = useRef();

  useEffect(() => {
    initialMinutes.current = minutes;
    initialSeconds.current = seconds;
  }, []);

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
        if (minutes === 0 && seconds === 0 || isFinished) {
          clearInterval(timerIntervalId);
          !isFinished && handleFinish();
        } else {
          if (seconds === 0) {
            setMinutes(prevMinutes => prevMinutes - 1);
            setSeconds(59);
          } else {
            setSeconds(prevSeconds => prevSeconds - 1);
          }
        }
      }, 1000);

    }

    return () => {
      clearInterval(countDownIntervalId);
      clearInterval(timerIntervalId);
    };
  }, [isCountDown, countDown, minutes, seconds]);

  const handleStart = () => setIsCountDown(true);

  const handleFinish = () => setIsFinished(true);

  const handleComplete = () => navigation.navigate('profile');

  const getRunningTime = () => {
    const initialTimeInSeconds = initialMinutes.current * 60 + initialSeconds.current;
    const endTimeInSeconds = minutes * 60 + seconds;
    const timeDifferenceInSeconds = initialTimeInSeconds - endTimeInSeconds;
    console.log(timeDifferenceInSeconds);
  
    const minutesDifference = Math.floor(timeDifferenceInSeconds / 60);
    const secondsDifference = timeDifferenceInSeconds % 60;
  
    return timeDifferenceInSeconds < 60 
      ? `${timeDifferenceInSeconds} seconds` 
      : `
        ${minutesDifference < 10 ? `0${minutesDifference}` : minutesDifference} minutes 
        ${secondsDifference < 10 ? `0${secondsDifference}` : secondsDifference} seconds
      `;
  };

  // const getRunningTime = () => {
  //   const runningMinutes = initialMinutes.current - minutes;
  //   const runningSeconds = seconds ? 60 - seconds : 0;

  //   const minutesString = runningMinutes
  //     ? runningMinutes < 10 
  //       ? `0${runningMinutes}` 
  //       : runningMinutes
  //     : "";
    
  //   const secondsString = runningSeconds
  //     ? runningSeconds < 10 
  //       ? `0${runningSeconds}` 
  //       : runningSeconds
  //     : "00";

  //   return runningMinutes 
  //     ? `${minutesString} minutes ${secondsString} seconds`
  //     : `${secondsString} seconds`;
  // }

  return (
    <View style={styles.container}>
      {!isCountDown ? 
      <StartExercisePrompt 
        heading={"2.4km challenge"} 
        subheading={"Finish in under 15 minutes"} 
        handleStart={handleStart} 
      />
      : countDown > 0 ? 
      <CountDownToExercise countDown={countDown} /> 
      : (
        <View style={styles.timerContainer}>
        {!isFinished 
          ? <ExerciseCountDown minutes={minutes} seconds={seconds} handleFinish={handleFinish} /> 
          : <ExerciseSummary 
              summary={`Total time taken is ${getRunningTime()}`}
              handleComplete={handleComplete}
            />
        }
        </View>
      )}
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
  startContainer: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  startButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  countDownContainer: {
    alignItems: 'center',
  },
  countDownText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  countDownNumber: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 72,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  finishButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  summaryContainer: {
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  completeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default SitUpPage;