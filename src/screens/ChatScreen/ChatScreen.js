import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './ChatStyles';


export default function ChatScreen(props) {
    return (
        <View style ={styles.container}>
            
            <Text style={styles.title}> Chat </Text>
            <Image
                style={ styles.logo }
                source={require('../../../assets/placeholder-logo.jpg')}
            />

        </View>
    )
}