import { StyleSheet, View, Text,Image, ScrollView, SafeAreaView, Touchable, TouchableOpacity,Alert } from 'react-native';
import { Button,TextInput,Card, Title, Paragraph } from 'react-native-paper';
import * as React from 'react';
import { db } from '../../component/firestore';
import { firebase } from '../../component/fireStoreConfig'; 

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
  } from "firebase/firestore";
import Colors from '../../../assets/color';


export default function MyBooks({ navigation }) {

    const booksCollectionRef = collection(db, "books");

    const [books, setBooks] = React.useState([]);

    const getBooks = async () => {
      const data = await getDocs(booksCollectionRef);
      setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id  })));
    };

    React.useEffect(() => {
        getBooks();

        const focusHandler = navigation.addListener('focus', () => {
            getBooks();
        });
    },[navigation]);

    const createTwoButtonAlert = (id,image) =>
    Alert.alert('Are you sure you want to delete?', '', [
      {
        text: 'Cancel',
        onPress: () => navigation.navigate("MyBooks"),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => deleteBook(id,image) },
    ]);
    
    async function deleteBook(id,image){
      const docRef = doc(db, "books", id);
      
      await deleteDoc(docRef).then(() => { 
        const img = image.split("/");
        var deleteRef = firebase.storage().ref('books/').child(img[1]);
        deleteRef.delete().then(function() {
          alert("Book Removed Successfully!");
          getBooks();
        }).catch(function(error) {
         
        });
       }) 
       .catch(error => { 
        console.log(error); 
      })

    }


  return (

<SafeAreaView>
    <View style={styles.uppercontainer}>
    <Button icon="plus" mode="contained" style={{marginTop:10}} buttonColor={Colors.Orange} onPress={()=>navigation.navigate('AddBook')}>
        Publish New Book
    </Button>
    </View>

<ScrollView>


    <View style={styles.container}>
    
    {books.map((book) =>{
        return(
           
            <Card style={{marginTop:20,backgroundColor:Colors.LightBlue, color:'#fff',paddingBottom:10,}} key={book.id}>
                <Card.Content>
                    <Title style={{color:Colors.white,fontSize:20,fontWeight:'bold'}}>{book.bookName}</Title>
                    <Paragraph style={{color:'#fff',marginBottom:20,}}>{book.description}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button buttonColor={Colors.Ash} onPress={() => navigation.navigate('UpdateBook', {id: book.id,})} >Update</Button>
                    <Button buttonColor={Colors.Orange} onPress={() =>  createTwoButtonAlert(book.id,book.image)}>Delete</Button>
                </Card.Actions>
            </Card>
          
           

        );
      })}
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display:"flex",
    backgroundColor: '#FFF',
    padding:25,
    height:'100%',
    marginBottom:100,
    paddingBottom:100,

  },
  uppercontainer:{
    margin:10,
  },
  txtStyle: {
    color:'#FF0000',
    fontSize:18,
    fontWeight:"bold",
    marginTop:10,
  },
  txtInputSyl: {
    width:'100%',
    borderColor:'#09B44D',
    selectionColor:'#09B44D',
    marginTop:15,
  },
  
  txtInputSylD: {
    width:'100%',
    borderColor:'#09B44D',
    selectionColor:'#09B44D',
    marginTop:15,
    height:200,
  },
  logoStyle: {
    width: 100,
    height: 125,
  },
  startBtn: {
    marginTop:25,
    width:'100%'
  },
  dltBtn:{
    backgroundColor:Colors.Orange,
  },
});
