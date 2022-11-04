import 'react-native-gesture-handler';
import React, { useEffect, useState, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SpotifyConnectScreen, LoginScreen, HomeScreen, RegistrationScreen, ChatScreen, ProfileScreen } from './src/screens'
import { collection, setDoc, getDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from './src/firebase/config'
import { AuthContext } from './src/AuthContext/AuthContext'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi()
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

const Stack = createStackNavigator();

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
              fullName: data.fullName
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
  console.log(spotifyToken)
  console.log(user)
  return (
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: { backgroundColor: '#222222' },
          }}>
          { user ? (
            <>
                <Stack.Screen name="Home">
                  {props => <HomeScreen {...props} extraData={user} />}
                </Stack.Screen>
                <Stack.Screen name="Connect With Spotify" component={SpotifyConnectScreen}/>
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Connect With Spotify" component={SpotifyConnectScreen}/>

            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
    
  );
}