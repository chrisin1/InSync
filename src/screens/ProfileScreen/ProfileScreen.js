import React, { useContext } from 'react'
import { Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from './ProfileStyles';
import { AuthContext } from '../../AuthContext/AuthContext';

export default function ProfileScreen() {
    const { logOut } = useContext(AuthContext);

    const onLogoutPress = () => {
        logOut();  
    }

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
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.link}>Log out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView> 
    )
}