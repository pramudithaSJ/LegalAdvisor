import { StyleSheet, View, Text,Image,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import * as React from 'react';
import { firebase } from '../../component/fireStoreConfig'; 
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../component/firestore';
import Colors from '../../../assets/color';


import { useNavigation } from '@react-navigation/native';

import {
    updateDoc,
    getDoc,
    doc
  } from "firebase/firestore";

export default function UpdateBook({route}) {

    const navigation=useNavigation();
    const bookID = route.params.id;
   
    const [title, setTitle] = React.useState("");
    const [name, setName] = React.useState("");
    const [desc, setDesc] = React.useState("");
    

    const [bookData, setBook] = React.useState([]);
    

    const ref = firebase.firestore().collection('books');

   

    React.useEffect(() => {
        getBook();
    },[]);

    async function getBook(){
        const docRef = doc(db, "books", bookID);
        const book = await getDoc(docRef);
        const bookData = book.data();
        setBook(bookData);
        setTitle(bookData.bookName)
        setName(bookData.author);
        setDesc(bookData.description);
       
        
    }

    async function updateBook(){
      
      const data = {
        bookName:title,
        author:name,
        description:desc,
      
       
      }
      ref.doc(bookID).update(data)
      .then(() => {
        navigation.navigate("MyBooks")
        alert("Book has been Updated!");
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
                Book Title
            </Text>
         <TextInput
           style={styles.textInput}
          
           value={title}
           onChangeText={title => setTitle(title)}
            autoCorrect={false}
         />
         <Text style={{fontWeight:'bold', fontSize:15,marginBottom:10,}}>
                Author Name
          </Text>
         <TextInput
           style={styles.textInput}
           value={name}
           onChangeText={name => setName(name)}
            autoCorrect={false}
         />
         
         
              
         
         <Text style={{fontWeight:'bold', fontSize:15,marginBottom:10,}}> Short Description</Text>
          <TextInput
          style={styles.textArea}
          value={desc}
          onChangeText={decs => setDesc(decs)}
          autoCorrect={false}
          />
    

    
    
         
        
    
        </View>
              <TouchableOpacity
                  icon="plus"
                  onPress={() => updateBook()}
                  style={styles.button}
              >
             <Text style={{fontWeight:'bold', fontSize:22,color:Colors.white}}>Update E-Book</Text>
             
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
    