//React Native Imports
import React, {useState , useEffect}                                                      from 'react'
import { SearchBar }                                                                      from 'react-native-elements';
import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity, Alert , FlatList, Text} from 'react-native';

//React Native Navigation Imports
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import logout_button from '../../assets/logout_button.png'; 



const Vendor_dashboard = () =>{
 
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [consumers , setConsumers] = useState([]);
  const [filteredConsumers, setFilteredConsumers] = useState([]);

  const [vRMN, setvRMN] = useState();
  // const [cRMN, setcRMN] = useState(12);

  const SampleFunction=()=>{
    Alert.alert("Floating Button Clicked");
  }

  async function SaveConsumerContact(value) {
    await SecureStore.setItemAsync('consumerContact', value);
  }
  
  async function getValueFor() {
    let vRMN = await SecureStore.getItemAsync('vendorContact');
    // let cRMN = await SecureStore.getItemAsync('consumerContact');
    setvRMN(vRMN);
    // setcRMN(cRMN);
    
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

  useEffect(() => { 
    getValueFor();  
    },[]);  


  // useEffect(() => {
  //   // var vRMN = val;
  //   // console.log(vRMN);
  //   // fetch('http://localhost:5000/Vendor_dashboard/'+vRMN)
  //   // .then((response) => response.json())
  //   // .then((result) => {
  //   //     setConsumers(result);
  //   //     setFilteredConsumers(result);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error(error);
  //   //   }); 
  // },[]);


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
    <SafeAreaView style={{ flex: 1 , marginTop:'13%', height:'100%', width:'100%'}}>
        <View style={{widht:'100%', flexDirection:'row', alignItems:'center'}}>
          <SearchBar 
          inputStyle={{width:'85%'}}
          containerStyle={{width:'85%'}}
          backgroundColor = {'white'}
          placeholderTextColor = 'green'
          fontSize= {15}
          placeholder="   Consumer Name or Number....."
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}          
          />              
          <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Vendor Login');}} style={{width:'15%'}}> 
            <Image source={logout_button} style={{ width: 60, height: 60, alignSelf:'flex-end', top:0, paddingTop:0}} />
          </TouchableOpacity>
        </View>
        <View style = {styles.body}>
          <View style = {styles.listWrapper}>
              <Text style = {styles.row}>Name </Text>
              <Text style = {styles.row}>Consumer Contact Number</Text>
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
          <TouchableOpacity activeOpacity={1.5} onPress = {() => SampleFunction()} style={styles.TouchableOpacityStyle} >
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
      marginTop:'160%',
      marginLeft:'75%'
    },
   
    TouchableOpacityStyle:{
   
      // position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: '10%',
      bottom: '8%',
      flex: 1
    },
   
    FloatingButtonStyle: {
   
      resizeMode: 'contain',
      width: 70,
      height: 70,
    },

    body: {
      backgroundColor : '#fff',
      flex : 1,
      // marginTop: '5%',
      height: '100%',
      width: '100%'
    },
    listWrapper : {
      flexDirection : 'row',
      justifyContent: 'center',
      alignItems:'center',
      flexWrap : 'wrap',
      borderBottomWidth : 1,

    },
    row: {
      //backgroundColor : '#fff',
      flex : 1,
      fontSize : 15,
      paddingHorizontal : 45,
      paddingVertical : 15
    }
  });

export default Vendor_dashboard;