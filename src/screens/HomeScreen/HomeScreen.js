import React, { useState, useEffect, useContext } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Linking } from 'react-native'
import { AuthContext } from '../../AuthContext/AuthContext'
import styles from './HomeStyles';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi()

export default function HomeScreen(props) {
    const { logOut } = useContext(AuthContext);
    var [nowPlaying, setNowPlaying] = useState({})

    const onLogoutPress = () => {
        logOut();  
    }
    spotifyApi.setAccessToken(global.token)
    spotifyApi.getMe().then((user) => {
        //console.log(user)
    })
    const getNowPlaying = () => {
        console.log("in here")
        try {
            spotifyApi.getMyCurrentPlaybackState().then((response) => {
                console.log(response)
                if (response.item !== null) {
                    setNowPlaying({
                        name: response.item.name,
                        albumArt: response.item.album.images[0].url,
                        artist: response.item.artists[0].name
                    })
                    console.log(nowPlaying.artist)
                }
                else if (response.item === null){
                    getNowPlaying()
                }
            })
        } catch (error) {
            console.log(error)
        }
        return true
    }
    getNowPlaying()
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Sync Up! </Text>
            <Image
                style={ styles.logo }
                source={require('../../../assets/placeholder-logo.jpg')}
            />
            <Text style={styles.title}> Now Playing: {nowPlaying.name} by {nowPlaying.artist}</Text>
            <Image
                style={ styles.logo }
                source={nowPlaying.albumArt}
            />

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