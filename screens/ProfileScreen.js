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

const ChallengePanel = ({ title, description }) => {
  return (
    <View style={styles.challengeRow}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/google.png")}
          style={styles.challengeImage}
        />
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>Lvl.1</Text>
        </View>
      </View>
      <View style={styles.challengeInfo}>
        <Text style={styles.challengeTitle}>{title}</Text>
        <Text style={styles.challengeDescription}>{description}</Text>
        {/* Progress bar goes here */}
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
      <TouchableOpacity
        style={styles.logout}
        onPress={handleSignOut}
      >
        <MaterialIcons name="logout" size={24} 
        color="black" 
        right={10}/>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/google.png")}
          style={styles.profilePicture}
        />

        <Text style={styles.username}>Happi Happi</Text>
        <Text style={styles.level}>Level 1</Text>
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
        />
        <ChallengePanel
          title={"Sit Up Challenge"}
          description={"Perform 20 sit ups"}
        />
        <ChallengePanel
          title={"Push Up Challenge"}
          description={"Perform 35 push ups"}
        />
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
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 20,
    color: "white",
    marginTop: 10,
  },
  level: {
    fontSize: 12,
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
    width: "90%",
    height: "60vh%",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    marginBottom: "-6rem%",
  },
  challengeRow: {
    height: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 8,
  },
  imageContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  challengeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  levelBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 2,
  },
  levelBadgeText: {
    fontSize: 10,
    color: "black",
  },
  challengeInfo: {
    width: "80%",
    paddingLeft: 10,
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  challengeDescription: {
    fontSize: 12,
    color: "black",
  },
});

export default ProfileScreen;
