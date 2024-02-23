import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { useState } from "react";
import { OrchidData } from "../database/Database";

export default function OrchidCategory() {
  const [category, setCategory] = useState("");

  const filterByCategory = (item) => {
    return item.category === category;
  };

  const Item = ({ productName, orchidImage }) => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        marginTop: 20,
      }}
    >
      <Image
        source={orchidImage}
        style={{
          width: 200,
          height: 140,
          borderRadius: 10,
        }}
      />
      <View style={{ display: "flex", flexDirection: "column" }}>
        <Text
          style={{
            fontSize: 20,
            color: "#333333",
          }}
        >
          {productName}
        </Text>
      </View>
    </View>
  );
  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ display: "flex", flexDirection: "row", gap: 20 }}
      >
        <Text
          style={{
            padding: 10,
            backgroundColor: "#FF123C",
            marginLeft: 20,
            marginRight: 20,
            fontSize: 20,
            color: "#ffffff",
            fontWeight: "bold",
            borderRadius: 10,
          }}
          onPress={() => setCategory("Cattleya")}
        >
          Cattleya
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "#ffffff",
            padding: 10,
            backgroundColor: "#FF123C",
            fontWeight: "bold",
            borderRadius: 10,
          }}
          onPress={() => setCategory("Dendrobium")}
        >
          Dendrobium
        </Text>
      </ScrollView>
      <SafeAreaView>
        <FlatList
          data={OrchidData.filter(filterByCategory)}
          horizontal={false}
          renderItem={({ item }) => (
            <Item
              productName={item.productName}
              productPrice={item.productPrice}
              orchidImage={item.orchidImage}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}
