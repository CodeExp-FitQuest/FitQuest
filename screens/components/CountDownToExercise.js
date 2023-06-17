import { View, Text, StyleSheet } from 'react-native';


const CountDownToExcercise = ({countDown}) => 
  <View style={styles.countDownContainer}>
    <Text style={styles.countDownText}>Exercise starts in</Text>
    <Text style={styles.countDownNumber}>{countDown}</Text>
  </View>

const styles = StyleSheet.create({
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
});

export default CountDownToExcercise;
