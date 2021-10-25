import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { getAuth, signOut } from "firebase/auth";
import { FontAwesome, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { app, firestore } from '../config/firebase'

import { onSnapshot, collection } from "firebase/firestore";

const Home = ({ navigation }) => {

  const [chats, setChats] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "chats"), (snapshot) => {
      setChats(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
    });
    return unsubscribe
  }, [])

  const auth = getAuth()
  const user = auth.currentUser;
  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace("Login")
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            {user?.photoURL
              ? <Avatar rounded source={{ uri: user.photoURL }} />
              : <FontAwesome name="user-circle-o" size={24} color="black" />
            }
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 80,
          marginRight: 20,
        }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
})
