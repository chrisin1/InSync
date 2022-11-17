import React, { useState, useEffect, useContext } from 'react'
import { Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import styles from './ProfileStyles';
import SpotifyWebApi from 'spotify-web-api-js';

export default function ProfileScreen() {
    // spotifyApi.getMe().then((user) => {
    //     console.log()
    // })
    var [topSongs, setTopSongs] = useState([{}])
    useEffect(() => {
        const topSongsList = []
        if (topSongsList.length === 0) {
            global.spotifyApi.getMyTopTracks({limit: 3}).then((response) => {
                console.log(response.items)
                if (response.items !== null) {
                    response.items.forEach((song) => {
                        console.log(song)
                        topSongsList.push(
                            {
                                name: song.name,
                                artist: song.artists[0].name
                            }
                        )
                        console.log("added")
                        console.log(topSongsList.length)
                    })
                    setTopSongs(topSongsList)
                }
                else if (response.item === null){
                    // getNowPlaying()
                }
            })
        }
        // setTopSongs(["hello", "hi"])
        // console.log(topSongs)
    }, [])
    
    

    // let topSongsList = []
    //     if (topSongsList.length === 0) {
    //         global.spotifyApi.getMyTopTracks({limit: 3}).then((response) => {
    //             console.log(response.items)
    //             if (response.items !== null) {
    //                 response.items.forEach((song) => {
    //                     topSongsList.push(
    //                         <View style={styles.songItem}>
    //                             <View style={styles.songIndicator}></View>
    //                             <View style={{ width: 250 }}>
    //                                 <Text style={[styles.text, { fontWeight: "300" }]}>
    //                                     song.name - <Text style={{ fontWeight: "400" }}>song.artists[0].name</Text>
    //                                 </Text>
    //                             </View>
    //                         </View>
    //                     )
    //                     console.log("added")
        
    //                 })
    //             }
    //             else if (response.item === null){
    //                 // getNowPlaying()
    //             }
    //         })
    //     }
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleBar}>
                <Text style={styles.link}>
                    Edit
                </Text>
            </View>

            <View style={{ alignSelf: "center" }}>
                <View style={styles.profileImage}>
                    <Image source={require('../../../assets/georgehead.jpg')} style={styles.image} resizeMode="center"></Image>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>George</Text>
                <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>I'm on that grind and we don't stop. Passionate about flowers and wildlife. #DryWallRepresent</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>43</Text>
                    <Text style={[styles.text, styles.subText]}>Age</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 24 }]}>USA</Text>
                    <Text style={[styles.text, styles.subText]}>Location</Text>
                </View>
                <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>Male</Text>
                        <Text style={[styles.text, styles.subText]}>Sex</Text>
                    </View>
            </View>

            <View style={{ marginTop: 32 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../../assets/georgehead.jpg')} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../../assets/topgeorge.jpg')} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../../assets/georgehead.jpg')} style={styles.image} resizeMode="cover"></Image>
                    </View>
                </ScrollView>
                <View style={styles.imageLabel}>
                    <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Pictures</Text>
                </View>
            </View>
            <Text style={[styles.subText, styles.songs]}>Favorite Songs</Text>
            <View style={{ alignItems: "center" }}>
                {topSongs.map((song, index) => {
                    return <View key={index} style={styles.songItem}>
                                <View style={styles.songIndicator}></View>
                                <View style={{ width: 250 }}>
                                    <Text style={[styles.text, { fontWeight: "300" }]}>
                                        {song.name} - <Text style={{ fontWeight: "400" }}>{song.artist}</Text>
                                    </Text>
                                </View>
                            </View>
                })}
                
            </View>
        </ScrollView>
    </SafeAreaView> 
    )
}