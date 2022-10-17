import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Login = ({}) => {
  const todoRef = firebase.firestore().collection("todos");

  const navigation = useNavigation();

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
            onChangeText={""}
            value={""}
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
            onChangeText={""}
            value={""}
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
            onPress={() => {
              "";
            }}
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
