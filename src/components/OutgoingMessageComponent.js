import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const OutgoingMessageComponent = (text) => {
  return (
    <View>
         <View style = {styles.ownMessageContainer}>
            <Text style = {styles.text}>{text}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    messageContainer: {
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

export default OutgoingMessageComponent