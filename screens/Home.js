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
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Checkbox from "expo-checkbox";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection("todos");
  const [addData, setAddData] = useState("");
  const navigation = useNavigation();

  const [isChecked, setChecked] = useState([]);

  const handleChecked = (item) => {
    if (isChecked.indexOf(item.id) >= 0) {
      isChecked.splice(isChecked.indexOf(item.id), 1);
    } else {
      isChecked.push(item.id);
    }
    console.log(isChecked);
  };

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
      <View style={tw`flex-row h-12 mx-4 mt-24 rounded-xl `}>
        {/* input */}
        <TextInput
          style={[
            tw`h-12 rounded-l-xl px-4 pr-2 text-base overflow-hidden flex-1`,
            { backgroundColor: "#1D3557", color: "#F1FCFE" },
          ]}
          placeholder="Enter a new Task to do.."
          placeholderTextColor="#888899"
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        {/* button */}
        <TouchableOpacity
          style={[
            tw`h-12 rounded-r-xl px-4.5 items-center justify-center`,
            { backgroundColor: "#3890C7" },
          ]}
          onPress={addTodo}
        >
          {/* buttonText */}
          {/* <Text style={[tw`text-base`, { color: "#F1FCFE" }]}>Add</Text> */}

          <Entypo
            style={[tw`text-xl`, { elevation: 5 }]}
            name="plus"
            color="#F1FCFE"
          />
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
                tw`h-12 px-4 mt-2 mr-4 flex-row items-center rounded-r-xl `,
                { backgroundColor: "#1D3557", elevation: 5 },
              ]}
              onPress={() => navigation.navigate("Details", { item })}
            >
              <TouchableOpacity
                style={tw`rounded-l-xl w-12 h-12 bg-gray-600 ${
                  !isChecked.indexOf(item.id) >= 0 && "bg-gray-500"
                }`}
                onPress={() => handleChecked(item)}
              />

              {/* innerContainer */}
              <View style={tw`items-center flex-row ml-3 flex-1`}>
                {/* itemHeading */}
                <Text
                  style={[
                    tw`text-base font-bold mr-5 ${
                      !isChecked.indexOf(item.id) >= 0 && "line-through"
                    }`,
                    { color: "#F1FCFE" },
                  ]}
                >
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
              </View>

              {/* todoIcon */}
              <TouchableOpacity
                style={[
                  tw`text-2xl -mr-4 py-2.5 px-4.5 rounded-r-xl`,
                  {
                    backgroundColor: "#E63946",
                  },
                ]}
                onPress={() => deleteTodo(item)}
              >
                <MaterialCommunityIcons
                  style={[tw`text-xl`, { elevation: 5 }]}
                  name="delete-outline"
                  color="#F1FCFE"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
