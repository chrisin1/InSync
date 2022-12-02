import React, { useState } from 'react'
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './ChatRoomStyles';
import MessageComponent from '../../components/MessageComponent';
import InputComponent from '../../components/InputComponent';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen({navigation}) {
    const onBackPress = () => {
        navigation.navigate('Chat');
    }

    return (

    <View style={styles.container}>
        <Ionicons
            style={styles.backContainer}
            name="chevron-back-circle"
            color="#FF9382"
            size={52}
            onPress={() => onBackPress()}>
        </Ionicons>

        <View style = {styles.profileContainer}>
            <Text style = {styles.profileText}> Chris In </Text>
            <Image source={require('../../../assets/placeholder-profile.png')} style={styles.profileImage}/>
        </View>
        
        <View style={styles.messagesContainer}>
            <MessageComponent/>
        </View>
        
        <View style = {styles.bottomContainer}>
            <InputComponent/>
        </View>
        

    </View>
      

    )
}

