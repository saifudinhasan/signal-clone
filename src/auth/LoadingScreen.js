import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAuthContext } from '../contexts/AuthContext'

const LoadingScreen = () => {

  const { setAuthLoading } = useAuthContext()

  useEffect(() => {
    // console.log('loading screen ran')
    // return () => console.log('loading screen gone')
  }, [])

  return (
    <TouchableOpacity onPress={() => setAuthLoading(false)} style={styles.container}>
      <View>
        <Text>Loading ...</Text>
      </View>
    </TouchableOpacity>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
})
