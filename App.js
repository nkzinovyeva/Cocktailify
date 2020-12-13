import React, { useState } from "react";
import AppNav from "./navigation/AppNavigation";
import { NavigationContainer } from '@react-navigation/native';
import {LoginStackNavigator} from './navigation/StackNavigation';
import {firebaseConfig} from './screens/keys';
import * as firebase from 'firebase';

const config = firebaseConfig() ;
  
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default function App() {

  const [user, setUser] = useState('');
  
  //logged user
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      let uid = user.uid;
      setUser(uid);
    }
    else {
      setUser(null);
    }
  });
  
  //show the main navigation for the logged user
  if (user != null) {
    return (
        < NavigationContainer >
          <AppNav headerMode="none" headerShown="false" />
        </NavigationContainer >
    )
  } else { //If the user is not logged in, show the screens to login or signup
      return (
        < NavigationContainer >
          <LoginStackNavigator headerMode="none" headerShown="false"  />
        </NavigationContainer >
      )
  }
}