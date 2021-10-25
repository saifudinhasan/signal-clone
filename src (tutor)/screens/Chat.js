import React, { useLayoutEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements'
import icon from '../../assets/icon.png'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { addDoc, serverTimestamp, collection, query, orderBy, onSnapshot, } from "firebase/firestore";
import { firestore } from '../config/firebase'
import { getAuth } from "firebase/auth";

const Chat = ({ navigation, route }) => {

  const { chatName, id } = route.params

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const auth = getAuth()
  const user = auth.currentUser;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar rounded source={{
            uri: messages[0]?.data?.photoURL || icon,
          }} />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>{chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 80,
          marginRight: 20,
        }}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation, messages])

  const sendMessage = async () => {
    Keyboard.dismiss()

    const message = {
      timestamp: serverTimestamp(),
      message: input,
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
    }

    const chatsCollectionRef = collection(firestore, "chats", id, "messages")

    await addDoc(chatsCollectionRef, message);

    setInput("")
  }

  useLayoutEffect(() => {

    const chatsCollectionRef = collection(firestore, "chats", id, "messages")
    const q = query(chatsCollectionRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    })

    return unsubscribe

  }, [route])

  const scrollViewRef = useRef();

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>

            <ScrollView contentContainerStyle={{ padding: 15, }}
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
              {messages.map(({ id, data }) => (
                data.email === user.email ? (
                  <View key={id} style={styles.receiver}>
                    <Avatar
                      position="absolute"
                      rounded
                      size={30}
                      bottom={-15}
                      right={-5}
                      // WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      source={{
                        uri: data.photoURL ?? icon
                      }}
                    />
                    <Text style={styles.receiverText} >
                      {data.message}
                    </Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position="absolute"
                      rounded
                      size={30}
                      bottom={-15}
                      left={-5}
                      // WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                      }}
                      source={{
                        uri: data.photoURL ?? icon
                      }}
                    />
                    <Text style={styles.senderText} >
                      {data.message}
                    </Text>
                    <Text style={styles.senderName} >
                      {data.displayName}
                    </Text>
                  </View>
                )
              ))}
            </ScrollView>

            <View style={styles.footer}>
              <TextInput style={styles.textInput} placeholder="Signal message ..."
                value={input}
                onChangeText={text => setInput(text)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity
                onPress={sendMessage}
                activeOpacity={0.5}
              >
                <Ionicons name="send" size={24} color="#2868E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    // borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#286BE6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
})
