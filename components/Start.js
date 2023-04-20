import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const bgColors = {
  black: { backgroundColor: "#000000" },
  gray: { backgroundColor: "#8a95a5" },
  purple: { backgroundColor: "#474056" },
  green: { backgroundColor: "#94ae89" },
};

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bgColor: ""
    };
  }

  render() {
    const { black, gray, purple, green } = bgColors;
    return (
      <ImageBackground
        source={require("../assets/background-image.png")}
        style={[styles.container, styles.columnEvenlyCenter]}
      >
        <Text style={styles.title}>Chat Tack</Text>

        <View style={[styles.nameInput__container, styles.columnEvenlyCenter]}>
          <TextInput
            style={styles.nameInput__input}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder="Enter your Name"
          />

          <View style={styles.colorSelect}>
            <Text style={styles.colorSelect__text}>
              Choose your Background:
            </Text>
            <View style={styles.colorSelect__dotsWrapper}>
              <TouchableOpacity
                style={[
                  styles.colorSelect__dot,
                  black,
                  this.state.color === black.backgroundColor
                    ? styles.colorSelect__dotSelected
                    : {},
                ]}
                onPress={() => this.setState({ bgColor: black.backgroundColor })} // 
              />

              <TouchableOpacity
                style={[
                  styles.colorSelect__dot,
                  gray,
                  this.state.color === gray.backgroundColor
                    ? styles.colorSelect__dotSelected
                    : {},
                ]}
                onPress={() => this.setState({ bgColor: gray.backgroundColor })}
              />

              <TouchableOpacity
                style={[
                  styles.colorSelect__dot,
                  purple,
                  this.state.color === purple.backgroundColor
                    ? styles.colorSelect__dotSelected
                    : {},
                ]}
                onPress={() => this.setState({ bgColor: purple.backgroundColor })}
              />

              <TouchableOpacity
                style={[
                  styles.colorSelect__dot,
                  green,
                  this.state.color === green.backgroundColor
                    ? styles.colorSelect__dotSelected
                    : {},
                ]}
                onPress={() => this.setState({ bgColor: green.backgroundColor })}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.fauxButton}
            onPress={() =>
              this.props.navigation.navigate("Chat", {
                name: this.state.name || "no-name",
                bgColor: this.state.bgColor || bgColors.gray.backgroundColor,
              })
            }
          >
            <Text style={[styles.colorSelect__text, styles.fauxButton__text]}>
              Start Chatting
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  columnEvenlyCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 45,
    fontWeight: "600",
  },

  nameInput__container: {
    backgroundColor: "#fff",
    height: "44%",
    minHeight: 200,
    width: "88%",
  },

  nameInput__input: {
    height: 50,
    width: "88%",
    paddingLeft: 20,
    borderColor: "gray",
    borderWidth: 1,
    color: "#757083",
    opacity: 50,
    fontSize: 16,
    fontWeight: "300",
  },

  colorSelect: {
    height: 75,
  },

  colorSelect__text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
  },

  colorSelect__dotsWrapper: {
    flexDirection: "row",
  },

  colorSelect__dot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
  },

  colorSelect__dotSelected: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#5f5f5f",
  },

  fauxButton: {
    backgroundColor: "#757083",
    justifyContent: "center",
    width: "88%",
    padding: 16,
  },

  fauxButton__text: {
    color: "#fff",
    fontWeight: "600",
  },
});