import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Linking } from 'react-native'
import styles from './SpotifyStyles';


export default function SpotifyConnectScreen(props) {
    const onConnectPress = () => {
        // navigation.navigate('Home')
        // Linking.openURL('http://localhost:8888/login')
        window.location.href = 'http://localhost:8888/login'
    }
    return (
        <View style ={styles.container}>
            
            <Text style={styles.title}> Our app requires that users connect their profile with their Spotify Account for the fullest experience. Please connect to your Spotify account </Text>
            <Image
                style={ styles.logo }
                source={require('../../../assets/placeholder-logo.jpg')}
            />
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => onConnectPress()}>
                    <Text style={styles.buttonTitle}>Connect With Spotify</Text>
            </TouchableOpacity>
        </View>
    )
}