import { StyleSheet, View, Text,Image, ScrollView, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';
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



export default function MyIssues({ navigation }) {

    const issuesCollectionRef = collection(db, "issues");
    const todoRef = firebase.firestore().collection('issues');
    const [issues, setIssues] = React.useState([]);

    const getIssues = async () => {
      const data = await getDocs(issuesCollectionRef);
      setIssues(data.docs.map((doc) => ({ ...doc.data(), id: doc.id  })));
    };

    React.useEffect(() => {
        getIssues();

        const focusHandler = navigation.addListener('focus', () => {
            getIssues();
        });
    },[navigation]);
 
    async function deleteIssue(id){
        const docRef = doc(db, "issues", id);
        
        await deleteDoc(docRef).then(() => { 
         
          var deleteRef = firebase.firestore().collection('issues');
          deleteRef
                .doc(id)
                .delete()
                .then(() => {
                    //show a successful alert
                    alert("Deleted Successful");
                    getIssues();
                })
                .catch(error => {
                    alert(error);
                })
            
      })
      
    
    }


  return (

<SafeAreaView>
    <View style={styles.uppercontainer}>
    <Button icon="plus" mode="contained" style={{marginTop:10}} buttonColor={Colors.Orange} onPress={()=>navigation.navigate('AddIssue')}>
        Publish New Issue
    </Button>
    </View>

<ScrollView>


    <View style={styles.container}>
    
    {issues.map((issue) =>{
        return(
           
            <Card style={{marginTop:20,backgroundColor:Colors.LightBlue, color:'#fff'}} key={issue.id}>
                <Card.Content>
                    <Title style={{color:Colors.Ash}}>{issue.heading}</Title>
                    
                </Card.Content>
                <Card.Actions>
                    <Button  onPress={() => navigation.navigate('UpdateIssue', {id: issue.id,})} >Update</Button>
                    <Button  onPress={() =>  deleteIssue(issue.id)}>Delete</Button>
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

  },
  uppercontainer:{
    margin:20,
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









