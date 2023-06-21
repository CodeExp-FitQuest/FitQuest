import React from "react";
import * as Screens from "../screens/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";

const BackArrowNavigator = ({page, navigation}) => (
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
        name="signup"
        component={Screens.SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        component={Screens.ProfileScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="pushup"
        component={Screens.PushUpScreen}
        options={({ navigation }) => ({ 
          title: "",
          headerShown: true,
          headerLeft: () => <BackArrowNavigator page={"profile"} navigation={navigation}/>,
          headerTransparent: true,
        })}
      />
      <Stack.Screen
        name="situp"
        component={Screens.SitUpScreen}
        options={({ navigation }) => ({ 
          title: "",
          headerShown: true,
          headerLeft: () => <BackArrowNavigator page={"profile"} navigation={navigation}/>,
          headerTransparent: true,
        })}
      />
      <Stack.Screen
        name="run"
        component={Screens.RunScreen}
        options={({ navigation }) => ({ 
          title: "",
          headerShown: true,
          headerLeft: () => <BackArrowNavigator page={"profile"} navigation={navigation}/>,
          headerTransparent: true,
        })}
      />
      <Stack.Screen
        name="gps"
        component={Screens.MapScreen}
        options={({ navigation }) => ({ 
          title: "",
          headerShown: true,
          headerLeft: () => <BackArrowNavigator page={"profile"} navigation={navigation}/>,
          headerTransparent: true,
        })}
      />
      <Stack.Screen
        name="friend"
        component={Screens.FriendScreen}
        options={({ navigation }) => ({ 
          title: "",
          headerShown: true,
          headerLeft: () => <BackArrowNavigator page={"profile"} navigation={navigation}/>,
          headerTransparent: true,
        })}
      />
      <Stack.Screen
        name="achievement"
        component={Screens.AchievementScreen}
        options={({ navigation }) => ({ 
          title: "",
          headerShown: true,
          headerLeft: () => <BackArrowNavigator page={"profile"} navigation={navigation}/>,
          headerTransparent: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
