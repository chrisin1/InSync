import 'react-native-gesture-handler';
import React, { useEffect, useState, useMemo } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { SetupScreen, SpotifyConnectScreen, LoginScreen, HomeScreen, RegistrationScreen, ChatScreen, ChatRoomScreen, ProfileScreen, EditProfileScreen } from './src/screens'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import { collection, setDoc, getDoc, doc } from "firebase/firestore"; 
import { auth, db } from './src/firebase/config'
import { AuthContext } from './src/AuthContext/AuthContext'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
import SpotifyWebApi from 'spotify-web-api-js';

global.spotifyApi = new SpotifyWebApi()
const getTokenFromURL = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            let parts = item.split("=")
            initial[parts[0]] = decodeURIComponent(parts[1])
            return initial
        }, {})
}

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#222222'
  },
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [spotifyToken, setSpotifyToken] = useState("")

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef)
        .then((userDoc) => {
          setLoading(false)
          setUser(userDoc.id)
        })
        .catch((error) => {
          setLoading(false)
        });
      } else {
        setLoading(false)
      }
    });

      console.log("Our URL: ", getTokenFromURL())
      const token = getTokenFromURL().access_token
      console.log("Our Spotify Access Token: ", token)
      console.log("Global token ", global.token)
      if (!global.token){
        console.log("in here")
        global.token = token
        console.log("global set to ", global.token)
      }
      console.log(global.token)
      window.location.hash = ""
  }, []);

  const authContext = useMemo( () => ({
    logIn: async data => {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            const uid = userCredential.user.uid
            const docRef = doc(db, "users", uid);
            getDoc(docRef)
            .then((userDoc) => {
              if (!userDoc.exists()) {
                alert("User does not exist anymore.")
                return;
              }
              console.log("User data:", userDoc.data());
              const uid = userDoc.id;
              setUser(uid)
            })
            .catch((error)=> {
              alert(error)
            })
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        });
    },
    logOut: () => {
      signOut(auth).then(() => {
        // Sign-out successful.
        setUser(null)
      }).catch((error) => {
        alert(error)
      });
    },
    signUp: async data => {
      createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in 
        try {
            const uid = userCredential.user.uid;
            const docRef = setDoc(doc(db, "users", uid), {
              id: uid,
              email: data.email,
              fullName: data.fullName,
              displayName: data.displayName,
              bio: data.bio,
              age: data.age,
              gender: data.gender,
              location: data.location,
              history: [{
                id: uid,
                matched: 0
              }]
            }).then(() => {
              setUser(uid) //They make this userData for some reason with all the info, check if this is necessary
            })
            .catch((error) => {
              alert(error)
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
          console.log(error.code);
          alert(error.message);
      });
    },
  }),
  []  
  );

  if (loading) {
    return (
      <></>
    )
  }

  const ProfileStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="UserProfile" component={ProfileScreen} options={{ headerShown: false, unmountOnBlur: true }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }
  const BottomTab = () => {
    return (
      <Tab.Navigator
            screenOptions={{
              tabBarStyle: { backgroundColor: '#373737', borderBottomWidth: 0, borderTopWidth: 0, marginBottom: 1.5 },
              tabBarActiveTintColor: '#FF9283',
              title: ''
            }}>
              <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ 
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-home-sharp" color={color} size={size} />
                  ),
                  headerShown: false 
                }} 
              />
              <Tab.Screen 
                name="Chat" 
                component={ChatScreen} 
                options={{ 
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="chatbubbles" color={color} size={size} />
                  ),
                  headerShown: false 
                }} 
              />
              <Tab.Screen 
                name="Profile" 
                component={ProfileStack} 
                options={{ 
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" color={color} size={size} />
                  ),
                  headerShown: false 
                }} 
              />
      </Tab.Navigator>
    )
  }
  
  console.log(spotifyToken)
  console.log(user)

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={Theme}>
        <Stack.Navigator
            screenOptions={{
              cardStyle: { backgroundColor: '#222222' }
        }}>
          { user ? (
            <>
              <Stack.Screen name="Nav" component={BottomTab} options={{ headerShown: false }}/>
              <Stack.Screen name="Home">
                {props => <HomeScreen {...props} extraData={user} />}
              </Stack.Screen>
              <Stack.Screen name="Connect With Spotify" component={SpotifyConnectScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="ChatRoom" component={ChatRoomScreen} options={{ headerShown: false }}/>

            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Connect With Spotify" component={SpotifyConnectScreen} options={{ headerShown: false}}/>
              <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Setup" component={SetupScreen} options={{ headerShown: false }}/>
            </>     
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}