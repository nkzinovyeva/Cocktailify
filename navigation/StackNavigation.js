import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import Signup from '../screens/SignUp';

const Stack = createStackNavigator();

const defaultNavOptions =  {
    headerStyle: {
      backgroundColor: 'tomato',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    headerBackTitleStyle: {
    }
}

const LoginStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={({ route, navigation }) => (defaultNavOptions)} >
            <Stack.Screen name="Sign In" component={SignIn} />
            <Stack.Screen name="Sign up" component={Signup} />
        </Stack.Navigator>
    );
}

export {LoginStackNavigator};