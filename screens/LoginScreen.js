import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
//import { GoogleSignin } from "@react-native-google-signin/google-signin";

const LogInImage = () => {
  return (
    <View style={styles.imageContainer}>
      
      <ImageBackground
        source={require('../assets/login_image.jpg')} // Replace with your image path
        style={styles.image}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(125,87,193,1)']}
          style={styles.gradient}
        />
      </ ImageBackground>
    </View>
  );
};

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const navigation = useNavigation();

  const handleClick = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(`Signed in with ${user.email}`);
        navigation.navigate("profile");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      if (user) {
        setloggedIn(true);
        navigation.navigate("profile");
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.header}>FitQuest</Text>
        <Text style={styles.subheader}>Earn rewards while working out</Text>
      </View>
      <LogInImage />
      <View style={styles.inputs}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="white"
            selectionColor={'white'}
            onChangeText={(email) => setEmail(email)}
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="white"
            selectionColor={'white'}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>Sign in with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialMediaIcons}>
        <View style={styles.iconContainer}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require(".././assets/Facebook-logo.png")}
          />
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleClick}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require(".././assets/google.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <Image
            style={{ width: 35, height: 35 }}
            source={require(".././assets/twitter.png")}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.signUpLink}
        onPress={() => navigation.navigate("signup")}
      >
        <Text style={styles.signUpLinkText}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    top:'0',
    width:'100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -10,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: "#7D57C1",
    justifyContent: "center",
    alignItems: "center",
  },
  subcontainer: {
    position: "absolute",
    top: 300,
  },
  header: {
    textAlign:"center",
    fontSize: 65,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subheader: {
    textAlign:"center",
    fontSize: 17,
    color: "white",
    fontWeight: "400",
  },
  inputContainer: {
    backgroundColor: "#9879CD",
    borderRadius: 10,
    width: 250,
    height: 38,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    marginTop: 50,
  },
  inputText: {
    display:'flex',
    flexDirection:'row',
    //outlineColor: 'transparent',
    //outlineWidth: 0,
    color: 'white',
  },
  button: {
    display:'flex',
    justifyContent:'center',
    height: 38,
    width: 250,
    backgroundColor: "#6943AB",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "400",
  },
  separator: {
    width:'80%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 35,
    marginBottom: 25
  },
  line: {
    width:'25%',
    flex: 1, 
    height: 1, 
    backgroundColor: 'white', 
  },
  separatorText: {
    color: "white",
    fontSize: 15,
    paddingHorizontal: 10,
  },
  socialMediaIcons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  iconContainer: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: "white",
    marginHorizontal: 18,
    marginBottom: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpLink: {
    position: "absolute",
    bottom: 20,
  },
  signUpLinkText: {
    color: "white",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
});

export default LoginPage;
