import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddChat, Chat, Home } from '../screens';
import { Login, Register, LoadingScreen } from '../auth';
import { useAuthContext } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

const Router = () => {

  const { currentUser, authLoading } = useAuthContext()

  if (authLoading) return <LoadingScreen />

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        {currentUser ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddChat" component={AddChat} />
            <Stack.Screen name="Chat" component={Chat} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router


const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C6BED" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

