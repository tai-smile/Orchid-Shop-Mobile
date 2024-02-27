import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrchidData from "../database/Database";

export default function OrchidDetailScreen({ route }) {
  const navigation = useNavigation();
  const orchid = route.params.orchid;
  const prevScreen = route.params.prevScreen;
  const favorite = route.params.favorite;
  const goToPrevScreen = () => {
    navigation.navigate(prevScreen);
  };

  const goToFavorite = () => {
    navigation.navigate("Favorite");
  };

  const addFavoriteList = async (item) => {
    try {
      const favoriteList = await AsyncStorage.getItem("favoriteList");
      if (favoriteList) {
        const list = JSON.parse(favoriteList);
        const isDuplicate = list.some(
          (favoriteItem) => favoriteItem.id === item.id
        );
        if (isDuplicate) {
          Alert.alert("This orchid is already in your favorite list");
        } else {
          list.push(item);
          await AsyncStorage.setItem("favoriteList", JSON.stringify(list));
          Alert.alert("Added to favorite list");
        }
      } else {
        await AsyncStorage.setItem("favoriteList", JSON.stringify([item]));
        Alert.alert("Added to favorite list");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.orchidDetailHeader}>
          <TouchableOpacity onPress={goToPrevScreen}>
            <Ionicons name="arrow-back" size={30} style={styles.arrow} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToFavorite}>
            <MaterialIcons style={styles.heart} name="favorite" size={30} />
          </TouchableOpacity>
        </View>
        <View>
          <Image source={orchid.orchidImage} style={styles.detailImage} />

          <View style={styles.overviewDetailBox}>
            <Text style={styles.orchidTitle}>{orchid.productName}</Text>
            <Text style={styles.orchidDescription}>{orchid.description}</Text>
            <View>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => addFavoriteList(orchid)}
              >
                <Text style={styles.favoriteButtonText}>Favorite</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  arrow: {
    width: 25,
    height: 25,
    marginTop: 25,
  },
  heart: {
    marginTop: 25,
  },
  orchidDetailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  detailImage: {
    width: windowWidth,
    height: windowHeight / 2,
  },
  overviewDetailBox: {
    alignItems: "center",
    marginTop: 20,
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

  orchidTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },

  orchidDescription: {
    fontSize: 20,
    color: "gray",
    marginTop: 10,
  },
});
