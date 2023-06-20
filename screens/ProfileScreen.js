import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChallengePanel = ({ title, description, onPress, image }) => {
  return (
    <View style={styles.challengeRow}>
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={styles.challengeImage}
        />
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>Lvl.3</Text>
        </View>
      </View>
      <View style={styles.challengeInfo}>
        <Text style={styles.challengeTitle}>{title}</Text>
        <Text style={styles.challengeDescription}>{description}</Text>
        <TouchableOpacity style={styles.challengeButton} onPress={onPress}>
          <Text style={styles.challengeButtonText}>Start Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(`Signed out of ${user.email}`);
          }
        });
        /*
        let toast = Toast.show('You have signed out', {
          duration: Toast.durations.SHORT,
          backgroundColor: 'red',
        });
        
        setTimeout(function hideToast() {
          Toast.hide(toast);
        }, 1500);
        */
        navigation.navigate("login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logout} onPress={handleSignOut}>
        <MaterialIcons name="logout" size={24} color="black" right={10}/>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/profile_image.png")}
          style={styles.profilePicture}
        />

        <Text style={styles.username}>Jonathan Tan</Text>
        <Text style={styles.level}>Level 5</Text>
      </View>

      <View style={styles.tabsContainer}>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Record</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Statistics</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Friends</Text>
        </View>
      </View>

      <View style={styles.cardContainer}>
        <ChallengePanel
          title={"2.4KM Challenge"}
          description={"Finish 2.4KM under 15 minutes"}
          onPress={() => navigation.navigate("run")}
          image={require("../assets/run.jpg")}
        />
        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>
        <ChallengePanel
          title={"Sit Up Challenge"}
          description={"Perform 20 sit ups under 1 minute"}
          onPress={() => navigation.navigate("situp")}
          image={require("../assets/situp.jpg")}
        />
        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>
        <ChallengePanel
          title={"Push Up Challenge"}
          description={"Perform 35 push ups under 1 minute"}
          onPress={() => navigation.navigate("pushup")}
          image={require("../assets/pushup.jpg")}
        />
        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7D57C1",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 130,
    height: 130,
    borderRadius: 70,
  },
  username: {
    fontSize: 30,
    fontWeight:'bold',
    color: "white",
    marginTop: 10,
  },
  level: {
    fontSize: 15,
    fontWeight:'600',
    color: "white",
    marginTop: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
  logout: {
    position: "absolute",
    top: 80,
    right: 20,
  },
  tab: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
  },
  tabText: {
    color: "black",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    // alignItems:'center',
    width: "90%",
    height: "60%",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    marginBottom: -100,
  },
  challengeRow: {
    height: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  challengeImage: {
    borderColor:'#5A2097',
    borderWidth: 1,
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  levelBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 2,
    shadowColor: '#321254',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 3,
  },
  levelBadgeText: {
    textAlign:'center',
    fontSize: 10,
    fontWeight:'bold',
    width: 35,
    color: "black",
    borderRadius: 20,
    
  },
  challengeInfo: {
    // border:'red dotted',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'100%',
    width: "70%",
    paddingLeft: 10,
  },
  challengeTitle: {
    marginVertical: 0,
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  challengeDescription: {
    marginBottom: 8,
    fontSize: 12,
    color: "black",
  },
  challengeButton: {
    marginVertical: 2,
    width: '70%',
    textAlign: 'center',
    backgroundColor: '#7D57C1',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginTop: 0,
    shadowColor: '#321254',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 3,
  },
  challengeButtonText: {
    paddingVertical: 3,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  lineContainer: {
    display:'flex',
    alignItems:'center',
    width:'100%',
  },
  line: {
    height:1,
    width:'90%',
    backgroundColor: '#F3F0F9', 
  },
});

export default ProfileScreen;
