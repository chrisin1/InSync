import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class ProfileCard extends React.Component {
    render() {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.nameText}> Jane Doe </Text>
                <Image style={styles.imageContainer}
                    source={require('../../../assets/insync-logo.png')} />
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
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        alignSelf: 'center',
        backgroundColor: '#373737',
        borderRadius: 20,
        flex: 1,
    },
    imageContainer: {
        alignSelf: 'center',
        borderRadius: 20,
        height: 350,
        margin: 20,
        marginBottom: 10,
        width: 350,
    },
    title: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
        margin: 50,
    },
    nameText: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        margin: 20,
        marginBottom: 0,
    },
    compText: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginStart: 20,
    },
    detailsText: {
        alignSelf: 'flex-start',
        color: '#929292',
        fontSize: 14,
        fontWeight: 'normal',
        marginStart: 20,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#222222',
        borderRadius: 100,
        height: 100,
        justifyContent: 'center',
        margin: 30,
        width: 100,
    },
    buttonIcon: {
        color: '#ff9283',
        height: 50,
        width: 50,
    },
    buttonContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
})