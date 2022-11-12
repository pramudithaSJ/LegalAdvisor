import { StyleSheet, View, Text,Image, SafeAreaView, ScrollView } from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import * as React from 'react';
import { firebase } from '../../component/fireStoreConfig'; 
import * as ImagePicker from 'expo-image-picker';

export default function AddEvent({ navigation }) {

    const [name, setName] = React.useState(null);
    const [desc, setDesc] = React.useState(null);
    const [image, setImage] = React.useState(null);

    const ref = firebase.firestore().collection('events');

    async function insertEvent(){

      if(name == null || desc == null || image == null){
        alert("Please fill completed form!");
        return 0;
      }

      const res = await fetch(image);
      const blob = await res.blob()
      const filename = image.substring(image.lastIndexOf('/') + 1);

      const task = await firebase.storage().ref('events/').child(filename).put(blob);

      const data = {
        eventName:name,
        desc:desc,
        image:"events/"+image.split("/")[image.split("/").length-1],
        uid:"savishka"
      }
      ref.add(data)
      .then(() => {
        alert("Event has been added!");
      })
    }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  return (
    <SafeAreaView>

      <ScrollView>
    <View style={styles.container}>
      
    <Text style={styles.txtStyle}>Event Name</Text>
    
    <TextInput
      style={styles.txtInputSyl}
      label="Enter Event Name"
      value={name}
      mode="flat"
      outlineColor='#09B44D'
      activeOutlineColor='#09B44D'
      onChangeText={name => setName(name)} />

    <Text style={styles.txtStyle}>Image</Text>

    <Button icon="plus" mode="contained" style={{marginTop:10}} buttonColor='#FF0000' onPress={pickImage}>
        Upload Image
    </Button>


    <Text style={styles.txtStyle}>Event Description</Text>

    <TextInput
      style={styles.txtInputSylD}
      label="Enter Event Description"
      multiline
      value={desc}
      mode="flat"
      outlineColor='#09B44D'
      activeOutlineColor='#09B44D'
      onChangeText={desc => setDesc(desc)} />
    <View>
        <Button style={styles.startBtn} mode="contained" buttonColor="#0b517a" onPress={() => insertEvent()}>
            Submit
        </Button>
    </View>

    </View>
    </ScrollView>
    </SafeAreaView>
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
