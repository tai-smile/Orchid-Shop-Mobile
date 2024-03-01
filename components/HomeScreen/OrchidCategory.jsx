import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { OrchidData } from "../database/Database";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function OrchidCategory() {
  const [category, setCategory] = useState("");
  const [favoriteList, setFavoriteList] = useState([]);
  const [orchidData, setOrchidData] = useState(OrchidData);

  const navigation = useNavigation();

  const filterByCategory = (item) => {
    return item.category === category;
  };

  const goToOrchidDetail = (item) => {
    navigation.navigate("OrchidDetailScreen", {
      prevScreen: "Home",
      orchid: item,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      const getFavoriteList = async () => {
        try {
          const favoriteList = await AsyncStorage.getItem("favoriteList");
          if (favoriteList) {
            setFavoriteList(JSON.parse(favoriteList));
          }
        } catch (error) {
          console.log(error);
        }
      };
      getFavoriteList();
    }, [])
  );

  const addFavoriteList = async (item) => {
    try {
      const updatedList = [...favoriteList, item];
      setFavoriteList(updatedList);
      await AsyncStorage.setItem("favoriteList", JSON.stringify(updatedList));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = (item) => {
    const isFavorite = favoriteList.some(
      (favoriteItem) => favoriteItem.id === item.id
    );
    if (isFavorite) {
      removeItem(item.productName);
    } else {
      addFavoriteList(item);
    }
  };

  const removeItem = async (itemName) => {
    try {
      const updatedFavorites = favoriteList.filter(
        (item) => item.productName !== itemName
      );
      setFavoriteList(updatedFavorites);
      await AsyncStorage.setItem(
        "favoriteList",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };
  const [isLoading, setIsLoading] = useState(true);

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
          <Pressable key={item.id} onPress={() => goToOrchidDetail(item)}>
            <View style={styles.container}>
              <Image source={item.orchidImage} style={styles.orchidImage} />
              <View
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
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
                <TouchableOpacity onPress={() => addFavoriteList(item)}>
                  <View>
                    <Ionicons
                      name="ios-heart-sharp"
                      style={{
                        marginTop: 55,
                        position: "absolute",
                        right: 0,
                        color: favoriteList.some(
                          (favoriteItem) => favoriteItem.id === item.id
                        )
                          ? "red"
                          : "black",
                      }}
                      size={30}
                      onPress={() => toggleFavorite(item)}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
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
