import React, { useContext, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import styles from './ProfileStyles';
import { AuthContext } from '../../AuthContext/AuthContext';
import { auth, db } from '../../firebase/config';
import { getDoc, doc } from 'firebase/firestore';

export default function ProfileScreen({navigation}) {
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

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignSelf: "center", marginTop: 35 }}>
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
                <View style={styles.songItem}>
                    <View style={styles.songIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { fontWeight: "300" }]}>
                            Mountain Dew - <Text style={{ fontWeight: "400" }}>Grandpa Jones</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.songItem}>
                    <View style={styles.songIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { fontWeight: "300" }]}>
                            Joy To The World - <Text style={{ fontWeight: "400" }}>Three Dog Night</Text>
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                <TouchableOpacity 
                    style={[styles.button, {flex: 1}]} 
                    onPress={() => onEditPress()}>
                    <Text style={styles.buttonTitle}> Edit Profile </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, {flex: 1}]}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.buttonTitle}>Log out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView> 
    )
}