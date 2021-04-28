//React Native Imports
import React, { useState, useEffect, useCallback}                                                                from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, TouchableOpacity,ToastAndroid, ScrollView } from 'react-native';
import { SearchBar }                                                                      from 'react-native-elements';
import DateTimePickerModal                                                                from "react-native-modal-datetime-picker";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


//ExpoImports
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';

const Add_consumer = () => {
  
  const [user, setUser] = useState('Name');
  const [address, setAddress] = useState('Address');
  const [threshold,setThreshold] = useState('');
  const [tempstart, setTempStart] = useState('Start Date');
  const [start, setStart] = useState('');    
  const [tempdue, setTempDue] = useState('Due Date');
  const [due, setDue] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibledue, setDatePickerVisibilitydue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(''); 
  const [consumers , setConsumers] = useState([]);
  const [filteredConsumers, setFilteredConsumers] = useState([]);

  const [vRMN, setvRMN] = useState();
  const navigation = useNavigation();

  async function GetVendorContact(){
    let vRMN = await SecureStore.getItemAsync('vendorContact')
    setvRMN(vRMN)
  }

  const GetDetails = () => {
    setUser('Name');
    setAddress('Address');
    setThreshold('');
    setTempStart('Start Date');
    setStart('');    
    setTempDue('Due Date');
    setDue('');
    setSearch('');
    fetch('http://localhost:5000/contact')
    .then((response) => response.json())
    .then((result) => {
      setConsumers(result);
      setFilteredConsumers(result);
    })
    .catch((error) => {
      console.error(error);
    }); 
  }
      
      
  // useEffect(()=>{
  //   GetDetails()  
  //   GetVendorContact()
  // },[])  

  useFocusEffect(
    useCallback(() => {
      GetDetails()
      GetVendorContact() 
    }, [])
  );

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = consumers.filter(function (item) {
        var itemData;
        itemData = item.contact
        ? item.contact.toUpperCase()
        : ''.toUpperCase();      
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredConsumers(newData);    
      setSearch(text);
      setIsLoading(true);
    } 
    else {
      setFilteredConsumers(consumers);
      setSearch(text);
      setIsLoading(false);
    }
  }

      
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
      
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
      
      
  const handleConfirm = (date) => {
    setStart(date);
    setTempStart(date.toDateString());
    hideDatePicker();
  };


  const showDatePickerdue = () => {
    setDatePickerVisibilitydue(true);
  };
        
  
  const hideDatePickerdue = () => {
    setDatePickerVisibilitydue(false);
  };
        
          
  const handleConfirmdue = (date) => {
    setDue(date);
    setTempDue(date.toDateString());
    hideDatePickerdue();
  };
      

  const onPressConsumer = async (vRMN) => {

    if(user=='Name' || address=='Address'){
      //alert('Search A Consumer');
      ToastAndroid.showWithGravity(
        "Search A Consumer",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
    else if( threshold==''){
     // alert('Threshold Missing')
     ToastAndroid.showWithGravity(
      "Threshold Missing!!!",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    }
    else if(threshold<0 || threshold>1){
     // alert('Threshold must be a value between 0-1');
     ToastAndroid.showWithGravity(
      "Threshold must be a value between 0-1",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    }
    else if(start==''){
     // alert('Start Date Missing');
     ToastAndroid.showWithGravity(
      "Start Date Missing",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    }
    else if(due==''){
      //alert('Due Date Missing');
      ToastAndroid.showWithGravity(
        "Due Date Missing",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
    else{
      try{                          
        const body = {vendor_contact:vRMN , consumer_contact: Number(search), threshold:Number(threshold), start_date:start , due_date:due , balance:0 , billing_start_date:start , consumer_name:user};
        const response = await fetch('http://localhost:5000/Add_consumer', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/JSON'
          },
          body: JSON.stringify(body)      
        });
        const result = await response.json();
        if (result.success===true) {
          navigation.navigate('Vendor Dashboard')
        }
       // alert(result.message);
       ToastAndroid.showWithGravity(
        result.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
        GetDetails();
      }
      catch(err){
        console.error(err.message);
      }
    }       
  }


  return(
    <SafeAreaView style={{height:'100%', width:'100%'}}>
      <View style ={styles.container}>
        <Text style={{color: 'black', fontSize: 23, fontWeight:'bold', paddingBottom:'7%'}}>Add New Udhaari</Text>
        <StatusBar style='auto'/>
        <View style={styles.MainContainer}>
          <SearchBar 
          inputStyle={{width:'100%', backgroundColor:'white', borderRadius: 25}}
          containerStyle={{width:'100%', backgroundColor: 'white', borderWidth: 1, borderRadius: 40}}
          inputContainerStyle={{width:'100%', backgroundColor: 'white',marginLeft:'2%', borderRadius: 40, height:35}}
          backgroundColor = {'white'}
          placeholderTextColor = 'black'
          placeholder="  Enter Contact Number"
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}          
          />   
        </View>
        {isLoading
          ?<View style = {{width:'80%',height:'100%'}}>
            <FlatList 
            data = {filteredConsumers}
            renderItem = {({ item }) => {
              return(
                <View style = {{flexDirection : 'row', flexWrap : 'wrap', borderBottomWidth : 0.5, width:'70%', alignSelf:'center', textAlign:'center'}}>
                  {  
                    <Text style = {{flex : 1, fontSize : 17, textAlign:'center', paddingTop:'7%'}} onPress = {() => { 
                      setSearch(item.contact); 
                      setUser(item.name);
                      setAddress(item.address);
                      setIsLoading(false);
                    }}>                
                      {item.contact} 
                    </Text>
                  }                
                </View>
              )
            }}/>
          </View>
          :<Text></Text>
        }
        <View style={styles.inputView}>
          {
            search!=('')
            ?<Text style={{color: 'black', textAlign:'center', fontSize:16}}>{user}</Text>
            :<Text style={{color: 'black', fontSize:16}}>Name</Text>
          }
        </View>            
        <View style={styles.inputView}>
          {
            search!=('')
            ?<Text style={{color: 'black', textAlign:'center', fontSize:14}}>{address}</Text>
            :<Text style={{color: 'black', fontSize:16}}>Address</Text>
          }
        </View>
        <View style={styles.inputView}>
        {
          search==('')
          ?<Text style={{color: 'black', fontSize:16}}>Threshold</Text>
          :<TextInput
          style={styles.TextInput}
          placeholder='Threshold'
          placeholderTextColor='black'
          keyboardType='numeric'
          maxLength={4}
          textAlign='center'
          color='black'
          onChangeText={(threshold) => setThreshold(threshold)}
          />
        }  
        </View>
        <View style={styles.inputView}>                  
          <Text onPress={showDatePicker} style={{color: 'black', fontSize:16}}>{tempstart}</Text>
          <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"                            
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          />
        </View>
        <View style={styles.inputView}>
          <Text onPress={showDatePickerdue} style={{color: 'black', fontSize:16}}>{tempdue}</Text>
          <DateTimePickerModal
          isVisible={isDatePickerVisibledue}
          mode="date"
          onConfirm={handleConfirmdue}
          onCancel={hideDatePickerdue}
          />                   
        </View>         
        <TouchableOpacity style={styles.Btn} onPress={() => {onPressConsumer(vRMN)}}>
          <Text style={styles.txt}>Add Consumer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({  
  container: {
    flex: 1,
    paddingTop :'10%',
    backgroundColor: '#edf7fc',
    alignItems: 'center',
    // justifyContent: 'center',
    height:'100%',
    width:'100%', 
  },
   
  txt: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
   
  inputView: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    width: '70%',
    height: '6%',
    marginBottom: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    color:'black',
    // fontSize: 19,
  },
   
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
   
  forgot_button: {
    height: 30,
  },
   
  Btn: {
    padding: '4%',
    marginTop:'20%',
    borderRadius: 5,
    width: '70%',
    backgroundColor: '#f55864'
  },
  
  MainContainer:{
    width:'80%',
    // marginTop:'2%',
    marginBottom:'5%'
  },

  listWrapper : {
    flexDirection : 'row',
    flexWrap : 'wrap',
    borderBottomWidth : 1
  },

  row: {
    flex : 1,
    fontSize : 15,
    // paddingHorizontal : 45,
    // paddingVertical : 15
  },

  datebuttons:{
    width:'5%',
    height:'5%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    elevation:3,
  }
  
});


export default Add_consumer;