import { View, StyleSheet, Platform, KeyboardAvoidingView, Text, Button, Alert, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';

import { collection, addDoc, onSnapshot, query, orderBy, DocumentSnapshot } from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { uid, name, backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  let unsubscribeMessages;
  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      if (unsubscribeMessages) unsubscribeMessages();
      unsubscribeMessages = null;

      unsubscribeMessages = onSnapshot(
        query(collection(db, 'messages'), orderBy('createdAt', 'desc')),
        async (documentsSnapshot) => {
          let newMessages = [];
          documentsSnapshot.forEach((doc) => {
            newMessages.push({
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis()),
            });
          });
          cacheMessages(newMessages);
          setMessages(newMessages);
        }
      );
    } else {
      loadCachedMessages();
    }

    return () => {
      if (unsubscribeMessages) unsubscribeMessages();
    };
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const deleteCachedMessages = async () => {
    await AsyncStorage.removeItem('messages');
  };

  const addMessage = async (newMessages) => {
    const newMessageRef = await addDoc(
      collection(db, 'messages'),
      newMessages[0]
    );
    if (!newMessageRef.id) {
      Alert.alert('Unable to send Message. Try again later.');
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#000' },
          left: { backgroundColor: '#FFF' },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    isConnected && <InputToolbar {...props} />;
  };

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} uid={uid} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        //<view style={{ borderRadius: 13, margin: 3 }}>
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          //provider='google'
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={() => {
            if (Platform.os === 'android') {
              Linking.openURL(
                `geo:${currentMessage.location.latitude}, ${currentMessage.location.longitude}`
              );
            }
          }}
        />
        //</view>
      );
    }
    return null;
  };

  return (
    <View style={styles.container(backgroundColor)}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => addMessage(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: uid,
          name,
        }}
      />
      {Platform.os === 'android' && <KeyboardAvoidingView behavior='height' />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: (backgroundColor) => {
    return {
      flex: 1,
      backgroundColor: backgroundColor,
    };
  },
});

export default Chat;

