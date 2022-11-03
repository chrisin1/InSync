import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './ProfileStyles';


export default function HomeScreen(props) {
    return (
        <View style ={styles.container}>
            
            <Text style={styles.title}> Profile </Text>
            <Image
                style={ styles.logo }
                source={require('../../../assets/placeholder-logo.jpg')}
            />

        </View>
    )
}