import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import styles from './ChatStyles';


export default function ChatScreen({navigation}) {
    var [history, setHistory] = useState([]);
    var [displayName, setDisplayName] = useState('');
    var [profilePic, setProfilePic] = useState('');

    const onRoomPress = (user) => {
        navigation.navigate('ChatRoom', {user});
    }

    auth.onAuthStateChanged(user => {
        if (user) { // user is logged in
            const docRef = doc(db, 'users', user.uid);
            getDoc(docRef).then(async (userDoc) => {
                setHistory(userDoc.data().history);
            })
            .catch((error) => {
                console.log('error retrieving user information: ', error);
            })
        }
    })

    const matchedUsers = history.filter(function(func) {
        return func.matched == 1
    });

    return (
        <View style ={styles.container}>
            <Text style= {styles.title}>Messages</Text>

            <View>
                {matchedUsers.map((user) => {
                    console.log('user: ', user);
                    return (
                        <TouchableOpacity onPress={() => onRoomPress(user)}>
                            <View style={styles.chatContainer}>
                                <Image 
                                    style={styles.image}
                                    source={user.profilePic}
                                    defaultSource={require('../../../assets/placeholder-profile.png')}
                                    />
                                <View style ={styles.rightContainer} >
                                    <View style ={styles.row}>
                                        <Text style ={styles.name}>{user.displayName}</Text>
                                        <Text style ={styles.text}></Text>
                                    </View>
                                    <Text style ={styles.text} numberOfLines ={1}>we just matched!</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>

        </View>
    )
}