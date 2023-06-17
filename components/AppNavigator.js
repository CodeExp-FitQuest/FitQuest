import React from "react";
import * as Screens from "../screens/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";

const BackArrowNavigator = (page) => (
  <IconButton
    icon="arrow-left"
    onPress={() => navigation.navigate(page)}
    iconColor="#fff"
  />
);

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
<<<<<<< HEAD
=======
        name="profile"
        component={Screens.ProfileScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
>>>>>>> main
        name="signup"
        component={Screens.SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
