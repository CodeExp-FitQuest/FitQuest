import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const FriendList = () => {
  const friendsData = [
    {
      id: "1",
      name: "John Doe",
      level: 10,
      image: require("../assets/defaultIcon.jpeg"),
    },
    {
      id: "2",
      name: "Jane Smith",
      level: 8,
      image: require("../assets/defaultIcon.jpeg"),
    },
    {
      id: "3",
      name: "Mike Johnson",
      level: 12,
      image: require("../assets/defaultIcon.jpeg"),
    },
    {
      id: "4",
      name: "Peter Pan",
      level: 20,
      image: require("../assets/defaultIcon.jpeg"),
    },
    // Add more friend data here...
  ];

  const renderFriendItem = ({ item }) => {
    return (
      <View style={styles.friendContainer}>
        <Image source={item.image} style={styles.image} />
        <View>
          <Text style={{ fontSize: 16 }}>{item.name}</Text>
          <Text style={{ fontSize: 12 }}>Level {item.level}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Remove</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={friendsData}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "30%",
    backgroundColor: "#7D57C1",
  },
  friendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 8,
    alignSelf: "center",
    width: "80%",
  },
  itemContainer: {
    justifyContent: "flex-end",
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  text: {
    textAlign: "right",
    marginRight: 10,
    color: "red",
  },
});

export default FriendList;
