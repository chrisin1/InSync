import React, { useState, useContext } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useRoute } from '@react-navigation/native'
import { AuthContext } from '../../AuthContext/AuthContext'
import styles from './SetupStyles'

export default function SetupScreen({navigation}) {
    const [displayName, setDisplayName] = useState('')
    const [bio, setBio] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [location, setLocation] = useState('')

    const { signUp } = useContext(AuthContext);
    const route = useRoute()

    const onSetupPress = () => {
        // TODO: allow profile pic upload
        const fullName = route.params.fullName
        const email = route.params.email
        const password = route.params.password
        signUp({ fullName, email, password, displayName, bio, age, gender, location });
        navigation.navigate('Connect With Spotify');
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ width: '100%' }}
                keyboardShouldPersistTaps='always'>
                <Text style={styles.title}> Set Up Your Profile! </Text>

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
                    onPress={() => onSetupPress()}>
                    <Text style={styles.buttonTitle}>Save Profile</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}