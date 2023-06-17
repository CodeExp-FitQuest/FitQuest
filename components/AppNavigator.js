import React from "react";
import * as Screens from "../screens/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from 'react-native-paper';

const BackArrowNavigator = page => 
  <IconButton
    icon="arrow-left"
    onPress={() => navigation.navigate(page)}
    iconColor="#fff"
  />

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
        name="profile"
        component={Screens.ProfileScreen}
        options={{ 
          title: "",
          headerShown: true,
          headerLeft: () => <BackArrowNavigator page={"hometab"}/>,
          headerTransparent: true,
        }}
=======
        name="signup"
        component={Screens.SignupScreen}
        options={{ headerShown: false }}
>>>>>>> 8e147682 (Enhance ui for login page)
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
