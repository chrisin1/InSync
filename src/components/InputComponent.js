import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'

const InputComponent = () => {
    const[message, setMessage] = useState('');
  return (
    <View style = {styles.container}>
        <View style = {styles.inputContainer}>
            <TextInput 
            value= {message}
            onChangeText={setMessage}
            placeholder='Type Message'>

            </TextInput>
        </View>

        <View style = {styles.button}>
            <Text style = {styles.buttonText}> + </Text>

        </View>


        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10
    },

    button: {
        width: 50,
        height: 50,
        backgroundColor: '#FF9283',
        borderRadius: 20,
        marginBottom: 36,
        justifyContent: 'center',
        alignItems: 'center' 
    },

    buttonText: {
        color: 'white'
    },

    inputContainer: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        marginBottom: 36,
        marginRight: 10,
       
        
    }
})
export default InputComponent