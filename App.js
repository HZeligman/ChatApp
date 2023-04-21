import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { disableNetwork, enableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useNetInfo } from '@react-native-community/netinfo';

import Start from './components/Start';
import Chat from './components/Chat';

//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';

import 'react-native-gesture-handler';


const Stack = createStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyC7-YHMgVTqc3gkYzf7uNPd5XJny9DwYmI",
    authDomain: "chat-app-cd5ee.firebaseapp.com",
    projectId: "chat-app-cd5ee",
    storageBucket: "chat-app-cd5ee.appspot.com",
    messagingSenderId: "681563584860",
    appId: "1:681563584860:web:52cec18611a8f0d8f6a999"
  };
  const connectionStatus = useNetInfo();

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App;