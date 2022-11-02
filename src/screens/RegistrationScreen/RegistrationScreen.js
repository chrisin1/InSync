import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"; 
import { auth, db } from '../../firebase/config'
import styles from './RegistrationStyles'

export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            alert("Account made.")
            try {
                const docRef = addDoc(collection(db, "users"), {
                  id: userCredential.user.uid,
                  email: email,
                  fullName: fullName
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ width: '100%' }}
                keyboardShouldPersistTaps='always'>
                <Text style={styles.title}> Sign up </Text>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/placeholder-logo.jpg')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor='white'
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor='white'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    placeholderTextColor='white'
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Confirm Password'
                    placeholderTextColor='white'
                    secureTextEntry
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Sign up</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        Already have an account? 
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>  Log in</Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}