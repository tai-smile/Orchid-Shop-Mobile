import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";

import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getFavoriteList = async () => {
      try {
        const favoriteList = await AsyncStorage.getItem("favoriteList");
        if (favoriteList) {
          setFavorites(JSON.parse(favoriteList));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFavoriteList();
  }, [isFocused]);
  const handleDelete = () => {
    Alert.alert("Xác nhận", "Xóa hết thật hả?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", onPress: clearData, style: "destructive" },
    ]);
  };
  const removeItem = async (itemName) => {
    try {
      const updatedFavorites = favorites.filter(
        (item) => item.productName !== itemName
      );
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem(
        "favoriteList",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      setFavorites([]);
    } catch (error) {
      console.log("Error clearing data:", error);
    }
  };
  const goToOrchidDetail = (item) => {
    navigation.navigate("OrchidDetailScreen", {
      prevScreen: "Home",
      orchid: item,
    });
  };

  if (favorites.length > 0) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <FlatList
          style={{ marginTop: 20 }}
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Pressable
                style={styles.container}
                onPress={() => goToOrchidDetail(item)}
              >
                <Image source={item.orchidImage} style={styles.orchidImage} />
                <Text style={styles.orchidTitle}>{item.productName}</Text>
                <TouchableOpacity onPress={() => removeItem(item.productName)}>
                  <View>
                    <Ionicons name="ios-heart-sharp" size={24} color="red" />
                  </View>
                </TouchableOpacity>
              </Pressable>
            </View>
          )}
        />
        {favorites.length > 0 && (
          <View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleDelete}
            >
              <Text style={styles.favoriteButtonText}>Xóa hết</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  } else {
    return (
      <View>
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 20 }}>
          Bạn chưa có sản phẩm yêu thích nào
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#f2f2f2",
    margin: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orchidImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  orchidTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  favoriteButton: {
    backgroundColor: "#1435C9",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  favoriteButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "red",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
});
