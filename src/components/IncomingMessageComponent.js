import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const IncomingMessageComponent = (text) => {
  return (
    <View>
        <View style = {styles.messageContainer}>
            <Text style = {styles.text}>{text}</Text>
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
    text: {
        color: 'white',
        marginHorizontal: 5,
    }
});

export default IncomingMessageComponent