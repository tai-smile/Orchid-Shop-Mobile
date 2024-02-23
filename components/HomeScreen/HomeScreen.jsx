import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "./Header";
import OrchidCategory from "./OrchidCategory";

export default function HomeScreen() {
  return (
    <View>
      {/* Header */}
      <Header />
      <View style={{ padding: 20 }}>
        <OrchidCategory />
      </View>
    </View>
  );
}
