import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

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
    // container
    <SafeAreaView style={tw`mt-20 mx-3.5`}>
      {/* textField */}
      <TextInput
        style={tw`mb-2.5 p-2.5 text-base text-black bg-gray-400 rounded-lg`}
        onChangeText={onChangeHeadingText}
        value={textHeading}
        placeholder="Update your Task to do.."
      />

      {/* buttonUpdate */}
      <Pressable
        style={tw`mt-6.5 items-center justify-center py-3 px-8 rounded-lg shadow-lg bg-green-600`}
        onPress={() => {
          updateTodo();
        }}
      >
        <Text>Update todo</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({});
