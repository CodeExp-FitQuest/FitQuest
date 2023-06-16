import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./components/AppNavigator";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider as LocationProvider } from "./components/LocationContext";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <LocationProvider>
        <RootSiblingParent>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </RootSiblingParent>
      </LocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
