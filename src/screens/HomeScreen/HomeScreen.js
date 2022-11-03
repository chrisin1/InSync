import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './HomeStyles';


export default function HomeScreen(props) {
    return (
        <View style ={styles.container}>
            
            <Text style={styles.title}> Sync Up! </Text>
            <Image
                style={ styles.logo }
                source={require('../../../assets/placeholder-logo.jpg')}
            />

        </View>
    )
}