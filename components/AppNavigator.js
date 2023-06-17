import React from "react";
import * as Screens from "../screens/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Screens.LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="hometab"
        component={Screens.HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={Screens.SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
