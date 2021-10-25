import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button, Image, Input } from 'react-native-elements'
import { useEffect } from 'react'

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../config/firebase'

const Login = ({ navigation }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        navigation.replace("Home")
      } else {
        // ...
      }
    });

    return unsubscribe;
  }, [])

  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
  }

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>

      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input placeholder="Email" autoFocus type="Email" value={email} onChangeText={text => setEmail(text)} />
        <Input placeholder="Password" secureTextEntry type="Password" value={password} onChangeText={text => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>

      <Button title="Login" containerStyle={styles.button} onPress={signIn} />
      <Button title="Register" containerStyle={styles.button} type="outline"
        onPress={() => navigation.navigate("Register")}
      />

    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10,
  },
})
