import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
export default function Header() {
  return (
    <View>
      <View style={styles.container}>
        <Image
          source={require("../../assets/flower_shop.jpg")}
          style={{
            objectFit: "cover",
            width: "100%",
            height: 200,
            borderRadius: 10,
          }}
        />
      </View>
      <MaterialIcons
        style={{ marginLeft: "auto", marginRight: 20, marginTop: 40 }}
        name="favorite"
        size={27}
        color="#FF123C"
      />
      <View style={styles.searchBarContainer}>
        <TextInput placeholder="Search" />
        <FontAwesome5
          style={styles.searchbtn}
          name="search"
          size={24}
          color="black"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  searchBarContainer: {
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginTop: 70,
    marginLeft: 50,
    width: "63%",
    flexDirection: "row",
    display: "flex",
    gap: 10,
    justifyContent: "space-between",
  },
  searchbtn: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    fontFamily: "outfit",
  },
});
