import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  box: {
    width: "50%",
    height: "50%",
    padding: 5
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee"
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logolong: {
    width: 600,
    height: 100,
  },
  containerItem: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop: 60
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "column",
    borderRadius: 5
  }
});
export const RowDaily = ({ item }) => (
  <View style={styles.listItem}>
    <View style={{ alignItems: "center", flex: 1 }}>
      <Image source={{ uri: item.image }} style={{ width: 60, height: 60, borderRadius: 30 }} />
      <Text style={{ fontWeight: "bold" }}>{item.description}</Text>
      <Text style={{ fontWeight: "bold" }}>Max temperature: {item.max} ºC</Text>
      <Text style={{ fontWeight: "bold" }}>Min temperature: {item.min} ºC</Text>
      <Text style={{ fontWeight: "bold" }}>{item.date}</Text>
    </View>
  </View>
);


