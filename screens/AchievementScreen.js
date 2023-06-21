import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const AchievementPage = () => {
  const streakImage = require("../assets/tinder.png");

  const achievementsData = [
    { id: "1", name: "Run 500m challenge", points: "60pts" },
    { id: "2", name: "Do 50 sit-ups", points: "40pts" },
    { id: "3", name: "Complete 80 jumping jacks", points: "50pts" },
    { id: "4", name: "Run 1km in 5 mins", points: "80pts" },
    { id: "5", name: "Do 60 push-ups", points: "40pts" },
    { id: "6", name: "Complete 60 sit-ups", points: "60pts" },
    { id: "7", name: "Do 60 push-ups and 2km run", points: "100pts" },
    { id: "8", name: "Do 60 push-ups and 60 sit-ups", points: "90pts" },
    // Add more achievement data here...
  ];

  return (
    <View style={styles.container}>
      <View style={styles.streakContainer}>
        <Image source={streakImage} style={styles.streakImage} />
        <Text style={styles.streakText}>You are on a 10 days streaks!</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Achievements Obtained:</Text>
        <ScrollView style={{ backgroundColor: "#CB8AFF" }}>
          {achievementsData.map((achievement) => (
            <View key={achievement.id} style={styles.listContainer}>
              <Text style={{fontWeight: "bold"}}>{achievement.name}</Text>
              <Text style={styles.text}>{achievement.points}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "30%",
    backgroundColor: "#7D57C1",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginLeft: 20,
  },
  streakText: {
    fontSize: 25,
    fontWeight: "bold",
    bottom: 10,

  },
  streakContainer: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "gold",
    borderRadius: 8,
    marginHorizontal: 20,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 8,
    padding: 20,
  },
  streakImage: {
    width: 100,
    height: 130,
    marginBottom: 10,
  },
  text: {
    textAlign: "right",
    marginRight: 10,
    color: "green",
    flex: 1,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

export default AchievementPage;
