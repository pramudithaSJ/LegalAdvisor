import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView,Image } from 'react-native';
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../component/fireStoreConfig' ;
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../assets/color';



const Login = () =>{

     const navigation = useNavigation()
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')

     loginUser = async (email, password) => {
    
     try{
        await firebase.auth().signInWithEmailAndPassword(email, password)
     } catch (error){
        alert(error.message)

        }
     }

     return(


      <ScrollView>
        <View style={styles.logocontainer}>
        <Image 
                  source={require('../../assets/logo.png')}
                  
                  style={{
                      width:300,
                      height:300,
                     
                  }}
                  />
        </View>
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize:26 }} >
               Login
            </Text>
                <View style ={{marginTop:10}}>
                  <TextInput
                      style={styles.textInput}
                      placeholder="Email"
                      onChangeText={(email) => setEmail(email)} 
                      autoCapitalize="none"
                      autoCorrect={false}                    
                      />
                  <TextInput
                      style={styles.textInput}
                      placeholder="Password"
                      onChangeText={(password) => setPassword(password)} 
                      autoCapitalize="none"
                      autoCorrect={false} 
                      secureTextEntry={true}                   
                      />

            </View>
                <TouchableOpacity
                  onPress={() => loginUser(email,password)}
                  style={styles.button}
                  >
                   <Text style={{fontWeight: 'bold', fontSize:22,color:Colors.Ash,}}>Login</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                  onPress={() => navigation.navigate('Registration')}
                  style={{marginTop:20}}
                  >
                   <Text style={{fontWeight: 'bold', fontSize:16}}>
                     Don't have an account? Register Now
                   </Text>
                   </TouchableOpacity>
            </View>
            </ScrollView>
     )

     }

export default Login

const styles = StyleSheet.create({
 container: {
       flex: 1,
       alignItems: 'center',
       marginBottom:200,
 },
 logocontainer:{
  alignItems: 'center',
  padding:2
 },
 textInput: {
   paddingTop:20,
   paddingBottom:10,
   width:400,
   fontSize:20,
   borderBottomWidth:1,
   borderBottomColor:'#000',
   marginBottom:10,
   textAlign:'center'
 },
 button:{
     marginTop:50,
     height:70,
     width:250,
     backgroundColor:'#0D527A',
     alignItems:'center',
     justifyContent:'center',
     borderRadius:20,
    

 }

})