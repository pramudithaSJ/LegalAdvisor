import {View,Text,FlatList,StyleSheet,TextInput,TouchableOpacity,Keyboard,Pressable} from 'react-native'
import React, {useState,useEffect} from 'react'
import {firebase} from '../../component/fireStoreConfig';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../../assets/color';

// import {FontAwesome} from '@expo/vector-icons';
// import { withSafeAreaInsets } from 'react-native-safe-area-context';


const AddIssue = () => {
    
    const [todos, setTodos] = useState([]); 
    const ref = firebase.firestore().collection('issues');
    const [addData,setAddData] = useState('');
    const navigation = useNavigation();



        //add a issue
        const addIssue = () => {
            //check if we have a todo
            if(addData && addData.length > 0){
            //get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading:addData,
                createdAt:timestamp
            };
            ref
                .add(data)
                .then(() => {
                    setAddData('');
                    navigation.navigate('MyIssues')
                    //release Keyboard
                     Keyboard.dismiss();
                    
                })
                .catch((error) => {
                    alert(error);
                })
            }
        }
  

    return (
        <View style={{flex:1}}>
         

          <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                placeholder = 'Add A New Issue'
                placeholderTextColor='#aaaaaa'
                onChangeText={(heading) => setAddData(heading)}
                value={addData}
                underlineColorAndroid='transparent'
                autoCapitalize="none"
                />
                {/* <TouchableOpacity style={styles.button} onPress={addToDo}>
                    <Text styles={styles.buttonText}>Add</Text>
                </TouchableOpacity> */}
                
          </View>
        <Pressable
                style={styles.buttonUpdate}
                onPress={() => {addIssue()}}
              >
                <Text styles={styles.buttonText}>Add Issue</Text>
              </Pressable> 
      </View>

    )
}

export default AddIssue;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#e5e5e5',
        padding:15,
        
        margin:5,
        marginHorizontal:10,
        //  marginTop:20,
        flexDirection:'row',
        alignItems:'center',
    },
    innerContainer:{
      AlignItems:'center',
      flexDirection:'column',
      marginLeft:65,
      marginTop:-20,
    },
    itemHeading:{
      fontWeight:'bold',
      fontSize:18,
      marginRight:22,
    //   marginTop:20,
    },
    formContainer:{
      flexDirection:'row',
      height:80,
      marginLeft:10,
      marginRight:10,
      marginTop:20,
      marginBottom:10,
    },
    input:{
      height:100,
      width:350,
      borderRadius:5,
      overflow:'hidden',
      backgroundColor:'white',
      paddingLeft:26,
      marginTop:30,
      marginBottom:20,
        // flex:1,
    //   marginRight:5,
      marginLeft:5,
      paddingTop:10,
      fontSize:22
    
      
    },
    button:{
      height:47,
      borderRadius:5,
      backgroundColor:Colors.Orange,
      width:80,
      alignItems:'center',
      justifyContent:'center',
      marginTop:150,
      marginRight:100
    },
    buttonText:{
      color: Colors.Ash,
      fontSize:20
    },
    todoIcon:{
       marginTop:15,
      fontSize:20,
      marginLeft:15,
      backgroundColor:'#e5e5e5',
      marginRight:15,
      padding:4,
      
    //   paddingTop:10
      
    },
    buttonUpdate :{
        marginTop:55,
        marginLeft:125,
        alignItems:'center',
        justifyContent:'center',
        width:20,
        height:40,
        borderRadius:4,
        // elevation:10,
        backgroundColor:Colors.Orange,
        width:100,
    },
    addIssue:{
        fontWeight:'bold',
        fontSize:23,
        marginLeft:30,
        marginTop:40,
        paddingLeft:90,
        backgroundColor:Colors.Orange,
        width:320,
        justifyContent:'center',
        height:40,
        borderRadius:10
    },
  
})