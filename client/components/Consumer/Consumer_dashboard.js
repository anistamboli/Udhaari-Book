//React Native Imports
import React, {useState , useEffect, useCallback}                                                      from 'react'
import { SearchBar }                                                                      from 'react-native-elements';
import { StyleSheet, View, Image, TouchableOpacity, Alert , FlatList, Text} from 'react-native';

//React Native Navigation Imports
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { AntDesign } from '@expo/vector-icons';

const Consumer_dashboard = () =>{

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [vendors , setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);

  const [cRMN, setcRMN] = useState();

  async function SaveVendorContact(value) {
    await SecureStore.setItemAsync('vendorMob', value);
  }
  
  async function getValueFor() {
    let cRMN = await SecureStore.getItemAsync('consumerMob');
    setcRMN(cRMN);   
    // const cRMN=12;
    fetch('http://localhost:5000/Consumer_dashboard/'+cRMN)
    .then((response) => response.json())
    .then((result) => {
        setVendors(result);
        setFilteredVendors(result);
      })
      .catch((error) => {
        console.error(error);
      }); 
  }


  // useEffect(() => {
  //   getValueFor()
  // },[]);

  useFocusEffect(
    useCallback(() => {
      // alert('Screen was focused');
      getValueFor();  
    }, [])
  );


  const searchFilterFunction = (text) => {
    if (text) {
      const newData = vendors.filter(function (item) {
        var itemData;
        if(isNaN(text)){
          itemData = item.shop_name
          ? item.shop_name.toUpperCase()
          : ''.toUpperCase();
        }
        else{
          itemData = item.contact
          ? item.contact.toUpperCase()
          : ''.toUpperCase();
        }        
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredVendors(newData);    
      setSearch(text);
    } 
    else {
      setFilteredVendors(vendors);
      setSearch(text);
    }
  }

    
  return (
    <SafeAreaView style={{ flex: 1 , paddingTop:'11%', height:'100%', width:'100%', backgroundColor:'#EAF2F4'}}>
        <View style={{widht:'100%', flexDirection:'row', alignItems:'center', paddingTop:'2%',paddingBottom:'1%', backgroundColor:'#EAF2F4'}}>
          <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Consumer Dashboard');}} style={{width:'15%', paddingLeft:'4%', alignItems:'flex-start'}}> 
              {/* <Image source={back_button} style={styles.back_button} /> */}
              <AntDesign name="home" size={39} color="black" />
          </TouchableOpacity>        
          <Text style={{textAlign:'center', fontWeight:'bold', fontSize:25, color:'rgb(88, 149, 164)', width:'70%'}}>अब उधारी ले, विश्वास से!</Text> 
          <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Consumer Login');}} style={{width:'15%',paddingRight:'4%', alignItems:'flex-end'}}> 
              {/* <Image source={logout_button} style={styles.logout_button} /> */}
              <AntDesign name="logout" size={32} color="black" />
          </TouchableOpacity>   
        </View>
        <View style={{widht:'100%', alignItems:'center', paddingTop:'1%',}}>
          <SearchBar 
          inputStyle={{width:'100%', backgroundColor:'white', borderRadius: 25}}
          containerStyle={{width:'90%', backgroundColor: 'white', borderWidth: 1, borderRadius: 40}}
          inputContainerStyle={{width:'100%', backgroundColor: 'white', borderRadius: 40, height:35}}
          backgroundColor = {'white'}
          placeholderTextColor = 'black'
          platform='lightTheme'
          fontSize= {16}
          placeholder="          Shop Name or Contact "
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}          
          />       
         
        </View>       
        <View style = {styles.body}>
          <View style = {styles.listWrapper1}>
              <Text style = {styles.row1}>Shop Name </Text>
              <Text style = {styles.row1}>Udhaari</Text>
            </View>
          <FlatList 
          data = {filteredVendors}
          renderItem = {({ item }) => {
            return(
              <View style = {styles.listWrapper}>
                <TouchableOpacity style={{flexDirection:'column', alignItems:'flex-start', width:'60%', paddingHorizontal:'5%',}}>
                <Text style = {styles.row}
                onPress = {() => { 
                  SaveVendorContact(item.contact) 
                  navigation.navigate('Consumer_navTab', {screen : 'My Udhaari'})
                }}>
                  {item.shop_name}
                </Text>
                <Text style = {{fontSize:15}}
                onPress = {() => { 
                  SaveVendorContact(item.contact) 
                  navigation.navigate('Consumer_navTab', {screen : 'My Udhaari'})
                }}>
                  {item.contact}
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'40%', paddingLeft:'3%'}}>
                <Text style = {styles.row}
                onPress = {() => { 
                  SaveVendorContact(item.contact) 
                  navigation.navigate('Consumer_navTab', {screen : 'My Udhaari'})
                }}>
                  ₹ {item.balance}
                </Text>
                </TouchableOpacity>
              </View>
            )
          }}/>
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
      marginTop:'180%',
      marginLeft:'80%'
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
      paddingVertical:'2%'

    },
    listWrapper1 : {
      flexDirection : 'row',
      justifyContent: 'flex-start',
      alignItems:'flex-start',
      flexWrap : 'wrap',
      borderBottomWidth : 1.5,

    },
    row: {
      //backgroundColor : '#fff',
      flex : 1,
      fontSize : 15,
      fontWeight:'bold',
      // paddingHorizontal : 45,
      // paddingVertical : 15
    },
    row1: {
      //backgroundColor : '#fff',
      flex : 1,
      fontSize : 17,
      fontWeight:'bold',
      color:'#484848',
      fontStyle:'italic',
      paddingHorizontal : 45,
      paddingVertical : 15,
    }
 

  });
export default Consumer_dashboard;