import React, { useState, useContext } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from '../../AuthContext/AuthContext'
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
        navigation.navigate('Setup', {fullName, email, password})
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ width: '100%' }}
                keyboardShouldPersistTaps='always'>
                <Text style={styles.title}> Sign Up </Text>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/insync-logo.png')}
                />
                <Text style={styles.inputTitle}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
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
                <Text style={styles.inputTitle}>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        Already have an account? 
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>  Log In</Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}