import React, { useState, useContext } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { auth, db } from '../../firebase/config';
import { updateDoc, doc } from 'firebase/firestore';
import styles from './EditProfileStyles'

export default function EditProfileScreen({navigation}) {
    const [displayName, setDisplayName] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [bio, setBio] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [location, setLocation] = useState('')

    const onSavePress = () => {
        auth.onAuthStateChanged(user => {
            if (user) { // user is signed in
                const docRef = doc(db, "users", user.uid);
                console.log('uid: ', user.uid);
                updateDoc(docRef, 
                    {displayName: displayName, bio: bio, age: age, gender: gender, location: location});
                }
            });
        navigation.navigate('UserProfile')
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ width: '100%' }}
                keyboardShouldPersistTaps='always'>
                <Text style={styles.title}> Update Your Profile </Text>
                <Image
                    style={styles.profilePic}
                    source={require('../../../assets/placeholder-logo.jpg')}
                />
                <Text style={[styles.inputTitle, styles.profileUpload]}>Upload Photo</Text>
                <Text style={styles.inputTitle}>Display Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setDisplayName(text)}
                    value={displayName}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <Text style={styles.inputTitle}>Bio</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setBio(text)}
                    value={bio}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <View style={{ flexDirection: 'row', width: 525 }}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={styles.inputTitle}>Age</Text>
                        <TextInput
                            style={[styles.input, { width: 150 }]}
                            keyboardType='numeric'
                            onChangeText={(text) => setAge(text)}
                            value={age}
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={styles.inputTitle}>Gender</Text>
                        <TextInput
                            style={[styles.input, { width: 150 }]}
                            onChangeText={(text) => setGender(text)}
                            value={gender}
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={styles.inputTitle}>Location</Text>
                        <TextInput
                            style={[styles.input, { width: 150 }]}
                            textContentType='addressState'
                            onChangeText={(text) => setLocation(text)}
                            value={location}
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSavePress()}>
                    <Text style={styles.buttonTitle}>Save Profile</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}