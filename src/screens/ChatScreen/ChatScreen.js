import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './ChatStyles';


export default function ChatScreen(props) {
    return (
        <View style ={styles.container}>
            <Text style= {styles.title}>Messages</Text>

            <View style ={styles.chatContainer}>
                <Image source={require('../../../assets/placeholder-logo.jpg')} style = {styles.image}/>
                <View style ={styles.rightContainer} >
                    <View style ={styles.row}>
                        <Text style ={styles.name}>Chris In</Text>
                        <Text style ={styles.text}>3 min</Text>
                    </View>
                    <Text style ={styles.text} numberOfLines ={1}>I just got home</Text>
                </View>
            </View>

            <View style ={styles.chatContainer}>
                <Image source={require('../../../assets/placeholder-logo.jpg')} style = {styles.image}/>
                <View style ={styles.rightContainer} >
                    <View style ={styles.row}>
                        <Text style ={styles.name}>Nancy Chen</Text>
                        <Text style ={styles.text}>10 min</Text>
                    </View>
                    <Text style ={styles.text} numberOfLines ={1}>The login screen and the sign up screen click the button to the log in link screen button</Text>
                </View>
            </View>

            <View style ={styles.chatContainer}>
                <Image source={require('../../../assets/placeholder-logo.jpg')} style = {styles.image}/>
                <View style ={styles.rightContainer} >
                    <View style ={styles.row}>
                        <Text style ={styles.name}>Nicole Liang</Text>
                        <Text style ={styles.text}>1 hr</Text>
                    </View>
                    <Text style ={styles.text} numberOfLines ={1}>hehe</Text>
                </View>
            </View>

        </View>
    )
}