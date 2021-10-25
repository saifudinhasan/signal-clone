import React, { useContext, useState, useEffect, createContext } from "react"
import { firestore } from '../config/firebase'
import {
  onSnapshot,
  collection,
  addDoc,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";

const DataContext = createContext()

export const useDataContext = () => useContext(DataContext)

export const DataContextProvider = ({ children }) => {

  const [chatGroups, setChatGroups] = useState([])
  const [messages, setMessages] = useState([])

  const createChat = async (input) => {
    // Add a new document with a generated id.
    await addDoc(collection(firestore, "chats"), {
      chatName: input
    })
  }

  const addMessage = async (id, message) => {
    const chatsCollectionRef = collection(firestore, "chats", id, "messages")

    await addDoc(chatsCollectionRef, { ...message, timestamp: serverTimestamp(), });
    // await addDoc(chatsCollectionRef, { ...message, timestamp: serverTimestamp() });
  }

  const messagesUnsubscribe = (id) => {
    const chatsCollectionRef = collection(firestore, "chats", id, "messages")
    const q = query(chatsCollectionRef, orderBy("timestamp", "asc"));
    onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    })
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "chats"), (snapshot) => {
      setChatGroups(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
    });
    return unsubscribe
  }, [])

  const value = {
    chatGroups,
    messages, setMessages,

    createChat,
    addMessage,

    messagesUnsubscribe,
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
