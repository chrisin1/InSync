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
        <View style ={styles.container}>
            
            <Text style={styles.title}> Sync Up! </Text>
            <Image
                style={ styles.logo }
                source={require('../../../assets/placeholder-logo.jpg')}
            />
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.buttonTitle}>Log out</Text>
            </TouchableOpacity>
        </View>
    )
}