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

const Details = ({ route }) => {
  const todoRef = firebase.firestore().collection("todos");
  const [textHeading, onChangeHeadingText] = useState(
    route.params.item.heading
  );
  const navigation = useNavigation();

  const updateTodo = () => {
    if (textHeading && textHeading.length > 0) {
      todoRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading,
        })
        .then(() => {
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#1D3557" }]}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#1D3557"} />

      {/* white container */}
      <View
        style={[tw`flex-1 rounded-tr-full `, { backgroundColor: "#F1FCFE" }]}
      >
        {/* Top Bar */}
        <View style={[tw`justify-between flex-row mt-8 mx-4 rounded-lg`]}>
          <View style={tw`flex-row items-center`}>
            {/* back button */}
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              activeOpacity={0.5}
            >
              <Ionicons
                style={[tw`text-2xl -ml-0.5 mt-0.25 px-2 rounded-full`, {}]}
                name="chevron-back"
                color="#1D3557"
              />
            </TouchableOpacity>

            <Text
              style={[
                tw`text-2xl font-semibold rounded-l-lg  pr-1.2 py-0.5`,
                { color: "#1D3557" },
              ]}
            >
              Details
            </Text>
          </View>

          {/* Logo */}
          <View style={[tw`flex-row`]}>
            <Text
              style={[
                tw`text-2xl font-800 rounded-l-lg pl-2 pr-1.2 py-0.5`,
                { color: "#F1FCFE", backgroundColor: "transparent" },
              ]}
            >
              My
            </Text>

            <Text
              style={[
                tw`text-2xl font-800 rounded-lg px-2 py-0.5`,
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
        <View style={[tw`mx-4 mt-30`, { elevation: 0 }]}>
          {/* buttonUpdate */}

          {/* input */}
          <Text
            style={[
              tw`text-base font-bold py-1`,
              { backgroundColor: "transparent", color: "#1D3557" },
            ]}
          >
            Task Heading
          </Text>
          <TextInput
            style={[
              tw`h-12 rounded-xl px-4 pr-2 text-base overflow-hidden `,
              { backgroundColor: "#1D3557", color: "#F1FCFE", elevation: 5 },
            ]}
            placeholderTextColor="#888899"
            onChangeText={onChangeHeadingText}
            value={textHeading}
            placeholder="Update your Task to do.."
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />

          {/* button */}
          <TouchableOpacity
            style={[
              tw`h-12 rounded-xl px-4.5 mt-4 items-center justify-center flex-row`,
              { backgroundColor: "#6ab934", elevation: 10 },
            ]}
            onPress={() => {
              updateTodo();
            }}
            activeOpacity={0.5}
          >
            <MaterialCommunityIcons
              style={[tw`text-xl`, { elevation: 5 }]}
              name="update"
              color="#F1FCFE"
            />

            {/* buttonText */}
            <Text style={[tw`text-base ml-4`, { color: "#F1FCFE" }]}>
              Update To-do
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({});
