import React, { useState, useEffect, useContext } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Linking } from 'react-native'
import { AuthContext } from '../../AuthContext/AuthContext'
import { auth, db } from '../../firebase/config';
import styles from './HomeStyles';
import SpotifyWebApi from 'spotify-web-api-js';
import { enableIndexedDbPersistence } from 'firebase/firestore';
import { doc, arrayUnion, query, where, collection, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen({navigation}) {
    var [nowPlaying, setNowPlaying] = useState({})
    var [compatibilityRanking, setCompatibilityRanking] = useState([{}])
    var [userDocRef, setUserDocRef] = useState(null);
    global.spotifyApi.setAccessToken(global.token)
    global.spotifyApi.getMe().then((user) => {
        //console.log(user)
    })

    const onMatchPress = (id, displayName, profilePic) => {
        // Add to history on database
        var current = new Date();
        timeMatched = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        updateDoc(userDocRef, {
            history: arrayUnion({
                id: id,
                displayName: displayName,
                profilePic: profilePic,
                timeMatched: timeMatched,
                matched: 1
            })
        });
        setCompatibilityRanking(compatibilityRanking.filter(person => person.id != id));
    }

    const onNoMatchPress = (id) => {
        // Add to history on database
        updateDoc(userDocRef, {
            history: arrayUnion({
                id: id,
                matched: 0
            })
        });
        setCompatibilityRanking(compatibilityRanking.filter(person => person.id != id));
    }

    useEffect(() => {
        
        auth.onAuthStateChanged(user => {
            if (user) { // user is signed in
                const docRef = doc(db, "users", user.uid);
                setUserDocRef(docRef);

                // update user's audio feature ratings
                const userAudioFeatures = {
                    acousticness: 0.0,
                    danceability: 0.0,
                    energy: 0.0,
                    instrumentalness: 0.0,
                    valence: 0.0,
                };
                global.spotifyApi.getMyTopTracks({limit: 10}).then((response) => {
                    if (response.items !== null) { 
                        //Add up the relevant audio features for top songs
                        let songCount = 0;
                        for (const song of response.items) {
                            global.spotifyApi.getAudioFeaturesForTrack(song.id).then((features) => {
                                //console.log(features);
                                userAudioFeatures["acousticness"] += features.acousticness;
                                userAudioFeatures["danceability"] += features.danceability;
                                userAudioFeatures["energy"] += features.energy;
                                userAudioFeatures["instrumentalness"] += features.instrumentalness;
                                userAudioFeatures["valence"] += features.valence;
                                songCount++;
                                //If all songs are added in the calculations
                                if(songCount == response.items.length)
                                    averageValue(); //go to callback to calculate averages of audio features
                            })
                        }

                        function averageValue() { //callback of next part to calculate average
                            let count = 0;
                            Object.keys(userAudioFeatures).forEach((key) => {
                                userAudioFeatures[key] = userAudioFeatures[key]/response.items.length;
                                count++;
                                if(count == Object.keys(userAudioFeatures).length)
                                {
                                    console.log("Amount of top songs: " + response.items.length);
                                    console.log(userAudioFeatures);
                                    updateDoc(docRef, {
                                        audioFeatures: userAudioFeatures
                                    })
                                    getMatchHistory();
                                }
                            })
                        }
                    }
                    else if (response.item === null){
                        console.log("Failed to get top tracks");
                    }
                }).catch((error)=> {
                    console.log("Not connected to spotify")
                    navigation.navigate('Connect With Spotify');
                })

                let matchHistory = [];
                //get user's match history
                function getMatchHistory(){
                    getDoc(docRef).then((userDoc) => {
                        matchHistory = userDoc.data().history;
                        console.log(matchHistory);
                        updateCompatibility();
                    }).catch((error)=> {
                        console.log("Get matchHistory error: " + error);
                    })
                }
                
                //update compatibility with other users
                function updateCompatibility(){
                    const compatibilityList = []
                    const q = query(collection(db, "users"), where("audioFeatures", "!=", null));
                    getDocs(q).then((response) => {
                        var count = 0;
                        response.forEach((doc) => {
                            //can add check here for checking if within rejected list
                            if(!matchHistory.some(match => match.id == doc.data().id))
                            {
                                let compatibility = Math.abs(userAudioFeatures["acousticness"]-doc.data().audioFeatures.acousticness);
                                compatibility += Math.abs(userAudioFeatures["danceability"]-doc.data().audioFeatures.danceability);
                                compatibility += Math.abs(userAudioFeatures["energy"]-doc.data().audioFeatures.energy);
                                compatibility += Math.abs(userAudioFeatures["instrumentalness"]-doc.data().audioFeatures.instrumentalness);
                                compatibility += Math.abs(userAudioFeatures["valence"]-doc.data().audioFeatures.valence);
                                //Final calculations to make percent: 100% - (#/5 * 100);
                                compatibility = 100 - 20 * compatibility;
                                console.log(doc.data())
                                compatibilityList.push(
                                {
                                    id: doc.id,
                                    displayName: doc.data().displayName,
                                    profilePic: doc.data().profilePic,
                                    topArtists: doc.data().topArtists,
                                    topSongs: doc.data().topSongs,
                                    topAlbums: doc.data().topAlbums,
                                    compatibility: Math.round(compatibility * 10) / 10
                                })
                            }
                            
                            count++;
                            //when done
                            if(count == response.size)
                            {
                                compatibilityList.sort((a, b) => b.compatibility - a.compatibility);
                                setCompatibilityRanking(compatibilityList);
                                console.log(compatibilityList);
                            }
                        });
                    }).catch((error)=> {
                        console.log(error)
                    })
                }
            }
        })
    }, []);

    const getNowPlaying = () => {
        try {
            console.log(compatibilityRanking);
            global.spotifyApi.getMyCurrentPlaybackState().then((response) => {
                console.log(response)
                if (response.item != null) {
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
    const createCards = (user, index) => {
        console.log(user.displayName);
        return (
            <View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                        <Image 
                            style={styles.profileImage} 
                            source={user.profilePic}
                            defaultSource={require('../../../assets/placeholder-profile.png')} />
                        <Text style={styles.nameText} numberOfLines={1}> {user.displayName} </Text>
                    </View>
                    <View style={styles.albumsContainer}>
                        {user.topAlbums?.map((album) => {
                            return (
                                <View style={styles.albumContainer}>
                                    <Image 
                                        style={styles.albumImage}
                                        defaultSource={require('../../../assets/placeholder-album.png')}
                                        source={album.albumArt}
                                    />
                                    <Text style={[styles.albumInfo, { fontWeight: 'bold' }]} numberOfLines={1}> {album.name} </Text>
                                    <Text style={[styles.albumInfo, { opacity: '60%' }]} numberOfLines={1}> {album.artist} </Text>
                                </View>
                            )           
                        })}
        
                    </View>

                    <View style={styles.topSContainer}>
                        <View style={styles.topSBackground}>
                            <Text style={[styles.topSData, { fontWeight: 'bold' }]} numberOfLines={1}> Current Top Songs </Text>
                            {user.topSongs?.map((song) => {
                                return (
                                    <Text style={[styles.topSData, { fontWeight: '300' }]} numberOfLines={1}>
                                        <View style={styles.bulletpoint} />
                                        {song.name} - {song.artist}
                                    </Text> 
                                )           
                            })}
                        </View>
                        
                        <View style={styles.topSBackground}>
                            <Text style={[styles.topSData, { fontWeight: 'bold' }]} numberOfLines={1}> Current Top Artists </Text>
                            {user.topArtists?.map((artist) => {
                                return (
                                    <Text style={[styles.topSData, { fontWeight: '300' }]} numberOfLines={1}>
                                        <View style={styles.bulletpoint} />
                                        {artist.name}
                                    </Text> 
                                )           
                            })}
                        </View>
                    </View>

                    <Text style={styles.compText}> {user.compatibility}% Compatible! </Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => onNoMatchPress(user.id)}>
                            <Image style={styles.buttonIcon}
                                source={require('../../../assets/button-no-match.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onMatchPress(user.id, user.displayName, user.profilePic)}>
                            <Image style={styles.buttonIcon}
                                source={require('../../../assets/button-match.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>                
        )
    }
    // constantly poll web player for currently playing track, with timeout to avoid hitting API rate limit
    setTimeout(getNowPlaying, 3000)

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Image style={styles.logo} source={require('../../../assets/insync-logo.png')} />
                <Text style={styles.title}> Sync Up! </Text>
            </View>
            
            <Text style={styles.nowPlayingText}> Now Playing: </Text>
            <View style={styles.nowPlayingContainer}>
                <Image 
                    style={styles.nowPlayingImage}
                    source={nowPlaying.albumArt}
                    defaultSource={require('../../../assets/placeholder-album.png')}
                    resizeMode='contain' >
                </Image>
                <Text style={styles.text}> 
                    {nowPlaying.name} 
                    <View style={styles.bulletpoint}/>
                    {nowPlaying.artist}
                </Text>
            </View>
            
            <ScrollView style={{ width: '90%' }} showsVerticalScrollIndicator={false}>
                {compatibilityRanking?.map(createCards)}
            </ScrollView>
        </View>
    )
}