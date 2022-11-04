import React, { useState, useContext } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../AuthContext/AuthContext'
import styles from './HomeStyles';

export default function HomeScreen(props) {
    const { logOut } = useContext(AuthContext);

    const onLogoutPress = () => {
        logOut();  
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Sync Up! </Text>

            <View style={styles.cardContainer}>
                <Text style={styles.nameText}> Jane Doe </Text>
                <Image style={styles.imageContainer}
                    source={require('../../../assets/placeholder-logo.jpg')} />
                <Text style={styles.compText}> 95% Compatible </Text>
                <Text style={styles.detailsText}> Compatibility Details **REPLACE LATER** </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => alert('PRESSED LEFT')}>
                        <Image style={styles.buttonIcon}
                            source={require('../../../assets/favicon.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => alert('PRESSED RIGHT')}>
                        <Image style={styles.buttonIcon}
                            source={require('../../../assets/favicon.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.buttonTitle}>Log out</Text>
            </TouchableOpacity>
        </View>
    )
}