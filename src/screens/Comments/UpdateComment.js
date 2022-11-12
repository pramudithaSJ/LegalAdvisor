
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

export default function UpdateComment({route}) {

    const navigation=useNavigation();
    const commentID = route.params.id;
   
    const [heading, setHeading] = React.useState("");
  
    const [commentData, setComment] = React.useState([]);
    
    const ref = firebase.firestore().collection('comments');

   

    React.useEffect(() => {
        getComment();
    },[]);

    async function getComment(){
        const docRef = doc(db, "comments", commentID);
        const comment = await getDoc(docRef);
        const commentData = comment.data();
        setComment(commentData.comment);
        setHeading(commentData.heading)
        
    }

    async function updateComment(){
      
      const data = {
        heading: heading,
       
      
       
      }
      ref.doc(commentID).update(data)
      .then(() => {
        navigation.navigate("CommentList")
        alert("Comment  has been Updated!");
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
               Comment
            </Text>
         <TextInput
           style={styles.textInput}
          
           value={commentData}
           onChangeText={heading => setComment(commentData)}
            autoCorrect={false}
         />
        
    
        </View>
              <TouchableOpacity
                  icon="plus"
                  onPress={() => updateComment()}
                  style={styles.button}
              >
             <Text style={{fontWeight:'bold', fontSize:22,color:Colors.white}}>Update Comment</Text>
             
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
        textAlign:'center',
        disabled:"true"


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

