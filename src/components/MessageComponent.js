import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const MessageComponent = () => {
  return (
    <View>
         <View style = {styles.ownMessageContainer}>
            <Text style = {styles.text}>Hello</Text>
        </View>

        <View style = {styles.messageContainer}>
            <Text style = {styles.text}>I just got home</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    messageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#373737',
        padding: 10,
        margin: 10,
        borderRadius: 100,
    },
    ownMessageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#FF9283',
        padding: 10,
        margin: 10,
        marginLeft: 'auto',
        borderRadius: 100,
    },
    text: {
        color: 'white',
        marginHorizontal: 5,
    }
});

export default MessageComponent