import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button, Image, Input } from 'react-native-elements'

import { useAuthContext } from '../contexts/AuthContext'

const Login = ({ navigation }) => {

  const { currentUser, authLoading, authLogin } = useAuthContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    authLogin(email, password)
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
          onSubmitEditing={login}
        />
      </View>

      <Button title="Login" containerStyle={styles.button} onPress={login} />
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
