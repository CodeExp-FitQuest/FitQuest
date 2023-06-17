import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export const StartExerciseButton = ({handleStart}) => 
  <TouchableOpacity style={styles.startButton} onPress={handleStart}>
    <Text style={styles.buttonText}>Start</Text>
  </TouchableOpacity>

export const CountDownToExercise = ({countDown}) => 
  <View style={styles.countDownContainer}>
    <Text style={styles.countDownText}>Exercise starts in</Text>
    <Text style={styles.countDownNumber}>{countDown}</Text>
  </View>

export const ExerciseCountDown = ({timer, handleFinish}) => 
  <>
    <Text style={styles.timerText}>{timer}</Text>
    <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
      <Text style={styles.buttonText}>Finish</Text>
    </TouchableOpacity>
  </>

export const ExerciseComplete = ({handleComplete, prompt}) => {
  const [count, setCount] = useState('');

  return (
    <View style={styles.completeContainer}>
      <Text style={styles.text}>{prompt}</Text>
      <TextInput
        style={styles.input}
        value={count}
        onChangeText={text => setCount(text)}
      />
      <TouchableOpacity style={styles.completeButton} onPress={() => handleComplete(count)}>
        <Text style={styles.buttonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  startButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    color: '#7D57C1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countDownContainer: {
    alignItems: 'center',
  },
  countDownText: {
    fontSize: 24,
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
  completeContainer: {
    alignItems: 'center',
  },
  input: {
    marginTop: 20,
    padding: 10,
    width: 200,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  completeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
});