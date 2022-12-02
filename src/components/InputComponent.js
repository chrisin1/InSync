import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';

const InputComponent = () => {
    const[message, setMessage] = useState('');
    
  return (
    <View style = {styles.container}>
        <View style = {styles.inputContainer}>
            <TextInput
                style={{ marginVertical: 0, paddingVertical: 0, outline: 'none' }}
                value= {message}
                onChangeText={setMessage}
                placeholder='Type Message'>
            </TextInput>
        </View>

        <Ionicons name="chevron-forward-circle" color='#FF9382' size={52} flex={1}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    inputContainer: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 100,
        justifyContent: 'center',
        marginRight: 10,
        paddingHorizontal: 15,
    }
})

export default InputComponent