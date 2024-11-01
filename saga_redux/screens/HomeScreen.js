// screens/HomeScreen.js

import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleGetStarted = () => {
    if (name.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập tên của bạn!");
      return;
    }
    navigation.navigate('List', { userName: name });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/img/Image95.png")} style={styles.mainImage} />
      <Text style={styles.title}>MANAGE YOUR TASK</Text>
      <View style={styles.inputContainer}>
        <Image source={require("../assets/img/Frame.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  mainImage: {
    width: 300,
    height: 300,
    resizeMode: "cover",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    borderRadius: 5,
    width: "100%",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "contain",
  },
  input: {
    flex: 1,
    height: 40,
    paddingVertical: 0,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#43bed8",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
