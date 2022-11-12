import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState, useEffect} from "react";
import { firebase } from './src/component/fireStoreConfig';
import AddEvent from './src/screens/Event/AddEvent';
import EventList from './src/screens/Event/EventList';
import MyEvents from './src/screens/Event/MyEvents';
import UpdateEvent from './src/screens/Event/UpdateEvent';

import Home from './src/screens/home';
import Login from './src/Login/Login';
import Registration from './src/Login/Registration';
const Stack = createStackNavigator();


export default function App() {

  const [initializing , setInitializing] = React.useState(true);
  const [user, setUser]  = React.useState();

  function onAuthStateChanged(user){
    setUser(user);
    if (initializing) setInitializing(false);
    
    }
    useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
     }, []);
     if (initializing) return null;

 if(!user){
  return(
    <NavigationContainer>

    
    <Stack.Navigator>
      <Stack.Screen
      name = "Login"
      component={Login}
      />
       <Stack.Screen
      name = "Registration"
      component={Registration}
      />
    </Stack.Navigator>
    
    </NavigationContainer>
    );

 }
  return (


    <Home/>
 
  );
}

