//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Button,SafeAreaView,TouchableOpacity,Image  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { firebase } from '../component/fireStoreConfig'; 



import Settings from './settings';

import EventList from './Event/EventList';
import MyEvents from './Event/MyEvents';
import AddEvent from './Event/AddEvent';
import UpdateEvent from './Event/UpdateEvent';

import MyBooks from './EBooks/MyBooks';
import AddBook from './EBooks/AddBook';
import UpdateBook from './EBooks/UpdateBook';
import AllBooks from './EBooks/ViewBooks';
import ViewBook from './EBooks/ViewBook';

import Issues from './issues/Issues';
import AddIssue from '../screens/issues/AddIssue';

import CommentList from './Comments/CommentList';
import ViewComment from './Comments/ViewComment';
import UpdateComment from './Comments/UpdateComment';


import MyIssues from '../screens/issues/MyIssues';
import UpdateIssue from '../screens/issues/UpdateIssue';
import AddComment from '../screens/Comments/AddComment';
import Colors from '../../assets/color';



function HomeScreen({ navigation }) {
  
  const [name, setName] = React.useState('')

  React.useEffect(() => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
        if(snapshot.exists){
              setName(snapshot.data())
        }
        else {
            console.log('User does not exist')
        }
    })
   
   },[] )




    return (
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
      //   <Button
      //     title="Go to E-Book"
      //     onPress={() => navigation.push('AllBooks')}
      //   />
      //   <Button
      //     title="Go to Issues"
      //     onPress={() => navigation.push('Issues')}
      //   />
      //   <Button
      //     title="Go to Events"
      //     onPress={() => navigation.push('EventList')}
      //   />
      //    <Button
      //     title="Go to News"
      //     onPress={() => navigation.push('Books')}
      //   />
      // </View>
      <SafeAreaView style={styles.container}>
      <Text style={{fontSize:30, fontWeight:'bold',marginBottom:10,}}>
         Hello, {name.firstName}
         </Text>
        <TouchableOpacity
          onPress={() => {firebase.auth().signOut()}}
          style={styles.button}
        >
        <Text style={{fontSize:20, fontWeight:'bold', color:'#FFFFFF'}}>
         Sign out
         </Text>   
     </TouchableOpacity>
    
    
     <TouchableOpacity
         onPress={() => navigation.push('Issues')}
          style={styles.button1}
        >
        <Text style={{fontSize:20, fontWeight:'bold', color:'#FFFFFF'}}>
           Issues
         </Text>   
     </TouchableOpacity>
 
 
     <TouchableOpacity
          onPress={() => navigation.push('AllBooks')}
          style={styles.button2}
        >
        <Text style={{fontSize:20, fontWeight:'bold', color:'#FFFFFF'}}>
         E-Books
         </Text>   
     </TouchableOpacity>
 
 
     <TouchableOpacity
          onPress={() => navigation.navigate('')}
          style={styles.button3}
        >
        <Text style={{fontSize:20, fontWeight:'bold', color:'#FFFFFF'}}>
         News
         </Text>   
     </TouchableOpacity>
 
     <TouchableOpacity
         onPress={() => navigation.push('EventList')}
          style={styles.button4}
        >
        <Text style={{fontSize:20, fontWeight:'bold', color:'#FFFFFF'}}>
         Events
         </Text>   
     </TouchableOpacity>
     
 
 
 
 </SafeAreaView>
 
    );
  }
  function ProfileScreen({ navigation }) {
    return (
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
      //   <Button
      //     title="Go+ to My Issues"
      //     onPress={() => navigation.push('MyIssues')}
      //   />
      //     <Button
      //     title="My Comments"
      //     onPress={() => navigation.push('CommentList')}
      //   />
       
      //   <Button

        
      //     title="Go to My Books"
      //     onPress={() => navigation.push('MyBooks')}
      //   />
      //    <Button
        
      //   title="Go to My Events"
      //   onPress={() => navigation.push('MyEvents')}
      // />
       
      // </View>
      <SafeAreaView style={styles.container}>

          
      <TouchableOpacity
      onPress={() => navigation.push('MyIssues')}
     style={styles.buttonPro}
   >
   <Text style={{fontSize:20, fontWeight:'bold', color:'#FFFFFF'}}>
     My Issues
    </Text>   
</TouchableOpacity>

<TouchableOpacity
      onPress={() => navigation.push('MyBooks')}
     style={styles.buttonPro}
   >
   <Text style={{fontSize:20, fontWeight:'bold', color:'#FFFFFF'}}>
     My E-Books
    </Text>   
</TouchableOpacity>

<TouchableOpacity
     onPress={() => navigation.push('MyEvents')}
     style={styles.buttonPro}
   >
   <Text style={{fontSize:20, fontWeight:'bold',color:'#FFFFFF'}}>
     My Events
    </Text>   
</TouchableOpacity> 

<TouchableOpacity
     onPress={() => navigation.push('CommentList')}
     style={styles.buttonPro}
   >
   <Text style={{fontSize:20, fontWeight:'bold',color:'#FFFFFF'}}>
     My Comments
    </Text>   
</TouchableOpacity>



</SafeAreaView>



    );
  }

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfilesStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
// create a component
const Home = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator 
             screenOptions={{
              tabBarShowLabel:false,
              tabBarStyle: { 
                position: 'absolute',
              backgroundColor:Colors.Ash,
              bottom:25,
              left:20,
              right:20,
              borderRadius:20,
              elevation:0,
              height:90,
             },
            }}>
            <Tab.Screen name='Home' options={{
              tabBarIcon:({focused})=>(
                <View>
                  <Image 
                  source={require('../../assets/home.png')}
                  resizeMode="contain"
                  style={{
                      width:30,
                      height:30,
                      tintColor: focused ? '#B94141':'#000000',

                  }}
                  />
                 
                 
                </View>

              ),
            }}>
                {()=>(
                    <HomeStack.Navigator>
                      <HomeStack.Screen options={{headerShown:false,}} name="Home Page" component={HomeScreen} />
                      <HomeStack.Screen options={{headerShown:false,}} name="EventList" component={EventList} />
                      <HomeStack.Screen options={{headerShown:false,}} name="AllBooks" component={AllBooks} />
                      <HomeStack.Screen options={{headerShown:false,}} name="ViewBook" component={ViewBook} />
                      <HomeStack.Screen options={{headerShown:false,}} name="Issues" component={Issues} /> 
                      <HomeStack.Screen options={{headerShown:false,}} name="AddComment" component={AddComment} />
                      <HomeStack.Screen options={{headerShown:false,}} name="ViewComment" component={ViewComment} />
                      <HomeStack.Screen options={{headerShown:false,}} name="AddIssue" component={AddIssue} />
                    </HomeStack.Navigator>
                )}
            </Tab.Screen>
           
            <Tab.Screen name='Settings' options={{
              tabBarIcon:({focused})=>(
                <View>
                  <Image 
                  source={require('../../assets/settings.png')}
                  resizeMode="contain"
                  style={{
                      width:30,
                      height:30,
                      tintColor: focused ? '#B94141':'#000000',

                  }}
                  />
                 
                </View>

              ),
            }}>
                {()=>(
                    <SettingsStack.Navigator>
                        <SettingsStack.Screen options={{headerShown:false,}}
                        name="Settings"
                        component={Settings} 
                        />
                    </SettingsStack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name='Profile' options={{
              tabBarIcon:({focused})=>(
                <View>
                  <Image 
                  source={require('../../assets/profile.png')}
                  resizeMode="contain"
                  style={{
                      width:30,
                      height:30,
                      tintColor: focused ? '#B94141':'#000000',

                  }}
                  />
                 
                </View>

              ),
            }}>
                {()=>(
                    <ProfilesStack.Navigator>
                        <ProfilesStack.Screen options={{headerShown:false,}} name="MyProfile" component={ProfileScreen} />
                        <ProfilesStack.Screen options={{headerShown:false,}} name="MyEvents" component={MyEvents} />
                        <ProfilesStack.Screen options={{headerShown:false,}} name="AddEvent" component={AddEvent} />
                        <ProfilesStack.Screen options={{headerShown:false,}} name="UpdateEvent" component={UpdateEvent} />
                        <ProfilesStack.Screen options={{headerShown:false,}} name="MyBooks" component={MyBooks} />
                        <ProfilesStack.Screen options={{headerShown:false,}} name="AddBook" component={AddBook} />
                        <ProfilesStack.Screen options={{headerShown:false,}} name="UpdateBook" component={UpdateBook} />

                          <ProfilesStack.Screen options={{headerShown:false,}} name="MyIssues" component={MyIssues} />
                          <ProfilesStack.Screen options={{headerShown:false,}} name="AddIssue" component={AddIssue} />
                          <ProfilesStack.Screen options={{headerShown:false,}} name="UpdateIssue" component={UpdateIssue} />
                          <ProfilesStack.Screen options={{headerShown:false,}}name="CommentList" component={CommentList} />
                          <ProfilesStack.Screen options={{headerShown:false,}}name="UpdateComment" component={UpdateComment} />
                          
                        
                  
                
                    </ProfilesStack.Navigator>
                )}
            </Tab.Screen>

            </Tab.Navigator>
            
        </NavigationContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
  container: {
        flex: 1,
        alignItems: 'center',
        marginTop:100,
        
  },
  textInput: {
    paddingTop:20,
    paddingBottom:10,
    width:400,
    fontSize:20,
    color:'#FFFFFF',
    borderBottomWidth:1,
    borderBottomColor:'#000',
    marginBottom:10,
    textAlign:'center',
   
  
  },

  button:{
    marginTop:-100,
    height:40,
    width:130,
    backgroundColor:'#990000',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,

},

  button1:{
    marginTop:100,
    marginLeft:-175,
    height:150,
    width:170,
    backgroundColor:'#042F48',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,

},

button2:{
  marginTop:-150,
  marginLeft:175,
  height:150,
  width:170,
  backgroundColor:'#211F1F',
  alignItems:'center',
  justifyContent:'center',
  borderRadius:20,

},
button3:{
marginTop:10,
marginLeft:-175,
height:150,
width:170,
backgroundColor:'#0D527A',
alignItems:'center',
justifyContent:'center',
borderRadius:20,

},
button4:{
marginTop:-150,
marginLeft:175,
height:150,
width:170,
backgroundColor:'#B94141',
alignItems:'center',
justifyContent:'center',
borderRadius:20,

},
button5:{
marginTop:-40,
marginLeft:-20,
height:40,
width:130,
backgroundColor:'#0D527A',
alignItems:'center',
justifyContent:'center',
borderRadius:50

},
buttonPro:{
  marginTop:10,
  height:70,
  width:250,
  backgroundColor:'#0D527A',
  alignItems:'center',
  justifyContent:'center',
  borderRadius:50,

    }

})

//make this component available to the app
export default Home;
