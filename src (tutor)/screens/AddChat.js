import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { collection, addDoc } from "firebase/firestore";
import { firestore } from '../config/firebase';

const AddChat = ({ navigation }) => {

  const [input, setInput] = useState('')

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
    })
  }, [])

  const createChat = async () => {
    // Add a new document with a generated id.
    await addDoc(collection(firestore, "chats"), {
      chatName: input
    }).then(() => navigation.goBack())
      .catch(err => { })
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={text => setInput(text)}
        leftIcon={<Icon name="wechat" type="antdesign" size={24} color="black" />}
      />
      <Button disabled={!input} title="Create new chat" onPress={createChat} />
    </View>
  )
}

export default AddChat

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
})
