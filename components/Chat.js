import { View, StyleSheet, Platform, KeyboardAvoidingView, Text, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

import { initializeApp } from 'firebase/app';

const firebase = require('firebase');
require('firebase/firestore');

//Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7-YHMgVTqc3gkYzf7uNPd5XJny9DwYmI",
  authDomain: "chat-app-cd5ee.firebaseapp.com",
  projectId: "chat-app-cd5ee",
  storageBucket: "chat-app-cd5ee.appspot.com",
  messagingSenderId: "681563584860",
  appId: "1:681563584860:web:52cec18611a8f0d8f6a999"
};

//Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);


export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: undefined,
      user: {
        _id: '',
        name: '',
      },
      image: null,
      location: null,
      isConnected: false,
    };
  }

  componentDidMount() {
    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(
      user => {
        if (!user) { firebase.auth().signInAnonymously(); }
        this.setState({
          uid: user.uid,
          messages: [],
          user: {
            _id: user.uid,
            name: this.props.route.params.name,
          },
          loggedInText: '',
        });

        this.unsubscribe = this.referenceChatMessages
          .orderBy('createdAt', 'desc')
          .onSnapshot(this.onCollectionUpdate);
      }
    );
  }

  componentWillUnmount() {
    if (this.referenceChatMessages) {
      this.unsubscribe();
      this.authUnsubscribe();
    }
  }

  onCollectionUpdate = (QuerySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        }
      });
    });

    this.setState({ messages });
  };

  addMessage = () => {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt,
      image: message.image || null,
      location: message.location || null,
      text: message.text || '',
      uid: this.state.uid,
      user: message.user
    });
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessage(messages);
      }
    );
  }

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#000' }
        }}
      />
    )
  }

  render() {
    let backgroundColor = this.props.route.params.backgroundColor;
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <GiftedChat
          messages={this.state.messages}
          renderBubble={this.renderBubble.bind(this)}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: name
          }}
        />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
        {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

