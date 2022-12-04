import React, { useState, useEffect, useContext } from 'react'
import styles from './ProfileStyles';
import SpotifyWebApi from 'spotify-web-api-js';
import { Dimensions, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { AuthContext } from '../../AuthContext/AuthContext';
import { auth, db } from '../../firebase/config';
import { getDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import { v4 } from 'uuid'

export default function ProfileScreen({navigation}) {
    
    var [topSongs, setTopSongs] = useState([{}])
    var [topArtists, setTopArtists] = useState([{}])
    var [savedAlbums, setSavedAlbums] = useState([{}])
    const { logOut } = useContext(AuthContext);

    // user data variables
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [location, setLocation] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const onLogoutPress = () => {
        logOut();  
    }
    const onEditPress = () => {
        navigation.navigate('EditProfile', {displayName, bio, age, gender, location})
    }
    const onSpotifyPress = () => {
        navigation.navigate('Connect With Spotify');
    }

    useEffect(() => {
        
        auth.onAuthStateChanged(async user => {
            if (user) { // user is signed in
                const docRef = doc(db, "users", user.uid);
                getDoc(docRef)
                .then(async (userDoc) => {
                    // retrieve and set userdata here
                    setDisplayName(userDoc.data().displayName);
                    setBio(userDoc.data().bio);
                    setAge(userDoc.data().age);
                    setGender(userDoc.data().gender);
                    setLocation(userDoc.data().location);
                })
                .catch((error) => {
                    console.log('Error retrieving user information: ', error)
                });

                // update user with top songs field
                const topSongsList = []
                const topArtistsList = []
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
                                console.log("added songs")
                                console.log(topSongsList.length)
                            })
                            setTopSongs(topSongsList)
                            setDoc(docRef, {topSongs: topSongsList}, {merge: true})
                        }
                        else if (response.item === null){
                            //getNowPlaying()
                        }
                    })
                }

                // update user with top artist field
                if (topArtistsList.length === 0) {
                    global.spotifyApi.getMyTopArtists({limit: 3}).then((response) => {
                        console.log(response.items)
                        if (response.items !== null) {
                            response.items.forEach((artist) => {
                                console.log(artist)
                                topArtistsList.push(
                                    {
                                        name: artist.name
                                    }
                                )
                                console.log("added artists")
                                console.log(topArtistsList.length)
                            })
                            setTopArtists(topArtistsList)
                            setDoc(docRef, {topArtists: topArtistsList}, {merge: true})
                        }
                        else if (response.item === null){
                            // getNowPlaying()
                        }
                    })
                }
                
                // retrieve and set user's profile pic from their spotify
                global.spotifyApi.getMe().then((user) => {
                    var pic = user.images[0].url
                    setProfilePic(pic)
                    setDoc(docRef, {profilePic: pic}, {merge: true})
                })

                // retrieve random three album arts from user saved albums
                global.spotifyApi.getMySavedAlbums({limit: 3}).then((response) => {
                    const albums = []
                    if (response.items !== null) {
                        response.items.forEach((album) => {
                            albums.push(
                                {
                                    name: album.album.name,
                                    artist: album.album.artists[0].name,
                                    albumArt: album.album.images[0].url
                                }
                            )
                            console.log("albums")
                            console.log(albums.length)
                        })
                        setSavedAlbums(albums)
                        updateDoc(docRef, {topAlbums: albums});
                    }
                    else if (response.item === null){
                        // getNowPlaying()
                    }
                })
            }
        })
    }, []);

    // name and bio
    const headerInfo = (
        <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "400", fontSize: 36, maxWidth: '35%' }]} numberOfLines={1}>
                {displayName}
            </Text>
            <Text style={[styles.text, { opacity: '60%', marginTop: 5, maxWidth: '35%' }]} numberOfLines={2}>
                {bio}
            </Text>

        </View>
    )

    // user stats: age, gender, location
    const metaInfo = (
        <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 20 }]} numberOfLines={1}>{age}</Text>
                <Text style={[styles.text, { fontSize: 12, fontWeight: '100', opacity: '60%' }]}>Age</Text>
            </View>
            <View style={styles.bulletpoint}/>
            <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 20 }]} numberOfLines={1}>{gender}</Text>
                <Text style={[styles.text, { fontSize: 12, fontWeight: '100', opacity: '60%' }]}>Gender</Text>
            </View>
            <View style={styles.bulletpoint}/>
            <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 20 }]} numberOfLines={1}>{location}</Text>
                <Text style={[styles.text, { fontSize: 12, fontWeight: '100', opacity: '60%' }]}>Location</Text>
            </View>
        </View>
    )

    // edit profile & log out buttons
    const buttons = (
        <View style={{ alignSelf: 'flex-start', flexDirection: 'row' }}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => onEditPress()}>
                <Text style={styles.buttonTitle}> Edit Profile </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onLogoutPress()}>
                <Text style={styles.buttonTitle}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onSpotifyPress()}>
                <Text style={styles.buttonTitle}>Connect to Spotify</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={[styles.container, { width: Dimensions.get('window').width }]}>
            <View style={{ alignSelf: "center" }}>
                <Text style={styles.title}>Profile</Text>
            </View>

            <View style={styles.headerContainer}>
                <Image 
                    source={profilePic}
                    defaultSource={require('../../../assets/placeholder-profile.png')}
                    style={styles.profileImage}
                    resizeMode="contain" />
                <View style={{ marginLeft: 30 }}>
                    {[headerInfo, metaInfo, buttons]}
                </View>
            </View>

            <View style={styles.albumsContainer}>
                {savedAlbums.map((album, index) => {
                    return (
                        <View style={styles.albumBackground}>
                            <Image 
                                source={album.albumArt}
                                defaultSource={require('../../../assets/placeholder-album.png')}
                                style={styles.albumImage} />
                                
                            <Text style={[styles.albumInfo, { fontWeight: 'bold' }]} numberOfLines={1}> {album.name} </Text>
                            <Text style={[styles.albumInfo, { opacity: '60%' }]} numberOfLines={1}> {album.artist} </Text>
                        </View>
                    )
                })}
                
            </View>
            
            <View style={styles.topSContainer}>
                <View style={styles.topSBackground}>
                    <Text style={[styles.text, { alignSelf: 'flex-start', fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginStart: 10 }]}>
                        Current Top Songs
                    </Text>
                    <View>
                        {topSongs.map((song, index) => {
                            return (
                                <View key={index}>
                                    <Text style={[styles.topSData, styles.text]} numberOfLines={1}>
                                        <View style={[styles.bulletpoint, { marginBottom: 3, marginLeft: -5, marginRight: 10 }]} />
                                        {song.name} - {song.artist}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={styles.topSBackground}>
                    <Text style={[styles.text, { alignSelf: 'flex-start', fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginStart: 10 }]}>
                        Current Top Artists
                    </Text>
                    <View>
                        {topArtists.map((artist, index) => {
                            return (
                                <View key={index + 4}>
                                    <Text style={[styles.topSData, styles.text]} numberOfLines={1}>
                                        <View style={[styles.bulletpoint, { marginBottom: 3, marginLeft: -5, marginRight: 10 }]} />
                                        {artist.name}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                </View>                
            </View>
    </SafeAreaView> 
    )
}