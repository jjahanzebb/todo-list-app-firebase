import {
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import * as SQLite from "expo-sqlite";

// Defining Database in const
const db = SQLite.openDatabase(
  { name: "MainDB1", location: "default" },
  () => {},
  (error) => {
    console.log("DB ERROR => ", error);
  }
);

const Login = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    createTable();
    getData();
  }, []);

  // Creatng table in Database
  const createTable = () => {
    console.log("db ==>", db);
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, u_name TEXT, u_pass TEXT);",
        []
      );
    });
  };

  // Insert into Table of Database
  const setData = async () => {
    if (username.length == 0 || password.length == 0) {
      Alert.alert("Wrong Credentials!", "Please enter Username and Password");
    } else {
      try {
        await db.transaction(async (tx) => {
          await tx.executeSql(
            "INSERT INTO users (u_name, u_pass) VALUES (?,?)",
            ["gibberish", "12345"]
          );
          console.log("ssssssssssssssssssssssss");

          await tx.executeSql(
            "SELECT u_name, u_pass FROM users",
            [results],
            (tx, results) => {
              var rows = results.rows.length;
              console.log("ROWS => ", results);
              if (rows > 0) {
                setUsername(results.rows.item(0).Username);
                setPassword(results.rows.item(0).Password);
              }
            }
          );
        });
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Fetch data from Database and login if data is saved already
  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM users", [], (tx, results) => {
          var rows = results.rows.length;
          if (rows > 0) {
            navigation.navigate("Home");
          }
        });
      });
    } catch (error) {
      console.log("FETCH ERROR => ", error);
    }
  };

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#1D3557" }]}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#1D3557"} />

      {/* white container */}
      <View style={[tw`flex-1`, { backgroundColor: "#1D3557" }]}>
        {/* Top Bar */}
        <View style={[tw`justify-between flex-row mt-40 mx-4 rounded-lg`]}>
          {/* Logo */}
          <View style={[tw`flex-row justify-center flex-1`]}>
            <Text
              style={[
                tw`text-4xl font-800 rounded-l-lg pl-2 pr-1.2 py-0.5`,
                { color: "#F1FCFE", backgroundColor: "transparent" },
              ]}
            >
              My
            </Text>

            <Text
              style={[
                tw`text-4xl font-800 rounded-lg px-2 py-0.5`,
                {
                  color: "#F1FCFE",
                  backgroundColor: "#3890C7",
                  elevation: 2,
                },
              ]}
            >
              to-dos
            </Text>
          </View>
        </View>

        {/* formContainer */}
        <View style={[tw`mx-4 mt-18 px-10`, { elevation: 0 }]}>
          {/* input */}
          <Text
            style={[
              tw`text-base font-bold pb-4 self-center`,
              { backgroundColor: "transparent", color: "#F1FCFE" },
            ]}
          >
            Login Credentials
          </Text>
          <TextInput
            style={[
              tw`h-12 rounded-xl px-4 pr-2 text-base overflow-hidden `,
              { backgroundColor: "#F1FCFE", color: "#1D3557", elevation: 5 },
            ]}
            placeholderTextColor="#888899"
            onChangeText={(text) => setUsername(text)}
            value={username}
            placeholder="Enter Username.."
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          {/* input */}
          {/* <Text
            style={[
              tw`text-base font-bold py-1`,
              { backgroundColor: "transparent", color: "#F1FCFE" },
            ]}
          >
            Password
          </Text> */}
          <TextInput
            style={[
              tw`h-12 rounded-xl px-4 pr-2 mt-2 text-base overflow-hidden `,
              { backgroundColor: "#F1FCFE", color: "#1D3557", elevation: 5 },
            ]}
            placeholderTextColor="#888899"
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Enter Password.."
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />

          {/* button */}
          <TouchableOpacity
            style={[
              tw`h-12 rounded-xl pr-4 mt-4 items-center justify-center flex-row`,
              { backgroundColor: "#6ab934", elevation: 10 },
            ]}
            onPress={setData}
            activeOpacity={0.5}
          >
            <MaterialCommunityIcons
              style={[tw`text-xl -mb-0.5`, { elevation: 5 }]}
              name="login-variant"
              color="#F1FCFE"
            />

            {/* buttonText */}
            <Text style={[tw`text-base ml-4`, { color: "#F1FCFE" }]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
