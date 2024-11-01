// src/screens/AddScreen.js

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, Alert, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tasksState, tasksLoadingState, tasksErrorState } from '../recoil/tasksState';
import axios from 'axios';
import { StatusBar } from "expo-status-bar";

const API_URL = 'https://6707f41d8e86a8d9e42d968b.mockapi.io/data';

export default function AddScreen() {
  const navigation = useNavigation();
  const [job, setJob] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [tasks, setTasks] = useRecoilState(tasksState);
  const [loading, setLoading] = useRecoilState(tasksLoadingState);
  const [error, setError] = useRecoilState(tasksErrorState);

  const handleAddTask = async () => {
    if (job.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập công việc của bạn!");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_URL, { title: job });
      setTasks([...tasks, response.data]);
      setJob("");
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      if (!loading && !error) {
        Alert.alert("Thành công", "Thêm công việc thành công!", [
          { text: "OK", onPress: () => navigation.navigate("List") },
        ]);
      } else if (error) {
        Alert.alert("Lỗi", "Có lỗi xảy ra khi thêm công việc!");
      }
    }
  }, [loading, error, isSubmitted, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>ADD YOUR JOB</Text>
      <View style={styles.inputContainer}>
        <Image source={require("../assets/img/Frame.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Input your job"
          placeholderTextColor="#999"
          value={job}
          onChangeText={setJob}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddTask} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textButton}>FINISH</Text>
        )}
      </TouchableOpacity>
      <StatusBar style="auto" />
      <Image
        source={require("../assets/img/Image95.png")}
        style={styles.mainImage}
      />  
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
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
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
  },
  input: {
    flex: 1,
    height: 40,
    color: "#333",
  },
  button: {
    backgroundColor: "#4fc4da",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: 150,
    alignItems: 'center',
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
  },
  mainImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});
