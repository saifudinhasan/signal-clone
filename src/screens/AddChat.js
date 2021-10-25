import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDataContext } from '../contexts/DataContext';

const AddChat = ({ navigation }) => {

  const [input, setInput] = useState('')
  const { createChat } = useDataContext()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
    })
  }, [])

  const submitChat = async () => {
    try {
      await createChat(input)
      navigation.goBack()
    } catch (error) {
    }
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={text => setInput(text)}
        leftIcon={<Icon name="wechat" type="antdesign" size={24} color="black" />}
      />
      <Button disabled={!input} title="Create new chat" onPress={submitChat} />
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
