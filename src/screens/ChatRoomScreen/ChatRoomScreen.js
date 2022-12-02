import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './ChatRoomStyles';
import MessageComponent from '../../components/MessageComponent';
import InputComponent from '../../components/InputComponent';

export default function ChatScreen({navigation}) {
    const onBackPress = () => {
        navigation.navigate('Chat');
    }

    return (

    <View style={styles.container}>
        <View style = {styles.backContainer}>
            <TouchableOpacity
                style = {styles.backButton}
                onPress={() => onBackPress()}>

                <Text style = {styles.buttonTitle}>Back</Text>
            </TouchableOpacity>
            
        </View>

        <View style = {styles.profileContainer}>
            <Text style = {styles.profileText}> Chris In </Text>
            <Image source={require('../../../assets/placeholder-profile.png')} style = {styles.profileImage}/>
        </View>
        
        <MessageComponent></MessageComponent>
        
        



        <View style = {styles.bottomContainer}>
            <InputComponent></InputComponent>
        </View>
        

    </View>
      

    )
}

