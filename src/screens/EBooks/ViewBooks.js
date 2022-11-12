import { StyleSheet, View, Text,Image, ScrollView, SafeAreaView, Touchable, TouchableOpacity,Alert } from 'react-native';
import { Button,TextInput,Card, Title, Paragraph } from 'react-native-paper';
import * as React from 'react';
import { db } from '../../component/firestore';
import { firebase } from '../../component/fireStoreConfig'; 
import Colors from '../../../assets/color';
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
  } from "firebase/firestore";


// create a component
export default function AllBooks ({ navigation }) {


    const booksCollectionRef = collection(db, "books");

    const [books, setBooks] = React.useState([]);

    const getBooks = async () => {
      const data = await getDocs(booksCollectionRef);
      let beforeData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id  }));
      await beforeData.map(async (eData,index) => {
        beforeData[index].image = await getURI(beforeData[index].image);
        if(index == beforeData.length-1){
            setBooks(beforeData);
        }
      });
    };

    React.useEffect(() => {
        getBooks();

        const focusHandler = navigation.addListener('focus', () => {
            getBooks();
        });
    },[navigation]);


    async function getURI(img){
        let imgsep = img.split("/")[1];
        var imageUrl = await firebase.storage().ref("books/").child(imgsep).getDownloadURL();
        return imageUrl;
    }

    







    return (
        <SafeAreaView >
           <ScrollView>
           <View style={styles.container}>
           {books.map((book) =>{
            return(
                

                
                <View style={styles.box}>
                <TouchableOpacity
                onPress={() => navigation.navigate('ViewBook', {id: book.id,})}>
                <Card style={{marginTop:20,backgroundColor:Colors.LightBlue, color:'#fff',paddingBottom:10,}} key={book.id}>
                <Card.Cover style={{padding:20,}} source={{ uri: book.image }} />
                    <Card.Content>
                    <Title style={{color:Colors.white,fontSize:15,fontWeight:'bold',textAlign:"center"}}>{book.bookName}</Title>
                    </Card.Content>
                </Card>
                </TouchableOpacity>
                </View>
            
     
       
            );
           })}
            </View>
            </ScrollView>

      
             

        </SafeAreaView>
      
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width:"100%",
        flexDirection: "row",
        flexWrap:"wrap",
        padding:20,
        marginBottom:200,
    },
    box:{
        height:200,
        width:'50%',
        padding:10,
        borderRadius:10,
    },
    innerBox:{
        flex:1,
        backgroundColor:Colors.Ash,
        alignItems:"center",
        justifyContent:"center"
    },
});

