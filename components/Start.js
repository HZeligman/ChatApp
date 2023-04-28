import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, KeyboardAvoidingView } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";
import { Alert } from "react-native";

const Start = ({ navigation }) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: text ? text : "User",
          color: color ? color : "white",
        });
        Alert.alert("Signed in successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
      });
  };

  return (
    <ImageBackground
      source={require("../assets/background-image.png")}
      resizeMode='cover'
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Chat App!</Text>
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder='Your name'
            style={styles.input}
            onChangeText={setText}
          />

          <Text>Choose Background Color</Text>
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#090C08" }]}
              onPress={() => setColor("#090C08")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#474056" }]}
              onPress={() => setColor("#474056")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#8A95A5" }]}
              onPress={() => setColor("#8A95A5")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#B9C6AE" }]}
              onPress={() => setColor("#B9C6AE")}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={signInUser}>
            <Text>Go to Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior='padding' />
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "88%",
  },
  radioButtonContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  radioButton: {
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  input: {
    height: 40,
    width: "88%",
    margin: 12,
    borderWidth: 3,
    padding: 10,
  },
});

export default Start;