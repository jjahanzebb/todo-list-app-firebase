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
      {/* formContainer */}
      <View
        style={tw`flex-col h-24 ml-2 mr-2 mt-24 rounded-xl shadow-lg shadow-neutral-600	`}
      >
        {/* input */}
        <TextInput
          style={tw`h-12 rounded-t-xl bg-white px-4 pr-2 text-center text-base overflow-hidden`}
          placeholder="Enter a new Task to do.."
          placeholderTextColor="#aaaaaa"
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        {/* button */}
        <TouchableOpacity
          style={tw`h-12 rounded-b-xl bg-sky-500 px-8 items-center justify-center`}
          onPress={addTodo}
        >
          {/* buttonText */}
          <Text style={tw`text-white text-lg`}>Add</Text>
        </TouchableOpacity>

        <FlatList
          data={todos}
          numColumns={1}
          renderItem={({ item }) => {
            <View>
              {/* container */}
              <Pressable
                style={tw`bg-slate-300 p-4 m-1 mx-2.5 flex-row items-center	rounded-2xl`}
                onPress={() => navigation.navigate("Detail", { item })}
              >
                {/* todoIcon */}
                <FontAwesome
                  style={tw`mt-1 text-lg ml-3.5`}
                  name="trash-o"
                  color="#ff2233"
                  onPress={() => deleteTodo(item)}
                />
                {/* innerContainer */}
                <View style={tw`items-center flex-row ml-11 `}>
                  {/* itemHeading */}
                  <Text style={tw`font-bold text-lg mr-5`}>
                    {item.heading[0].toUpperCase() + item.heading.slice(1)}
                  </Text>
                </View>
              </Pressable>
            </View>;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
