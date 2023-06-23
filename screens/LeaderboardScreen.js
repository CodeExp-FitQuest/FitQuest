import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Leaderboard = () => {
  const leaderboardData = [
    { position: 1, name: "Peter", score: 1000 },
    { position: 2, name: "Eric", score: 900 },
    { position: 3, name: "Benedict", score: 800 },
    { position: 4, name: "David", score: 700 },
    { position: 5, name: "Evan", score: 600 },
    { position: 6, name: "Wen Jun", score: 500 },
    { position: 7, name: "Shenghan", score: 400 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.podiumContainer}>
        {leaderboardData.slice(0, 3).map((player, index) => (
          <View key={index} style={[styles.podiumItem, podiumColors[index]]}>
            <Text style={styles.position}>{player.position}</Text>
            <Text style={styles.name}>{player.name}</Text>
            <Text style={styles.score}>{player.score}</Text>
          </View>
        ))}
      </View>
      <View style={styles.listContainer}>
        {leaderboardData.slice(3).map((player, index) => (
          <View key={player.position} style={styles.listItem}>
            <Text style={styles.listPosition}>{player.position}</Text>
            <Text style={styles.listName}>{player.name}</Text>
            <Text style={styles.listScore}>{player.score}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const podiumColors = [
  { backgroundColor: "#FFD700", height: 100 }, // Gold for 1st position
  { backgroundColor: "#C0C0C0", height: 70 }, // Silver for 2nd position
  { backgroundColor: "#CD7F32", height: 50 }, // Bronze for 3rd position
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8C54FF",
    paddingTop: "50%",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  podiumContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 60,
    padding: 20,
  },
  podiumItem: {
    alignItems: "center",
    width: 100,
    height: 100,
  },
  podiumPosition: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFD700",
  },
  podiumName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  podiumScore: {
    fontSize: 30,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 60,
  },
  listPosition: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginRight: 10,
  },
  listName: {
    flex: 1,
    fontSize: 30,
    color: "#FFFFFF",
  },
  listScore: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default Leaderboard;
