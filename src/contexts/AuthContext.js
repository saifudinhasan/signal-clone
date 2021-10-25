import React, { useContext, useState, useEffect, createContext } from "react"
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {

  const auth = getAuth();

  const user = auth.currentUser;

  const [currentUser, setCurrentUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  const authLogin = async (email, password) => {
    setAuthLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
    }

    setAuthLoading(false)
  }

  const authSignup = async (email, password, name, imageUrl) => {
    setAuthLoading(true)

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, {
        displayName: name,
        photoURL: imageUrl,
      })

      // Immediately update UI
      setCurrentUser({
        ...currentUser,
        displayName: name,
        photoURL: imageUrl,
      })

    } catch (error) {
    }

    setAuthLoading(false)
  }

  const authLogout = async () => {
    setAuthLoading(true)

    try {
      await signOut(auth)
    } catch (error) {
    }

    setAuthLoading(false)
  }

  useEffect(() => {
    // User observer
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }

      setAuthLoading(false)
    });

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    authLoading,
    user,

    authLogin,
    authSignup,
    authLogout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
