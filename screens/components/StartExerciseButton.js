import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const StartExerciseButton = ({handleStart}) => 
  <TouchableOpacity style={styles.startButton} onPress={handleStart}>
    <Text style={styles.buttonText}>Start</Text>
  </TouchableOpacity>

const styles = StyleSheet.create({
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
});

export default StartExerciseButton;
  