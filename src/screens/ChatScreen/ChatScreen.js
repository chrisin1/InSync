import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../../firebase/config';
import { doc, getDoc, onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import styles from './ChatStyles';


export default function ChatScreen({navigation}) {
    var [history, setHistory] = useState([]);
    var [messages, setMessages] = useState(['']);

    const onRoomPress = (user) => {
        navigation.navigate('ChatRoom', {user, messages});
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) { // user is logged in

                //Get user matching history and listen for updates
                const docRef = doc(db, 'users', user.uid);
                onSnapshot(docRef, (userDoc) => {
                    console.log("Current data: ", userDoc.data());
                    setHistory(userDoc.data().history);
                });

                //Get user's messages and listen for updates
                const messagesQuery = query(collection(db, 'chat/'+user.uid+'/messages'), orderBy('time', 'desc'));
                onSnapshot(messagesQuery, (snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === 'modified') {
                            console.log(change.type);
                            var message = change.doc.data();
                            messages.push(
                                {
                                    messageId: change.doc.id,
                                    time: message.time,
                                    id: message.id,
                                    text: message.text
                                }
                            )
                        }
                        //can add remove/edit message functionality too
                    });
                })
                console.log("Chat Screen Messages: ", messages);
            }
        })
    }, []);

    const matchedUsers = history.filter(function(func) {
        return func.matched == 1
    });

    return (
        <View style ={styles.container}>
            <Text style= {styles.title}>Messages</Text>

            <View>
                {matchedUsers.map((user) => {
                    //console.log('user: ', user);
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
                                        <Text style ={styles.name} numberOfLines={1}>{user.displayName}</Text>
                                        <Text style ={styles.text}>{user.timeMatched}</Text>
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