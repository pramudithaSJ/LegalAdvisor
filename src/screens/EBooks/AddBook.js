import { StyleSheet, View, Text,Image, ScrollView,TouchableOpacity } from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import * as React from 'react';
import { firebase } from '../../component/fireStoreConfig'; 
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../assets/color';
import * as DocumentPicker from 'expo-document-picker';

export default function AddBook({ navigation }) {

    const [title, setTitle] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [desc, setDesc] = React.useState(null);
    const [image, setImage] = React.useState(null);
    const [blobFile, setBlobFile] = React.useState(null);
    const [fileDoc, setFileName] = React.useState('no files');
    const [keyWords, setKeyWord] = React.useState("");

    const ref = firebase.firestore().collection('books');

    async function insertBook(){

      const res = await fetch(image);
      const blob = await res.blob()
      const filename = image.substring(image.lastIndexOf('/') + 1);

      if(title == null || desc == null ||name==null || image == null || blobFile== null){
        alert("Please fill completed form!");
        return 0;
      }



      const task = await firebase.storage().ref('books/').child(filename).put(blob);
      const uploadFile=firebase.storage().ref('myDocs/').child(fileDoc).put(blobFile)

      const data = {
        bookName:title,
        author:name,
        description:desc,
        keywords:keyWords,
        image:"books/"+image.split("/")[image.split("/").length-1],
        fileName:fileDoc,
        uid:"Pramuditha"
      }
      ref.add(data)
      .then(() => {
        navigation.navigate("MyBooks");
        alert("Book has been Published!");
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


  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({})
if (result != null) {
      const r = await fetch(result.uri);
      const b = await r.blob();
      setFileName(result.name)
      setBlobFile(b)
      //setIsChoosed(true) 
    }
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
       placeholder="Enter Your Book Title Here"
       onChangeText={title => setTitle(title)}
        autoCorrect={false}
     />
     <Text style={{fontWeight:'bold', fontSize:15,marginBottom:10,}}>
            Author Name
      </Text>
     <TextInput
       style={styles.textInput}
       placeholder="Enter Your Name Here"
       onChangeText={name => setName(name)}
        autoCorrect={false}
     />
     
     <Image source={{uri:image}} style={{width:100,height:100,marginLeft:80,}}/>
        <TouchableOpacity
              onPress={pickImage}
              style={styles.Photobutton}
          >
        <Image source={require('../../../assets/splash.png')} style={{width:40,height:40,borderRadius:1000}}/>
         <Text style={{fontSize:15,color:Colors.white}}>Add a cover photo</Text>
          </TouchableOpacity>
          
     
     <Text style={{fontWeight:'bold', fontSize:15,marginBottom:10,}}> Short Description</Text>
      <TextInput
      style={styles.textArea}
      placeholder=" Describe  your book here"
      onChangeText={decs => setDesc(decs)}
      autoCorrect={false}
      />

    <TextInput
      style={styles.textInput}
      value={fileDoc}
      />
      <TouchableOpacity
            onPress={pickDocument}
              style={styles.Photobutton}
      >
      <Image source={require('../../../assets/splash.png')} style={{width:40,height:40,borderRadius:1000}}/>
      <Text style={{fontSize:15,color:Colors.white}}>Attach your file here</Text>
      </TouchableOpacity>


      <Text style={{fontWeight:'bold', fontSize:15,marginBottom:10,}}>
         Key Words
      </Text>
      <TextInput
          style={styles.textArea2}
          placeholder=" Add some key words here"
          onChangeText={keyWords => setKeyWord(keyWords)}
          autoCorrect={false}
      />
    

    </View>
          <TouchableOpacity
              icon="plus"
              onPress={() => insertBook()}
              style={styles.button}
          >
         <Text style={{fontWeight:'bold', fontSize:22,color:Colors.white}}>Publish New E-Book</Text>
         
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
        marginBottom:100,
        paddingBottom:100,
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
