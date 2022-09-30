import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#F1FCFE" }]}>
      {/* formContainer */}
      <View style={tw`flex-row h-12 ml-2 mr-2 mt-24 rounded-xl `}>
        {/* input */}
        <TextInput
          style={[
            tw`h-12 rounded-l-xl px-4 pr-2 text-base overflow-hidden flex-1 mr-0.75`,
            { backgroundColor: "#1D3557", color: "#F1FCFE" },
          ]}
          placeholder="Enter a new Task to do.."
          placeholderTextColor="#828980"
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        {/* button */}
        <TouchableOpacity
          style={[
            tw`h-12 rounded-r-xl px-8 items-center justify-center`,
            { backgroundColor: "#3890C7" },
          ]}
          onPress={addTodo}
        >
          {/* buttonText */}
          <Text style={[tw`text-base`, { color: "#F1FCFE" }]}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={tw`mt-4`}
        data={todos}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            {/* container */}
            <TouchableOpacity
              style={[
                tw`h-12 px-4 mt-2 mx-2 flex-row items-center rounded-xl`,
                { backgroundColor: "#1D3557" },
              ]}
              onPress={() => navigation.navigate("Details", { item })}
            >
              {/* innerContainer */}
              <View style={tw`items-center flex-row ml-3 flex-1`}>
                {/* itemHeading */}
                <Text style={[tw`text-lg mr-5`, { color: "#F1FCFE" }]}>
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
              </View>
              {/* todoIcon */}
              <MaterialCommunityIcons
                style={tw`text-2xl mr-3 p-2 rounded-full`}
                name="delete-outline"
                color="#E63946"
                onPress={() => deleteTodo(item)}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
