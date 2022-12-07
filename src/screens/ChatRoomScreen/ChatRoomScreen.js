import React, { useState } from 'react'
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './ChatRoomStyles';
import MessageComponent from '../../components/MessageComponent';
import InputComponent from '../../components/InputComponent';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';

export default function ChatScreen({navigation}) {
    const route = useRoute();
    const displayName = route.params.user.displayName;
    const profilePic = route.params.user.profilePic;
    const id = route.params.user.id;
    const messages = route.params.messages;

    const onBackPress = () => {
        navigation.navigate('Chat');
    }

    const writeMessage = (text) => {
        auth.onAuthStateChanged(user => {
            if (user) { // user is signed in
                try {
                    addDoc(collection(db, 'chat/'+user.uid+'/messages'), {
                        id: id,
                        text: text,
                        incoming: false,
                        time: serverTimestamp()
                    });
                    addDoc(collection(db, 'chat/'+id+'/messages'), {
                        id: user.uid,
                        text: text,
                        incoming: true,
                        time: serverTimestamp()
                    });
                }
                catch(error) {
                    console.error('Error writing new message to Firebase Database', error);
                }
            }
        })
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
            <Text style = {styles.profileText}> {displayName} </Text>
            <Image 
                style={styles.profileImage}
                source={profilePic}
                defaultSource={require('../../../assets/placeholder-profile.png')} />
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

