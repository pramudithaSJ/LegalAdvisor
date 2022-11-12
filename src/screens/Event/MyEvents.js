import { StyleSheet, View, Text,Image } from 'react-native';
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


export default function MyEvents({ navigation }) {

    const eventsCollectionRef = collection(db, "events");

    const [events, setEvents] = React.useState([]);

    const getEvents = async () => {
      const data = await getDocs(eventsCollectionRef);
      setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id  })));
    };

    React.useEffect(() => {
        getEvents();

        const focusHandler = navigation.addListener('focus', () => {
          getEvents();
        });
    },[navigation]);
    
    async function deleteEvent(id,image){
      const docRef = doc(db, "events", id);
      
      await deleteDoc(docRef).then(() => { 
        const img = image.split("/");
        var deleteRef = firebase.storage().ref('events/').child(img[1]);
        deleteRef.delete().then(function() {
          alert("Event Deleted!");
          getEvents();
        }).catch(function(error) {
          alert("Error file delete!")
        });
       }) 
       .catch(error => { 
        console.log(error); 
      })

    }


  return (
    <View style={styles.container}>
      
    <Button icon="plus" mode="contained" style={{marginTop:10}} buttonColor='#B94141' onPress={()=>navigation.navigate('AddEvent')}>
        Add new event
    </Button>

    

    {events.map((event) =>{
        return(
            <Card style={{marginTop:15,backgroundColor:'#0b517a',color:'#fff'}} key={event.id}>
                <Card.Content>
                    <Title style={{color:'#fff'}}>{event.eventName}</Title>
                    <Paragraph style={{color:'#fff'}}>{event.desc}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button mode='contained' onPress={() => navigation.navigate('UpdateEvent', {
                      id: event.id,})} >Update</Button>
                    <Button onPress={() => deleteEvent(event.id,event.image)}>Delete</Button>
                </Card.Actions>
            </Card>

        );
      })}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding:25,
    height:'100%',
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
});
