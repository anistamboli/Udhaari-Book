//React Native Imports
import React, {useState , useEffect, useCallback}                                                      from 'react'
import { SearchBar }                                                                      from 'react-native-elements';
import { StyleSheet, View, Image, TouchableOpacity, Alert , FlatList, Text} from 'react-native';

//React Native Navigation Imports
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


// import logout_button from '../../assets/logout_button.png'; 
import { AntDesign } from '@expo/vector-icons';


const Vendor_dashboard = () =>{
 
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [consumers , setConsumers] = useState([]);
  const [filteredConsumers, setFilteredConsumers] = useState([]);

  const [vRMN, setvRMN] = useState();
  // const [cRMN, setcRMN] = useState(12);

  const SampleFunction=()=>{
    navigation.navigate('Add Consumer');
  }

  async function SaveConsumerContact(value) {
    await SecureStore.setItemAsync('consumerContact', value);
  }
  
  async function getValueFor() {
    let vRMN = await SecureStore.getItemAsync('vendorContact');
    setvRMN(vRMN);   
    // const cRMN=12;

    fetch('http://localhost:5000/Vendor_dashboard/'+vRMN)
    .then((response) => response.json())
    .then((result) => {
        setConsumers(result);
        setFilteredConsumers(result);
      })
      .catch((error) => {
        console.error(error);
      }); 
     
  }

  // useEffect(() => { 
  //   getValueFor();  
  //   },[]);  

  useFocusEffect(
    useCallback(() => {
      getValueFor();  
    }, [])
  );


  const searchFilterFunction = (text) => {
    if (text) {
      const newData = consumers.filter(function (item) {
        var itemData;
        if(isNaN(text)){
          itemData = item.consumer_name
          ? item.consumer_name.toUpperCase()
          : ''.toUpperCase();
        }
        else{
          itemData = item.consumer_contact
          ? item.consumer_contact.toUpperCase()
          : ''.toUpperCase();
        }        
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredConsumers(newData);    
      setSearch(text);
    } 
    else {
      setFilteredConsumers(consumers);
      setSearch(text);
    }
  }

    
  return (
    <SafeAreaView style={{ flex: 1 , paddingTop:'11%', height:'100%', width:'100%', backgroundColor:'#EAF2F4'}}>
        <View style={{widht:'100%', flexDirection:'row', alignItems:'center', paddingTop:'2%',paddingBottom:'1%', backgroundColor:'#EAF2F4'}}>
          <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Vendor Dashboard');}} style={{width:'15%', paddingLeft:'4%', alignItems:'flex-start'}}> 
            {/* <Image source={back_button} style={styles.back_button} /> */}
            <AntDesign name="home" size={39} color="black" />
          </TouchableOpacity>        
          <Text style={{textAlign:'center', fontWeight:'bold', fontSize:25, color:'rgb(88, 149, 164)', width:'70%'}}>अब उधारी ले, विश्वास से!</Text> 
          <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Vendor Login');}} style={{width:'15%',paddingRight:'4%', alignItems:'flex-end'}}> 
            {/* <Image source={logout_button} style={styles.logout_button} /> */}
            <AntDesign name="logout" size={32} color="black" />
          </TouchableOpacity>   
        </View>
        <View style={{widht:'100%', alignItems:'center', paddingTop:'1%'}}>
          <SearchBar 
          inputStyle={{width:'100%', backgroundColor:'white', borderRadius: 25}}
          containerStyle={{width:'90%', backgroundColor: 'white', borderWidth: 1, borderRadius: 40}}
          inputContainerStyle={{width:'100%', backgroundColor: 'white', borderRadius: 40, height:35}}
          backgroundColor = {'white'}
          placeholderTextColor = 'black'
          platform='lightTheme'
          fontSize= {15}
          placeholder="   Consumer Name or Number....."
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}          
          />              
         
        </View>
        <View style = {styles.body}>
          <View style = {styles.listWrapper1}>
              <Text style = {styles.row1}>Name </Text>
              <Text style = {styles.row1}>Contact </Text>
          </View>
          <FlatList 
          data = {filteredConsumers}
          renderItem = {({ item }) => {
            return(
              <View style = {styles.listWrapper}>
                <Text style = {styles.row} 
                onPress = {() => { 
                  SaveConsumerContact(item.consumer_contact) 
                  navigation.navigate('Vendor_navTab', {screen : 'Account Details'})
                }}>
                  {item.consumer_name} 
                </Text>
                <Text style = {styles.row}
                onPress = {() => {
                  SaveConsumerContact(item.consumer_contact) 
                  navigation.navigate('Vendor_navTab', {screen : 'Account Details'})
                }}>
                  {item.consumer_contact}
                </Text>
              </View>
            )
          }}/>
        </View>         
        <View style={styles.MainContainer}>
          <TouchableOpacity activeOpacity={1.5} onPress = {() => SampleFunction() } style={styles.TouchableOpacityStyle} >
            <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} style={styles.FloatingButtonStyle}/>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}


  const styles = StyleSheet.create({
 
    MainContainer: {
      position:'absolute',
      // flex: 1,
      // backgroundColor:'red',
      // width: '100%',
      // height:'100%',
      // justifyContent: 'flex-end',
      // alignItems: 'stretch',
      marginTop:'130%',
      marginLeft:'80%'
    },
   
    TouchableOpacityStyle:{
   
      // position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: '10%',
      bottom: '8%',
      flex: 1,
    },
   
    FloatingButtonStyle: {
   
      resizeMode: 'contain',
      width: 70,
      height: 70,
    },

    body: {
      backgroundColor : '#EAF2F4',
      // borderWidth:2,
      borderRadius:15,
      flex : 1,
      marginTop: '5%',
      marginBottom:'2%',
      height: '100%',
      width: '96%',
      marginHorizontal:'2%',
      backgroundColor:'white'
    },
    listWrapper : {
      flexDirection : 'row',
      justifyContent: 'center',
      alignItems:'center',
      flexWrap : 'wrap',
      borderBottomWidth : 0.5,
      borderStartColor: 'gray'

    },
    listWrapper1 : {
      flexDirection : 'row',
      justifyContent: 'center',
      alignItems:'center',
      flexWrap : 'wrap',
      borderBottomWidth : 2,

    },
    row: {
      //backgroundColor : '#fff',
      flex : 1,
      fontSize : 15,
      fontWeight:'bold',
      color:'#484848',
      paddingHorizontal : 45,
      paddingVertical : 15
    },
    row1: {
      //backgroundColor : '#fff',
      flex : 1,
      fontSize : 18,
      fontWeight:'bold',
      color:'#484848',
      fontStyle:'italic' ,
      paddingHorizontal : 45,
      paddingVertical : 15,
    }
  });

export default Vendor_dashboard;