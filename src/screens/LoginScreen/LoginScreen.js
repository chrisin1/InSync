import React, { useState, useEffect, useContext } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Linking } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from '../../AuthContext/AuthContext'
import { auth, db } from '../../firebase/config'
import styles from './LoginStyles'


export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { logIn } = useContext(AuthContext)

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {
        // if (logIn({ email, password }) == true){
        //     console.log("success")
        //     navigation.navigate('Connect With Spotify')  
        // }
        logIn({ email, password })
        auth.onAuthStateChanged(user => {
            if (user) { 
                navigation.navigate('Connect With Spotify')  
            }
        })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps='always'>
                <Text style={styles.title}> Log In </Text>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/insync-logo.png')}
                />
                <Text style={styles.inputTitle}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log In</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        Don't have an account? 
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>  Sign Up</Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}