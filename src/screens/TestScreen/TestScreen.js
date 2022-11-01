import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {Client, TrackHandler, PlaylistHandler, UserHandler} from 'spotify-sdk';
export default function TestScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {
    }

    let client = Client.instance;

    client.settings = {
        clientId: '13a5188c88b446d08545ab1bb0ad384e',
        secretId: '5097320a348240759f145d98f032fb8c',
        scopes: ['user-follow-modify user-follow-read user-library-read user-top-read'],
        redirect_uri: 'http://localhost:19006/'
    };
    
    function session() {
        if (sessionStorage.token) {
            client.token = sessionStorage.token;
        } else if (window.location.hash.split('&')[0].split('=')[1]) {
            sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
            client.token = sessionStorage.token;
        }
    }
    session();
    client.login()
    let track = new TrackHandler();

    track.audioFeatures(['2UzMpPKPhbcC8RbsmuURAZ']).then(response => {
    console.log(response);
    });
    // var user = new UserHandler();

    // /*
    // * #1 example
    // * Get the current user.
    // */
    // user.me().then((userEntity) => {
    //     console.log(userEntity);
    // });

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Test button</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}