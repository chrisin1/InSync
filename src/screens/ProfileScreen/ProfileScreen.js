import React, { useState, useEffect, useContext } from 'react'
import styles from './ProfileStyles';
import SpotifyWebApi from 'spotify-web-api-js';
import { Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { AuthContext } from '../../AuthContext/AuthContext';
import { auth, db } from '../../firebase/config';
import { getDoc, doc } from 'firebase/firestore';

export default function ProfileScreen({navigation}) {
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

    const onEditPress = () => {
        navigation.navigate('EditProfile')
    }

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

    // name and bio
    const headerInfo = (
        <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "400", fontSize: 36 }]}>
                {displayName}
            </Text>
            <Text>{'\n'}</Text>
            <Text style={[styles.text, { opacity: '60%', marginTop: -10 }]}>
                {bio}
            </Text>

        </View>
    )

    // user stats: age, gender, location
    const metaInfo = (
        <View style={styles.statsContainer}>
            <View style={[styles.statsBox, { paddingLeft: 0 }]}>
                <Text style={[styles.text, { fontSize: 20, fontWeight: '200' }]}>{age}</Text>
            </View>
            <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                <Text style={[styles.text, { fontSize: 20, fontWeight: '200' }]}>{gender}</Text>
            </View>
            <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 20, fontWeight: '200' }]}>{location}</Text>
            </View>
        </View>
    )

    // edit profile & log out buttons
    const buttons = (
        <View style={{ alignSelf: 'flex-start', flexDirection: 'row' }}>
            <TouchableOpacity 
                style={[styles.button, {flex: 1, marginRight: 20 }]} 
                onPress={() => onEditPress()}>
                <Text style={styles.buttonTitle}> Edit Profile </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, {flex: 1, marginRight: 20 }]}
                onPress={() => onLogoutPress()}>
                <Text style={styles.buttonTitle}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{ alignSelf: "center" }}>
                <Text style={styles.title}>Profile</Text>
            </View>

            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/georgehead.jpg')} style={styles.profileImage} resizeMode="center"></Image>
                <View style={{ marginLeft: 50 }}>
                    {[headerInfo, metaInfo, buttons]}
                </View>
            </View>

            <View style={styles.imageContainer}>
                <View style={styles.imageBackground}>
                    <Image 
                        source={require('../../../assets/georgehead.jpg')}
                        style={styles.image} />
                </View>
                <View style={styles.imageBackground}>
                    <Image 
                        source={require('../../../assets/topgeorge.jpg')}
                        style={styles.image} />
                </View>
                <View style={styles.imageBackground}>
                    <Image 
                        source={require('../../../assets/georgehead.jpg')}
                        style={styles.image} />
                </View>
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
                                    <Text style={[styles.topSData, styles.text]}>
                                        <View style={styles.bulletpoint} />
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
                                <View key={index}>
                                    <Text style={[styles.topSData, styles.text]}>
                                        <View style={styles.bulletpoint} />
                                        {artist.name}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                </View>                
            </View>
            
        </ScrollView>
    </SafeAreaView> 
    )
}