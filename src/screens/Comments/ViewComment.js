import { StyleSheet, View, Text,Image,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import * as React from 'react';
import { firebase } from '../../component/fireStoreConfig'; 
import { db } from '../../component/firestore';
import Colors from '../../../assets/color';


import { useNavigation } from '@react-navigation/native';

import {
    updateDoc,
    getDoc,
    doc
  } from "firebase/firestore";

export default function ViewComment({route}) {

    const navigation=useNavigation();
    const issueID = route.params.id;
   
    const [heading, setHeading] = React.useState("");
    const [comment,setComment] = React.useState("");
  
    

    const [issueData, setIssue] = React.useState([]);
    

    const ref = firebase.firestore().collection('issues');

   

    React.useEffect(() => {
        getIssue();
    },[]);

    async function getIssue(){
        const docRef = doc(db, "issues", issueID);
        const issue = await getDoc(docRef);
        const issueData = issue.data();
        setIssue(issueData);
        setHeading(issueData.heading);
        setComment(issueData.comment);
       
        
    }

    async function updateIssue(){
      
      const data = {
      heading: heading,
       
      
       
      }
      ref.doc(issueID).update(data)
      .then(() => {
        navigation.navigate("MyIssues")
        alert("issue  has been Updated!");
      }).catch(function(error){
        alert("error file delete")
      });
    }



    return (

        <SafeAreaView>
          <ScrollView>
          <View style={styles.container}>
            
        <View >
        <Text style={{fontWeight:'bold', fontSize:15,marginBottom:10,}}>
               issue
            </Text>
         <TextInput
           style={styles.textInput}
          
           value={heading}
           onChangeText={heading => setHeading(heading)}
            autoCorrect={false}
         />
          <TextInput
           style={styles.textInput}
          
           value={comment}
           
         />
        
         
    
        </View>
              <TouchableOpacity
                  icon="plus"
                  onPress={() => navigation.navigate("Issues")}
                  style={styles.button}
              >
             <Text style={{fontWeight:'bold', fontSize:22,color:Colors.white}}>Go Back</Text>
             
              </TouchableOpacity>
    
       </View> 
    
          </ScrollView>
        </SafeAreaView>
        
        
      );
    }
    
    const styles = StyleSheet.create({
      container: {
            flex: 1,
            alignItems: 'center',
            marginTop:1,
      },
      textInput: {
        width:300,
        fontSize:15,
        borderBottomWidth:1,
        borderBottomColor:'#000',
        marginBottom:10,
        textAlign:'center'
      },
      textArea: {
        width:300,
        height:200,
        fontSize:15,
        borderBottomWidth:1,
        borderBottomColor:'#000',
        marginBottom:10,
        textAlign:'center'
      },
      textArea2: {
        width:300,
        height:100,
        fontSize:15,
        borderBottomWidth:1,
        borderBottomColor:'#000',
        marginBottom:10,
        textAlign:'center'
      },
      button:{
          marginTop:50,
          height:50,
          width:250,
          backgroundColor:Colors.Orange,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:10,
     
      },
      Photobutton:{
      
        display:"flex",
        flexDirection:"row",
        margin:20,
        marginLeft:20,
        height:30,
        width:250,
        backgroundColor:Colors.Orange,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    
    }
    });



































































































































































































// import {View,Text,StyleSheet,TextInput,Pressable} from 'react-native';
// import React, {useState} from 'react'
// import {firebase} from '../../config';
// import {useNavigation} from '@react-navigation/native';


// const UpdateIssue = ({route}) => {
//     const todoRef = firebase.firestore().collection('issues');
//     const [textHeading, onChangeHeadingText] = useState(); 
//     const navigation = useNavigation();

//     const updateTodo = () => {
//         if(textHeading && textHeading.length > 0) {
//           todoRef
//             .doc(route.params.item.id)
//             .update({
//                 heading: textHeading,
//             }).then(() => {
//                 navigation.navigate('IssueList')
//             }).catch(error => {
//                 alert(error.message)
//             })
//         }    
//     }

//     return (
//         <View style={styles.container}>
//             <TextInput 
//                 style={styles.textField}
//                 onChangeText={onChangeHeadingText}
//                 value={textHeading}
                
//             />  
//             <Pressable
//                 style={styles.buttonUpdate}
//                 onPress={() => {updateTodo()}}
//             >
//                 <Text style={styles.tes}>Update</Text>
//             </Pressable>  
               
//         </View>
//     )
// }

// export default UpdateIssue;

// const styles = StyleSheet.create({
//     container:{
//         marginTop:30,
//         marginLeft:15,
//         marginRight:15
//     },
//     textField:{
//         marginBottom:10,
//         padding:10,
//         fontSize:15,
//         color:'#000000',
//         backgroundColor:'#e0e0e0',
//         borderRadius:5,
//         height:150,
//         paddingTop:-170
//     },
//     tes:{
//         color:"white",
//         fontSize:20,
//         fontWeight:"bold"
//     },
//     buttonUpdate :{
//         marginTop:25,
//         marginLeft:100,
//         alignItems:'center',
//         justifyContent:'center',
//         paddingVertical:12,
//         paddingHorizontal:32,
//         borderRadius:25,
//         elevation:10,
//         backgroundColor:'#0D527A',
//         width:140
        
//     },
    
// })