import 'react-native-gesture-handler';
import React, { useEffect, useState, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, ChatScreen, ProfileScreen } from './src/screens'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { collection, setDoc, getDoc, doc } from "firebase/firestore"; 
import { auth, db } from './src/firebase/config'
import { AuthContext } from './src/AuthContext/AuthContext'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  /*useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);*/



  const authContext = useMemo( () => ({
    signIn: async data => {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            alert("Logged in");
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
    /*
    signOut: () => {
      firebase
        .signOut()
        .then(() => {
          setUser(null)
        })
        .catch((error) => {
          alert(error)
        })
    },*/
    signUp: async data => {
      createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in 
        alert("Account made.")
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


  /*if (loading) {
    return (
      <></>
    )
  }*/

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: { backgroundColor: '#222222' },
          }}>
          { user ? (
            <Stack.Screen name="Home">
              {props => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }}/>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}