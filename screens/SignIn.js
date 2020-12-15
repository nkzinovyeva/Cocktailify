import React, { useState } from 'react';
import { StyleSheet, View, Alert, Image, TextInput, Text } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';


export default function SignIn({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Log in with firebase authentification
    const login = () => {
        if (email === '' && password === '') {
            Alert.alert('Please fill the email and the password');
        }
        else {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then((user) => {
                })
                .catch(error => {
                    let errorMessage = error.message;
                    Alert.alert(errorMessage)
                })
        }
    }

   //Navigate to the signup screen
    const signup = () => {
        navigation.navigate('Sign up');
    }

    //reset password
    function sendPasswordReset() {
        const userEmail = email;
        firebase.auth().sendPasswordResetEmail(userEmail)
          .then(() => {
            Alert.alert('Password reset email sent!')
          })
          .catch((error) => {
            let errorMessage = error.message;
            Alert.alert(errorMessage)
          });
      }

    return (
        <View style={styles.container}>
            <Image
                style={{ width: 150, height: 150, marginTop: 30 }}
                source={require('../assets/logo.png')}
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                autoCapitalize="none"
            />
            <View style ={{flexDirection: 'row'}}>
                <Button
                    buttonStyle={{...styles.button,...{backgroundColor: 'gray'}}}
                    onPress={() => signup()}
                    title="SIGN UP"
                />
                <Button
                    buttonStyle={styles.button}
                    onPress={() => login()}
                    title="LOG IN" 
                />
            </View>
            <Button
                type='clear'
                onPress={() => sendPasswordReset()}
                title="Reset password" 
            />
            <Text style={{margin: 20, color: 'gray'}}
                >* To reset your password, enter your email address and click on "Reset password"</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    input: {
        height: 48,
        width: '80%',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: 'tomato',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20,
        height: 40,
        width: 120,
        borderRadius: 5,
    },
});