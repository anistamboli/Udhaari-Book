//React Native Imports
import React, {useState , useEffect, useCallback}                                                      from 'react'
import { SearchBar }                                                                      from 'react-native-elements';
import { StyleSheet, View, Image, TouchableOpacity, Alert , FlatList, Text} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


//React Native Navigation Imports
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

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
          itemData = item.name
          ? item.name.toUpperCase()
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
    <SafeAreaView style={{ flex: 1 }}>
        <View style = {styles.container}>
        <View style={{widht:'100%', flexDirection:'row', alignItems:'center', paddingTop:'11%',paddingBottom:'1%', backgroundColor:'#EAF2F4'}}>
          <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Vendor Dashboard');}} style={{width:'15%', paddingLeft:'3%', alignItems:'flex-start'}}> 
            {/* <Image source={back_button} style={styles.back_button} /> */}
            <AntDesign name="home" size={39} color="black" />
          </TouchableOpacity>        
          <Text style={{textAlign:'center', fontWeight:'bold', fontSize:25, color:'rgb(88, 149, 164)', width:'70%'}}>अब उधारी ले, विश्वास से!</Text> 
          <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Vendor Login');}} style={{width:'15%',paddingRight:'3%', alignItems:'flex-end'}}> 
            {/* <Image source={logout_button} style={styles.logout_button} /> */}
            <AntDesign name="logout" size={32} color="black" />
          </TouchableOpacity>   
        </View>
        <View style={{widht:'100%', flexDirection:'row', alignItems:'center', marginTop:'5%'}}>
          <SearchBar 
          inputStyle={{width:'85%'}}
          containerStyle={{width:'85%'}}
          backgroundColor = {'white'}
          placeholderTextColor = 'green'
          placeholder="Enter Consumer's Name or Contact Number....."
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}          
          />       
          <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Consumer Login');}} style={{width:'15%'}}> 
            {/* <Image source={logout_button} style={{ width: 60, height: 60, alignSelf:'flex-end', top:0, paddingTop:0}} /> */}
            <AntDesign name="logout" size={35} color="white" />
          </TouchableOpacity>
        </View>       
        <View style = {styles.body}>
          <View style = {styles.listWrapper}>
              <Text style = {styles.row}>Name </Text>
              <Text style = {styles.row}>Vendor Contact Number</Text>
            </View>
          <FlatList 
          data = {filteredVendors}
          renderItem = {({ item }) => {
            return(
              <View style = {styles.listWrapper}>
                <Text style = {styles.row}
                onPress = {() => { 
                  SaveVendorContact(item.contact) 
                  navigation.navigate('Consumer_navTab', {screen : 'My Udhaari'})
                }}>
                  {item.name} 
                </Text>
                <Text style = {styles.row}
                onPress = {() => { 
                  SaveVendorContact(item.contact) 
                  navigation.navigate('Consumer_navTab', {screen : 'My Udhaari'})
                }}>
                  {item.contact}
                </Text>
              </View>
            )
          }}/>
        </View>         
      </View>
    </SafeAreaView>
  );
}


  const styles = StyleSheet.create({
 
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
   
    TouchableOpacityStyle:{
   
      position: 'absolute',
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

    container: {
      marginTop: '0%',
      width : '100%',
      height: '100%',
      flex: 1,
      
    },
    body: {
      backgroundColor : '#fff',
      flex : 7
    },
    listWrapper : {
      flexDirection : 'row',
      flexWrap : 'wrap',
      borderBottomWidth : 1
    },
    row: {
    //   backgroundColor : '#fff',
      flex : 1,
      fontSize : 15,
      paddingHorizontal : 45,
      paddingVertical : 15
    }
  });
export default Consumer_dashboard;