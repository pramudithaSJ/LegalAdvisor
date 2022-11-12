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

export default function AddComment({route}) {

    const navigation=useNavigation();
    const issueID = route.params.id;
   
    const [heading, setHeading] = React.useState("");
    const [comment, setComment] = React.useState("");

  
    const [issueData, setIssue] = React.useState([]);
    
    const ref = firebase.firestore().collection('issues');
    const ref2 = firebase.firestore().collection('comments');


    React.useEffect(() => {
        getIssue();
    },[]);

    async function getIssue(){
        const docRef = doc(db, "issues", issueID);
        const issue = await getDoc(docRef);
        const issueData = issue.data();
        setIssue(issueData);
        setHeading(issueData.heading)
       
        
    }

    async function addComment(){
      
      const data = {
      heading: heading,
      comment:comment,
  
      }
      ref.doc(issueID).update(data)
      .then(() => {
       
        alert("issue  has been Updated!");
      }).catch(function(error){
        alert("error file delete")
      });
      ref2.add(data)
      .then(() => {
       
      }).catch(function(error){
       
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
           onChangeText={comment => setComment(comment)}
            autoCorrect={false}>

         </TextInput>
        
        </View>
              <TouchableOpacity
                  icon="plus"
                  onPress={() => addComment()}
                  style={styles.button}
              >
             <Text style={{fontWeight:'bold', fontSize:22,color:Colors.white}}>Add Comment</Text>
             
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

































































































































































































