import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import icon from '../../assets/icon.png'
import { addDoc, serverTimestamp, collection, query, orderBy, onSnapshot, } from "firebase/firestore";
import { firestore } from '../config/firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {

  const [chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    const chatsCollectionRef = collection(firestore, "chats", id, "messages")
    const q = query(chatsCollectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setChatMessages(querySnapshot.docs.map(doc => doc.data()))
    })

    return unsubscribe
  }, [])

  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{ uri: chatMessages?.[0]?.photoURL || icon }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: 700 }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
