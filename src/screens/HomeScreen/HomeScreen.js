import React, { useState, useEffect, useContext } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Linking } from 'react-native'
import { AuthContext } from '../../AuthContext/AuthContext'
import styles from './HomeStyles';
import SpotifyWebApi from 'spotify-web-api-js';

export default function HomeScreen(props) {
    const { logOut } = useContext(AuthContext);
    var [nowPlaying, setNowPlaying] = useState({})

    global.spotifyApi.setAccessToken(global.token)
    global.spotifyApi.getMe().then((user) => {
        //console.log(user)
    })
    const getNowPlaying = () => {
        // console.log("in here")
        try {
            global.spotifyApi.getMyCurrentPlaybackState().then((response) => {
                console.log(response)
                if (response.item !== null) {
                    setNowPlaying({
                        name: response.item.name,
                        albumArt: response.item.album.images[0].url,
                        artist: response.item.artists[0].name
                    })
                }
                else if (response.item === null){
                    console.log(response)
                }
            })
        } catch (error) {
            console.log(error)
        }
        return true
    }
    console.log("album info: ", nowPlaying.albumArt);
    // constantly poll web player for currently playing track, with timeout to avoid hitting API rate limit
    setTimeout(getNowPlaying, 3000)

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Sync Up! </Text>
            <Image
                style={ styles.logo }
                source={require('../../../assets/placeholder-logo.jpg')}
            />
            <Text style={styles.nowPlayingText}> Now Playing: </Text>
            <View style={styles.nowPlayingContainer}>
                <Image 
                    style={styles.nowPlayingImage}
                    source={nowPlaying.albumArt}
                    defaultSource={require('../../../assets/placeholder-logo.jpg')} >
                </Image>
                <Text style={styles.text}> 
                    {nowPlaying.name} 
                    <View style={styles.bulletpoint}/>
                    {nowPlaying.artist}
                </Text>
            </View>

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