import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { OrchidData } from "../database/Database";
import { useNavigation } from "@react-navigation/native";

export default function OrchidCategory() {
  const [category, setCategory] = useState("");
  const navigation = useNavigation();

  const filterByCategory = (item) => {
    return item.category === category;
  };

  const goToOrchidDetail = (item) => {
    navigation.navigate("OrchidDetailScreen", {
      prevScreen: "HomeScreen",
      orchid: item,
    });
  };

  return (
    <View>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            display: "flex",
            flexDirection: "row",
            borderRadius: 10,
          }}
        >
          <Text style={styles.filter} onPress={() => setCategory("Cattleya")}>
            Cattleya
          </Text>
          <Text style={styles.filter} onPress={() => setCategory("Dendrobium")}>
            Dendrobium
          </Text>
          <Text
            style={styles.filter}
            onPress={() => setCategory("Phalaenopsis")}
          >
            Phalaenopsis
          </Text>
        </ScrollView>
      </View>
      <ScrollView horizontal={false}>
        {OrchidData.filter(filterByCategory).map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => goToOrchidDetail(item)}
          >
            <View style={styles.container}>
              <Image source={item.orchidImage} style={styles.orchidImage} />
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: 20,
                    color: "#333333",
                  }}
                >
                  {item.productName}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    padding: 20,
    backgroundColor: "#FF123C",
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    borderRadius: 10,
  },
  container: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    margin: 10,
    display: "flex",
    flexDirection: "row",
  },
  orchidImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
});
