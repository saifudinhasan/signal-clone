import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Button, Image, Input, Text } from 'react-native-elements'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { app } from '../config/firebase'

const Register = ({ navigation }) => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [imageUrl, setImageUrl] = useState()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login"
    })
  }, [navigation])

  const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        user.updateProfile({
          displayName: name,
          photoURL: imageUrl,
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>Create a Signal account</Text>

      <View style={styles.inputContainer}>

        <Input placeholder="Full Name" autoFocus type="text"
          value={name}
          onChangeText={text => setName(text)}
        />

        <Input placeholder="Email" type="email"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Input placeholder="Password" type="password" secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Input placeholder="Profile Picture URL (optional)" type="text"
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
          onSubmitEditing={register}
        />

        <Button
          containerStyle={styles.button}
          title="Register"
          raised
          onPress={register}
        />

      </View>
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
    alignItems: "center",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
})
