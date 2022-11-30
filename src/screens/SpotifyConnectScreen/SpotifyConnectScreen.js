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
            <Text style={styles.title}>
                Connect to Spotify
            </Text>
            <Image
                style={ styles.logo }
                source={require('../../../assets/spotify-logo.png')}
            />
            <Text style={styles.text}> 
                Our app requests that users connect their profile with their Spotify account for the fullest experience.
                {'\n\n'}
                Connect your Spotify account now! 
            </Text>
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => onConnectPress()}>
                    <Text style={styles.buttonTitle}>Connect with Spotify</Text>
            </TouchableOpacity>
        </View>
    )
}