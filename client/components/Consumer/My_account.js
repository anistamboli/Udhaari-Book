//React Native Imports
import 'react-native-gesture-handler';
import React, { useState, useEffect}                                           from 'react';
import { FlatList,StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

//Expo Imports
import { Entypo } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

// import { response } from 'express';

import axios from 'axios';

// const promise = fetchData();
// fetchData = ()=>{

// }

const My_account = () => {  

  const [isLoading, setLoading] = useState(true);
  const [selectedVendor, setselectedVendor] = useState([]);
  
  const [name, setName] = useState();
  const [threshold, setThreshold] = useState();

  const today = new Date();
  const [due, setDue]= useState(today);
  const [recentPayment, setRecentPayment] = useState();

  const [vRMN, setvRMN] = useState();
  const [cRMN, setcRMN] = useState();
  const navigation = useNavigation();
  
  async function getValueFor() {
    let vRMN = await SecureStore.getItemAsync('vendorContact');
    let cRMN = await SecureStore.getItemAsync('consumerContact');
    setvRMN(vRMN);
    setcRMN(cRMN);
    // const cRMN=12;
    const response={}
    await fetch('http://localhost:5000/Account_details/'+vRMN+'/'+cRMN)
    .then((response) => response.json())
    .then((result) => {setselectedVendor(result)
      setDue(new Date(result[0].due_date))
        console.log(due)})
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }

  const pymnt = axios.get('http://localhost:5000/Payment_history', {params:{
    vRMN, cRMN }})
    .then((pymnt)=> {
      setRecentPayment(pymnt.data[0].payed_amount)           
    })  
    .catch((error)=>{
      console.log(error)
    })  

  useEffect(() => {
    getValueFor();
    // const response= await fetch('http://localhost:5000/Account_details/'+vRMN+'/'+cRMN)
    // .then((response) => response.json())
    // .then((result) => setselectedVendor(result))
    // .catch((error) => console.error(error))
    // .finally(() => setLoading(false));

  },[]);


  const DeleteAccount = () =>{
    // var vRMN =432424234;
    // var cRMN =3333333444;
    // alert(vendorContact);
    alert("DELETE");
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete the account?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            // alert(selectedVendor[0].contact);
            // var cRMN=selectedVendor[0].contact;
            alert(typeof(cRMN));
            const response = await fetch('http://localhost:5000/Account_details/'+vRMN+'/'+cRMN, { method: 'DELETE' });
            const result = await response.json()
            if(result.success===true) {
              navigation.navigate('Vendor Dashboard')}
            alert(result.message);
            // navigation.navigate('NavStack', {screen : 'Vendor_dashboard'})
          }
        },
        {
          text: 'No',
          style: "Cancel"
        }
      ]
    );
  }


  const EditNameThreshold = async () =>{

    if(typeof(name)==='string' || typeof(threshold)==='string'){
      // var cRMN = selectedVendor[0].contact;
      if(typeof(name)==='string'){
        // var updatedName = name;
        try{      
          const body = {updatingValue:name};
          const response = await fetch('http://localhost:5000/Account_details/'+vRMN+'/'+cRMN, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/JSON'},
              body: JSON.stringify(body)      
          });
          const result = await response.json();
          // JSON.stringify(result);
          // console.log(result);
          alert(result.message);
        }
        catch(err){
          console.error(err.message);
        }
      }
      if(typeof(threshold)==='string'){
        var updatedThreshold = Number(threshold);
        if(updatedThreshold<0 || updatedThreshold>10){
          alert('Threshold must be a value between 0-1');
        }
        else{
          try{      
            const body = {updatingValue:updatedThreshold};
            const response = await fetch('http://localhost:5000/Account_details/'+vRMN+'/'+cRMN, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/JSON'},
                body: JSON.stringify(body)      
            });
            const result = await response.json();
            // JSON.stringify(result);
            // console.log(result);
            alert(result.message);
          }
          catch(err){
            console.error(err.message);
          }
        }
      }
    }
    else{
      alert('You have not made any changes');
    }
  }


  return (      
    <View style={{ flex: 1, padding: 24, backgroundColor:'#EAF2F4' }}>
      {isLoading ? <Text>Loading...</Text> : (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between', paddingTop:'3%'}}>  
          <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column', width:'50%'}}>
              <Text style={{fontWeight:'bold', fontSize:16, }}>Address:</Text>
              <Text >{selectedVendor[0].address}</Text>
            </View>
            <View style={{width:'50%'}}>
            { (due.getTime() + 5*24*60*60*1000) > (today.getTime()) ? 
              <Text style={{textAlign:'center',fontWeight:'bold',padding: 10, borderRadius: 5, width: '50%',  backgroundColor: '#B2EBE0', borderWidth:1, borderColor:'green', alignSelf:'flex-end'}}>Active</Text>: 
              <Text style={{textAlign:'center',fontWeight:'bold',padding: 10, borderRadius: 5, width: '50%', backgroundColor: '#F5E2E4', borderWidth:1, borderColor:'red', alignSelf:'flex-end'}}>Blocked</Text>
            }   
            </View>
          </View>          
            <View style={{backgroundColor:'white', marginTop:'10%',height:'7%', width:'60%' ,borderWidth: 1, borderColor:'orange',borderRadius:40, justifyContent:'center', alignItems:'center',alignSelf:'center'}}>
                <Text style={{ fontSize: 18, color: 'green'}}>{selectedVendor[0].consumer_name}</Text>
            </View>

          <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingVertical: '2%'}}>{vRMN}</Text>                  
          <FlatList style={{paddingHorizontal:'4%', marginTop:'4%',marginBottom:'30%', width:'100%', backgroundColor:'white',borderColor:'orange', borderWidth:1, borderRadius:30}}
          data = {selectedVendor}
          renderItem = {({item}) => {
            return(
              <View style={{flexDirection:'column', marginTop:'10%', height:'100%', width:'100%'}}>
                <View style={{flexDirection:'row', width:'100%',marginTop:'3%'}}>
                  <View style={{width:'50%'}}>
                    <Text style={{fontWeight:'bold'}}>Threshold</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    <Text>{item.threshold}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', width:'100%',marginTop:'5%'}}>
                  <View style={{width:'50%'}}>
                    <Text style={{fontWeight:'bold'}}>Account Start Date</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    <Text>{new Date(item.start_date).toDateString()}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', width:'100%',marginTop:'5%'}}>
                  <View style={{width:'50%'}}>
                    <Text style={{fontWeight:'bold'}}>Billing Start Date</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    <Text>{new Date(item.billing_start_date).toDateString()}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', width:'100%',marginTop:'5%'}}>
                  <View style={{width:'50%'}}>
                    <Text style={{fontWeight:'bold'}}>Bill Due Date</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    <Text>{new Date(item.due_date).toDateString()}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', width:'100%',marginTop:'5%'}}>
                  <View style={{width:'50%'}}>
                    <Text style={{fontWeight:'bold'}}>Last Paid Amount</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    {recentPayment===undefined || recentPayment===0 || recentPayment===null? 
                    <Text>No Payments Yet</Text>:
                    <Text>₹ {recentPayment}.00</Text>
                    }                   
                  </View> 
                </View>
                <View style={{flexDirection:'row', width:'100%',marginTop:'5%'}}>
                  <View style={{width:'50%'}}>
                    <Text style={{fontWeight:'bold'}}>Total Due Amount</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    <Text>₹ {item.balance}.00</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', width:'100%',marginTop:'5%'}}>
                  <View style={{width:'50%'}}>
                    <Text style={{fontWeight:'bold'}}>Partial  Due Amount</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    <Text>₹ {item.balance*item.threshold}.00</Text>
                  </View>
                </View>
              </View>
            )            
          }}/>   
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  saveChangesButton :{
    alignSelf:'center',
    padding: 10,
    borderRadius: 5, 
    width: '90%', 
    backgroundColor: 'rgb(88, 149, 164)'
  },

  saveChangesText :{
    color:'black',
    fontWeight:'bold',
    textAlign: 'center',
    fontSize: 15
  }
})


export default My_account;