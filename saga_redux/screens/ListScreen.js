// screens/ListScreen.js

import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTasksRequest,
  deleteTaskRequest,
  updateTaskRequest,
} from '../actions/taskActions';

export default function ListScreen() {
  const navigation = useNavigation(); 
  const route = useRoute();
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const userName = route.params?.userName || "User";

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchTasksRequest());
    }, [dispatch])
  );

  // Hàm xóa task
  const handleDeleteTask = (id) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa task này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => dispatch(deleteTaskRequest(id)),
        },
      ],
      { cancelable: true }
    );
  };

  // Hàm bắt đầu chỉnh sửa task
  const handleStartEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
  };

  // Hàm hủy chỉnh sửa
  const handleCancelEditing = () => {
    setEditingTaskId(null);
    setEditedTitle("");
  };

  // Hàm lưu chỉnh sửa task
  const handleSaveEditing = (task) => {
    if (editedTitle.trim() === "") {
      Alert.alert("Lỗi", "Tên công việc không được để trống!");
      return;
    }
    dispatch(updateTaskRequest({ id: task.id, title: editedTitle }));
    setEditingTaskId(null);
    setEditedTitle("");
  };

  // Hàm thêm task mới: Điều hướng đến màn hình Add
  const handleAddTask = () => {
    navigation.navigate("Add");
  };

  const renderItem = ({ item }) => {
    const isEditing = item.id === editingTaskId;
    return (
      <View style={styles.taskContainer}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedTitle}
            onChangeText={setEditedTitle}
            onSubmitEditing={() => handleSaveEditing(item)}
            returnKeyType="done"
          />
        ) : (
          <Text style={styles.task}>{item.title}</Text>
        )}
        <View style={styles.actionButtons}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleSaveEditing(item)}
              >
                <Ionicons name="save-outline" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleCancelEditing}
              >
                <Ionicons name="close-outline" size={24} color="#F44336" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleStartEditing(item)}
              >
                <MaterialIcons name="edit" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDeleteTask(item.id)}
              >
                <Ionicons name="trash-outline" size={24} color="#F44336" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  if (error) {
    Alert.alert("Lỗi", error);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh Sách Công Việc của {userName}</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Không có công việc nào.</Text>}
      />
      {/* Nút thêm công việc */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
    paddingTop: 20,
    position: "relative",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 100, 
  },
  taskContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  task: {
    fontSize: 18,
    color: "#555",
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#555",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#4CAF50",
  },
  actionButtons: {
    flexDirection: "row",
    marginLeft: 10,
  },
  actionButton: {
    marginLeft: 15,
  },
  addButton: {
    position: "absolute",
    bottom: 30, 
    left: "50%",
    transform: [{ translateX: -30 }], 
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 16,
  },
});
