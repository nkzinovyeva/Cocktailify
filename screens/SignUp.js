import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, TextInput, Image} from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';

export default function Signup({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //save user to the DB
    const saveUser = (user) => {
        firebase.database().ref("users/").push(
          {'id': user.uid, 'e-mail': user.email}
        );
    };

    const signup = () => {
        if (email === '' || password === '' )  {
            Alert.alert('Please fill the form properly');
        }
        else if (password !== confirmPassword) {
            Alert.alert("Passwords don't match.")
            return
        }
        else {
            firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                if (firebase.auth().currentUser) {
                    saveUser(firebase.auth().currentUser)
                }
            })
            .catch((error) => {
                let errorMessage = error.message;
                Alert.alert(errorMessage)
            });
        }
    };
        
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
            <TextInput
                style={styles.input}
                placeholder='Confirm Password'
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <View style ={{flexDirection: 'row'}}>
                <Button
                    buttonStyle={{...styles.button,...{backgroundColor: 'gray'}}}
                    onPress={() => navigation.navigate('Sign In')}
                    title="BACK TO LOG IN" 
                />
                <Button
                    buttonStyle={styles.button}
                    onPress={() => signup()}
                    title="SIGN UP" 
                />
            </View>
        </View>
    );
};

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
        marginLeft: 5,
        marginRight:5,
        marginTop: 20,
        height: 40,
        width: 160,
        borderRadius: 5,
    },
});