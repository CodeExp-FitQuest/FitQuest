import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Camera, CameraType } from "expo-camera";

export const StartExercisePrompt = ({ heading, subheading, handleStart }) => (
  <View style={styles.startContainer}>
    <Text style={styles.heading}>{heading}</Text>
    <Text style={styles.subheading}>{subheading}</Text>
    <TouchableOpacity style={styles.startButton} onPress={handleStart}>
      <Text style={styles.buttonText}>Start</Text>
    </TouchableOpacity>
  </View>
);

export const CountDownToExercise = ({ countDown }) => (
  <View style={styles.countDownContainer}>
    <Text style={styles.countDownText}>Exercise starts in</Text>
    <Text style={styles.countDownNumber}>{countDown}</Text>
  </View>
);

export const ExerciseCountDown = ({
  minutes,
  seconds,
  handleFinish,
  hasPermission,
}) => (
  <View style={styles.displayContainer}>
    <Text style={styles.timerText}>
      {minutes
        ? `${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
          }`
        : seconds}
    </Text>
    <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
      <Text style={styles.buttonText}>Finish</Text>
    </TouchableOpacity>
  </View>
);

export const RunningCountDown = ({
  minutes,
  seconds,
  handleFinish,
  distance,
}) => (
  <View style={styles.runningContainer}>
    <Text style={styles.title}>Distance: </Text>
    <Text style={styles.timer2Text}>
      {distance} <Text style={styles.title}>km</Text>
    </Text>
    <Text style={styles.title}>Time: </Text>
    <Text style={styles.timer2Text}>
      {minutes
        ? `${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
          }`
        : seconds}
    </Text>

    <TouchableOpacity style={styles.stopButton} onPress={handleFinish}>
      <Text style={styles.button2Text}>| |</Text>
    </TouchableOpacity>
  </View>
);

export const ExerciseSummary = ({ summary, handleComplete }) => (
  <View style={styles.summaryContainer}>
    <Text style={styles.summaryText}>{summary}</Text>
    <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
      <Text style={styles.buttonText}>Complete</Text>
    </TouchableOpacity>
  </View>
);

export const ExerciseComplete = ({ handleComplete, prompt }) => {
  const [count, setCount] = useState("");

  return (
    <View style={styles.displayContainer}>
      <Text style={styles.text}>{prompt}</Text>
      <TextInput
        style={styles.input}
        value={count}
        onChangeText={(text) => setCount(text)}
      />
      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => handleComplete(count)}
      >
        <Text style={styles.buttonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  stopButton: {
    color: "#FFFFFF",
    backgroundColor: "black",
    padding: 25,
    cursor: "pointer",
    position: "absolute",
    alignSelf: "flex-end",
    borderRadius: 10,
    top: 10,
    left: 260,
  },
  timer2Text: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-end",
    right: 70,
    bottom: 30
  },
  runningContainer: {
    justifyContent: "space-between",
    display: "flex",
    width: "80%",
    height: 50,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    position: "fixed",
    bottom: 60,
    backgroundColor: "transparent",
  },
  button2Text: {
    color: "#7D57C1",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  startContainer: {
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  startButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    color: "#7D57C1",
    fontSize: 16,
    fontWeight: "bold",
  },
  countDownContainer: {
    alignItems: "center",
  },
  countDownText: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  countDownNumber: {
    fontSize: 48,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cameraContainer: {
    borderRadius: 1,
    borderColor: "white",
    width: "100%",
    height: "50%",
  },
  camera: {
    borderRadius: 1,
    borderColor: "white",
    width: "100%",
    height: "50%",
  },
  timerContainer: {
    alignItems: "center",
  },
  timerText: {
    fontSize: 72,
    color: "#000000",
    fontWeight: "bold",
    marginBottom: 20,
  },
  finishButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  summaryContainer: {
    alignItems: "center",
  },
  summaryText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  displayContainer: {
    alignItems: "center",
  },
  input: {
    marginTop: 20,
    padding: 10,
    width: 200,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    color: "#000000",
  },
  completeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
});
