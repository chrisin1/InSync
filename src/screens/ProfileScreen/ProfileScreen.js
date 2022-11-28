import React, { useState, useEffect, useContext } from 'react'
import styles from './ProfileStyles';
import SpotifyWebApi from 'spotify-web-api-js';
import { Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { AuthContext } from '../../AuthContext/AuthContext';
import { auth, db } from '../../firebase/config';
import { getDoc, doc } from 'firebase/firestore';

export default function ProfileScreen() {
    // spotifyApi.getMe().then((user) => {
    //     console.log()
    // })
    var [topSongs, setTopSongs] = useState([{}])
    var [topArtists, setTopArtists] = useState([{}])
    useEffect(() => {
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
                }
                else if (response.item === null){
                    // getNowPlaying()
                }
            })
        }
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
                }
                else if (response.item === null){
                    // getNowPlaying()
                }
            })
        }

    }, [])
    
    const { logOut } = useContext(AuthContext);

    // user data variables
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [location, setLocation] = useState('')

    const onLogoutPress = () => {
        logOut();  
    }

    /* let editable = false;
    let buttonTitle = 'Edit';
    const onEditPress = () => {
        if (this.state.editable) {
            // get values and save here?
            this.setState({buttonTitle: 'Edit', editable: false});
        }
        else {
            this.setState({buttonTitle: 'Save', editable: true});
        }
    } */

    useEffect(() => {
        auth.onAuthStateChanged(user => {
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
                    console.log('Error retrieving user information: ', error);
                });
            }
        })
    }, []);

    // updateDoc(userDoc, {value: newvalue});

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <TouchableOpacity style={{marginTop: 25}} onPress={() => onEditPress()}>
                    <Text style={styles.link}> Edit </Text>
                </TouchableOpacity>
            </View>

            <View style={{ alignSelf: "center" }}>
                <View style={styles.profileImage}>
                    <Image source={require('../../../assets/georgehead.jpg')} style={styles.image} resizeMode="center"></Image>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
                    {displayName}
                </Text>
                <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
                    {bio}
                </Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>{age}</Text>
                    <Text style={[styles.text, styles.subText]}>Age</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 24 }]}>{location}</Text>
                    <Text style={[styles.text, styles.subText]}>Location</Text>
                </View>
                <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{gender}</Text>
                        <Text style={[styles.text, styles.subText]}>Gender</Text>
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
                                        {song.name} <Text style={{ fontWeight: "400" }}>{song.artist}</Text>
                                    </Text>
                                </View>
                        </View>
                })}
                
            </View>
            <Text style={[styles.subText, styles.songs]}>Favorite Artists</Text>
            <View style={{ alignItems: "center" }}>
                {topArtists.map((artist, index) => {
                    return <View key={index} style={styles.songItem}>
                                <View style={styles.songIndicator}></View>
                                <View style={{ width: 250 }}>
                                    <Text style={[styles.text, { fontWeight: "300" }]}>
                                        <Text style={{ fontWeight: "400" }}>{artist.name} </Text>
                                    </Text>
                                </View>
                            </View>
                })}
                
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.buttonTitle}>Log out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView> 
    )
}