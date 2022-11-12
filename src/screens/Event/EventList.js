import { StyleSheet, View,ScrollView  } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import * as React from 'react';
import { db } from '../../component/firestore';
import { firebase } from '../../component/fireStoreConfig'; 

import {
    collection,
    getDocs,
    doc,
  } from "firebase/firestore";


export default function EventList({ navigation }) {

    const eventsCollectionRef = collection(db, "events");

    const [events, setEvents] = React.useState([]);

    const getEvents = async () => {
      const data = await getDocs(eventsCollectionRef);
      let beforeData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id  }));
      await beforeData.map(async (eData,index) => {
        beforeData[index].image = await getURI(beforeData[index].image);
        if(index == beforeData.length-1){
            setEvents(beforeData);
        }
      });
      
    };

    React.useEffect(() => {
        getEvents();

        const focusHandler = navigation.addListener('focus', () => {
          getEvents();
        });
    },[navigation]);

    async function getURI(img){
        let imgsep = img.split("/")[1];
        var imageUrl = await firebase.storage().ref("events/").child(imgsep).getDownloadURL();
        return imageUrl;
    }

  return (
    <ScrollView>

    <View style={styles.container}>
    {events.map((event) =>{
        return(
            <Card style={{marginTop:15,backgroundColor:'#0b517a',color:'#fff'}} key={event.id}>
                <Card.Cover source={{ uri: event.image }} />
                <Card.Content>
                    <Title style={{color:'#fff'}}>{event.eventName}</Title>
                    <Paragraph style={{color:'#fff'}}>{event.desc}</Paragraph>
                </Card.Content>
            </Card>
        );
      })}
    </View>
    </ScrollView>

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
