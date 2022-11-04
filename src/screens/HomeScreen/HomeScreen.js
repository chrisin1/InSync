import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './HomeStyles.js'

export default function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Sync Up! </Text>
            <View style={styles.cardContainer}>
                <Text style={styles.nameText}> Jane Doe </Text>
                <Image style={styles.imageContainer}
                    source={require('../../../assets/placeholder-logo.jpg')} />
                <Text style={styles.compText}> 95% Compatible </Text>
                <Text style={styles.detailsText}> Compatibility Details **REPLACE LATER** </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => alert('PRESSED LEFT')}>
                        <Image style={styles.buttonIcon}
                            source={require('../../../assets/favicon.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => alert('PRESSED RIGHT')}>
                        <Image style={styles.buttonIcon}
                            source={require('../../../assets/favicon.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}