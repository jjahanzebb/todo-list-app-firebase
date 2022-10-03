import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
  StatusBar,
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

  // fetch/read todo from firebase database
  useEffect(() => {
    todoRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { heading } = doc.data();
        const { completed } = doc.data();
        const { color } = doc.data();
        todos.push({
          id: doc.id,
          heading,
          completed,
          color,
        });
      });
      setTodos(todos);
    });
  }, []);

  // delete/remove todo from firebase database
  const deleteTodo = (item) => {
    todoRef
      .doc(item.id)
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
        completed: false,
        color: generateColor(),
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

  // updates to-do if it is completed or not in database
  const handleChecked = (item) => {
    todoRef
      .doc(item.id)
      .update({
        completed: !item.completed,
      })
      .then(() => {
        console.log("Status Updated!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // generates random color to store with to-do
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#1D3557" }]}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#1D3557"} />

      {/* white container */}
      <View
        style={[tw`flex-1 rounded-tl-full`, { backgroundColor: "#F1FCFE" }]}
      >
        {/* Top Bar */}
        <View style={[tw`justify-between flex-row mt-8 mx-4 rounded-lg`]}>
          <View>
            <Text
              style={[
                tw`text-2xl font-semibold rounded-l-lg pl-2 pr-1.2 py-0.5`,
                { color: "#F1FCFE" },
              ]}
            >
              Home
            </Text>
          </View>

          {/* Logo */}
          <View style={[tw`flex-row`]}>
            <Text
              style={[
                tw`text-2xl font-800 rounded-l-lg pl-2 pr-1.2 py-0.5`,
                { color: "#3890C7", backgroundColor: "transparent" },
              ]}
            >
              My
            </Text>

            <Text
              style={[
                tw`text-2xl font-800 rounded-lg px-2 py-0.5`,
                { color: "#F1FCFE", backgroundColor: "#3890C7", elevation: 2 },
              ]}
            >
              to-dos
            </Text>
          </View>
        </View>

        {/* formContainer */}
        <View style={[tw`flex-row h-12 mx-4 mt-14`, { elevation: 10 }]}>
          {/* input */}
          <TextInput
            style={[
              tw`h-12 rounded-l-xl px-4 pr-2 text-base overflow-hidden flex-1`,
              { backgroundColor: "#1D3557", color: "#F1FCFE", elevation: 5 },
            ]}
            placeholder="Enter a new to-do.."
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
              { backgroundColor: "#3890C7", elevation: 10 },
            ]}
            onPress={addTodo}
            activeOpacity={0.5}
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
                  tw`h-12 pr-4 mt-2 mx-4 flex-row items-center rounded-xl `,
                  { backgroundColor: "#1D3557", elevation: 5 },
                ]}
                onPress={() => navigation.navigate("Details", { item })}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    tw`w-2.5 h-12 rounded-l-xl`,
                    {
                      backgroundColor: item.color,
                    },
                  ]}
                />

                <TouchableOpacity
                  style={tw`ml-2 rounded-full w-8 h-8 border-2 border-white items-center justify-center  ${
                    item.completed && "bg-emerald-500"
                  }`}
                  onPress={() => handleChecked(item)}
                >
                  {item.completed === true && (
                    <MaterialCommunityIcons
                      style={[tw`text-base`, { elevation: 2 }]}
                      name="check-bold"
                      color="#F1FCFE"
                    />
                  )}
                </TouchableOpacity>

                {/* innerContainer */}
                <View style={tw`items-center flex-row ml-3 flex-1`}>
                  {/* itemHeading */}
                  <Text
                    style={[
                      { color: "#F1FCFE" },
                      tw`text-base font-bold mr-5 ${
                        item.completed &&
                        "line-through text-slate-400 font-semibold"
                      }`,
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
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
