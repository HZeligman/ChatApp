import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, Alert, Pressable } from 'react-native';
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

const backgroundImage = require('../assets/background-image.png');

const COLOR_1 = '#090C08';
const COLOR_2 = '#474056';
const COLOR_3 = '#8A95A5';
const COLOR_4 = '#B9C6AE';

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(backgroundColor);

  const signInUser = () => {
    if (name.length < 3) {
      Alert.alert('Please enter a name with at least three characters.');
      return;
    }
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate('Chat', {
          uid: result.user.uid,
          name: name,
          backgroundColor: backgroundColor,
        });
        Alert.alert('Successfully Signed In');
      })
      .catch((error) => {
        Alert.alert('Unable to sign in. Try again later.');
      });
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode='cover'
      style={[styles.container, styles.image]}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Chat App</Text>
      </View>

      <View style={styles.formwrapper}>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInput}
            onChangeText={setName}
            value={name}
            placeholder='Enter Name'
            textContentType='username'
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Choose Your Background Color</Text>
          <View style={styles.colorsWrapper}>
            <Pressable
              onPress={() => setBackgroundColor(COLOR_1)}
              style={[
                styles.btn_colors__inactive,
                backgroundColor === COLOR_1 ? styles.btn_colors__active : null,
              ]}
            >
              <View style={[styles.btn_colors, styles.btn_colors__1]}></View>
            </Pressable>
            <Pressable
              onPress={() => setBackgroundColor(COLOR_2)}
              style={[
                styles.btn_colors__inactive,
                backgroundColor === COLOR_2 ? styles.btn_colors__active : null,
              ]}
            >
              <View style={[styles.btn_colors, styles.btn_colors__2]}></View>
            </Pressable>
            <Pressable
              onPress={() => setBackgroundColor(COLOR_3)}
              style={[
                styles.btn_colors__inactive,
                backgroundColor === COLOR_3 ? styles.btn_colors__active : null,
              ]}
            >
              <View style={[styles.btn_colors, styles.btn_colors__3]}></View>
            </Pressable>
            <Pressable
              onPress={() => setBackgroundColor(COLOR_4)}
              style={[
                styles.btn_colors__inactive,
                backgroundColor === COLOR_4 ? styles.btn_colors__active : null,
              ]}
            >
              <View style={[styles.btn_colors, styles.btn_colors__4]}></View>
            </Pressable>
          </View>
        </View>
        <Pressable onPress={signInUser} style={styles.button}>
          <Text style={styles.buttonText}>Start Chatting</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
  },

  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
    marginBottom: 10,
  },

  formWrapper: {
    backgroundColor: '#fff',
    width: '88%',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },

  inputSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    borderColor: '#757083',
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: 20,
  },

  textInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    textAlign: 'center',
  },

  colorsWrapper: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: 20,
    height: 60,
  },

  image: {
    height: '100%',
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

  btn: {
    height: 50,
    width: '100%',
    backgroundColor: '#757083',
    borderRadius: 50,
    padding: 15,
  },

  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
  },

  btn_colors__inactive: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn_colors__active: {
    borderColor: '#757083',
  },

  btn_colors: {
    width: 45,
    height: 45,
    padding: 10,
    borderRadius: 50,
  },

  btn_colors__1: {
    backgroundColor: COLOR_1,
  },

  btn_colors__2: {
    backgroundColor: COLOR_2,
  },

  btn_colors__3: {
    backgroundColor: COLOR_3,
  },

  btn_colors__4: {
    backgroundColor: COLOR_4,
  },
});

export default Start;