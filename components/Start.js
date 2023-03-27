import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const backgroundColors = {
  black: { backgroundColor: '#090C08' },
  purple: { backgroundColor: '#474056' },
  gray: { backgroundColor: '#8A95A5' },
  green: { backgroundColor: '#B9C6AE' },
}

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      backgroundColor: '',
    }
  }
  render() {
    const { black, purple, gray, green } = backgroundColors;
    return (
      <ImageBackground
        source={require('../assets/background-image.png')}
        style={[styles.container, styles.main]}
      >
        <Text style={styles.title}>Chat App</Text>

        <View style={[styles.box, styles.main]}>
          <TextInput
            style={styles.input}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='Enter Name'
          />
          <View>
            <Text style={styles.text}>Choose Your Background Color</Text>
            <View style={[styles.colors, styles.colorWrapper]}>
              <TouchableOpacity
                style={[
                  styles.color,
                  black,
                  this.state.color === black.backgroundColor
                    ? styles.colorSelected
                    : {},
                ]}
                onPress={() => this.setState({ backgroundColor: black.backgroundColor })}
              />
              <TouchableOpacity
                style={[
                  styles.color,
                  purple,
                  this.state.color === purple.backgroundColor
                    ? styles.colorSelected
                    : {},
                ]}
                onPress={() => this.setState({ backgroundColor: purple.backgroundColor })}
              />
              <TouchableOpacity
                style={[
                  styles.color,
                  gray,
                  this.state.color === gray.backgroundColor
                    ? styles.colorSelected
                    : {},
                ]}
                onPress={() => this.setState({ backgroundColor: gray.backgroundColor })}
              />
              <TouchableOpacity
                style={[
                  styles.color,
                  green,
                  this.state.color === green.backgroundColor
                    ? styles.colorSelected
                    : {},
                ]}
                onPress={() => this.setState({ backgroundColor: green.backgroundColor })}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            title='Start Chatting'
            onPress={() =>
              this.props.navigation.navigate('Chat', {
                name: this.state.name,
                backgroundColor: this.state.backgroundColor,
              })
            }
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  nameInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
  },

  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  box: {
    backgroundColor: '#ffffff',
    width: '88%',
    alignItems: 'center',
    height: '44%',
    justifyContent: 'space-evenly',
  },

  input: {
    height: 50,
    width: '88%',
    borderColor: 'gray',
    color: '#757083',
    borderWidth: 2,
    borderRadius: 20,
  },

  text: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    textAlign: 'center',
  },

  colors: {
    flexDirection: 'row',
  },

  colorWrapper: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  color: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 40,
  },

  colorSelected: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#5f5f5f',
  },

  button: {
    height: 50,
    width: '50%',
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
})