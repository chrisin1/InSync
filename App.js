import 'react-native-gesture-handler';
import React, { useEffect, useState, useMemo } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LoginScreen, HomeScreen, RegistrationScreen, ChatScreen, ProfileScreen, SetupScreen, EditProfileScreen } from './src/screens'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, setDoc, getDoc, doc } from "firebase/firestore"; 
import { auth, db } from './src/firebase/config'
import { AuthContext } from './src/AuthContext/AuthContext'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

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
              location: data.location
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
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        theme={Theme}>
        { user ? (
          <Tab.Navigator
            initialRouteName={"Home"}
            screenOptions={{
              tabBarStyle: { backgroundColor: '#373737', borderBottomWidth: 0, borderTopWidth: 0 }
            }}>
              <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false, unmountOnBlur: true }} />
              <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, unmountOnBlur: true }} />
              <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator
          screenOptions={{
            cardStyle: { backgroundColor: '#222222' }
          }}>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Setup" component={SetupScreen} options={{ headerShown: false, unmountOnBlur: true }} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}