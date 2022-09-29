import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection("todos");
  const [addData, setAddData] = useState("");
  const navigation = useNavigation();

  // fetch/read todo from firebase database
  useEffect(() => {
    todoRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { heading } = doc.data();
        todos.push({
          id: doc.id,
          heading,
        });
      });
      setTodos(todos);
    });
  }, []);

  // delete/remove todo from firebase database
  const deleteTodo = (todos) => {
    todoRef
      .doc(todos.id)
      .delete()
      .then(() => {
        // if deleted
        alert("Todo Deleted Successfully!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  // add/save a todo item
  const addTodo = () => {
    // validate todo (if we have todo / todo is not empty)
    if (addData && addData.length > 0) {
      // get the timestamp of todo creation

      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        createdAt: timestamp,
      };

      todoRef
        .add(data)
        .then(() => {
          setAddData("");
          // hide keyboard after adding
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw``}>
        <TextInput
          style={tw``}
          placeholder="Add a New Task todo"
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity style={tw``} onPress={addTodo}>
          <Text style={tw``}>Add</Text>
        </TouchableOpacity>

        <FlatList />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
