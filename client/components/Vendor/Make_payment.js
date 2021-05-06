import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList,Button, StyleSheet, Text, View , TextInput , TouchableOpacity ,ToastAndroid, Alert} from 'react-native';


import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';

import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Make_payment() {

  // const vRMN = route.params.vRMN; 
  // const cRMN = route.params.cRMN; 
  const [isLoading, setLoading] = useState(true);
  
  const [current, setCurrent] = useState(new Date());
  const [newDate , setNewDate] = useState(new Date());
  // setNewDate(current)
  const [amount , setAmount] = useState('');
  const [threshold , setthreshold] = useState('');
  const [vRMN, setvRMN] = useState();
  const [cRMN, setcRMN] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [defaultDate, setDefaultDate] = useState((new Date()).toDateString());  
  const [transactionId, setTransactionId] = useState(0);
  const [onlyDate, setOnlyDate] = useState('');
  const [onlyTime, setOnlyTime] = useState('');


  async function getValueFor() {
    let vRMN = await SecureStore.getItemAsync('vendorContact');
    let cRMN = await SecureStore.getItemAsync('consumerContact');
    setvRMN(vRMN);
    setcRMN(cRMN); 
    setAmount(''); 
    var d = new Date();
    var n = d.getTime();
    setTransactionId(n);
    ShowCurrentDate();
    setDefaultDate((new Date()).toDateString());
    fetch('http://localhost:5000/threshold/'+vRMN+'/'+cRMN)
    .then((response1) => response1.json())
    .then((result1) => setthreshold(result1))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }
 
  // useEffect(() => {
  //   getValueFor();
  // }, []);
 
  useFocusEffect(
    useCallback(() => {
      getValueFor();  
    }, [])
  );


  const ShowCurrentDate = ()=>{
    console.log(new Date());
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var tempOnlyDate = date + '-' + month + '-' + year;
    setOnlyDate(tempOnlyDate);
    console.log(onlyDate);
    var hours = new Date().getHours(); 
    var min = new Date().getMinutes(); 
    var sec = new Date().getSeconds();
    var tempOnlyTime = hours+':'+min+':'+sec;
    setOnlyTime(tempOnlyTime);
    console.log(onlyTime);
  }


   const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
      
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
      
      
  const handleConfirm = (date) => {
    setCurrent(date);
    setDefaultDate(date.toDateString());
    // alert(date);
    
    
    // alert("Result"+result);
    hideDatePicker();

    // setStart(date);
    // var result = new Date(date);
    // result.setDate(result.getDate() + 30);
    // setDue(result);
    // setTempStart(date.toDateString());
    // setTempDue(result.toDateString());
   
  };


   const updatedata = async (remain) => {
    
    try {
    //  alert('aaya');
    var date = current.getDate();
    var month = current.getMonth() + 1;
    var year = current.getFullYear();
    // console.log(current)
    // var resul = new Date(current);
    // resul.setDate(resul.getDate() + 30);
    // setNewDate(resul); 
    var totDays= (new Date(year, month, 0)).getDate()
    var d = new Date()
    d.setDate(current.getDate()+totDays)
    setNewDate(d)
    // console.log('nDate',newDate)

      var tempOnlyDate = year + '-' + month + '-' + date;
      // console.log('current', tempOnlyDate)
      // console.log('due', newDate)
      const body= {due_date :d, balance : Number(remain) , billing_start_date : onlyDate}
      const response = await fetch('http://localhost:5000/updatedata/'+vRMN+'/'+cRMN,{
        method : 'PUT',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/JSON'},
          body : JSON.stringify(body)
        }
      );
      
      const result = await response.json();
    //  alert(result);
     ToastAndroid.showWithGravity(
      result,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );

      // alert("Balance updated successfully.....");
      getValueFor();         
      
    
    }


    catch (err) {
     // alert("catch");
      console.error(err);
      console.log(err);
     
    }

   }
 
      const check = async ()=> {
      var total = threshold[0].balance * threshold[0].threshold;
      // alert( threshold[0].balance);
      // alert(typeof( threshold[0].balance));
      // alert(amount);
      // alert(typeof(amount));
      var remain =  threshold[0].balance - Number(amount)
     
      
      if(!amount.trim()){
        //alert('Please Enter paying amount...')
        ToastAndroid.showWithGravity(
          "Please enter paying amount",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        return 
      }
      if(isNaN(amount)){
        ToastAndroid.showWithGravity(
          "Please Enter Valid paying amount...",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        return 
      }
      if(amount <0){
       // alert('Negative amount is not allowed!!!');
       ToastAndroid.showWithGravity(
        "Negative amount is not allowed!!!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
        return

      }
      if(total > amount ){
        //alert('Paying amount should be atleast'+' ₹ '+ total);
        ToastAndroid.showWithGravity(
          "Paying amount should be atleast"+"  : ₹ "+ total,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        return
      }
      if(amount >  threshold[0].balance) {
        //alert('Paying amount should be less than total amount....');
        ToastAndroid.showWithGravity(
          "Paying amount should be less than total amount",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        return
      }
      
      if(typeof(amount) === 'string' && typeof(remain)=== 'number'){
        var updatedAmount = Number(amount);
        // alert('Going to try')
        try{      
          // alert('In try')
          // alert(current.toLocaleDateString());
          // console.log('tr date', onlyDate)
          const body = {id:transactionId, type:'payment', transaction_amount:updatedAmount, transaction_date:onlyDate, transaction_time:onlyTime};
          const response = await fetch('http://localhost:5000/Add_products/transaction/'+vRMN+'/'+cRMN, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(body)      
          });
          const result = await response.json();
          if(result.success==true){
            console.log('TRUEEEEEEEE');
            var date = current.getDate();
            var month = current.getMonth() + 1;
            var year = current.getFullYear();
            var tempOnlyDate = year + '-' + month + '-' + date;
            console.log('ch data date', tempOnlyDate)
            const body = {consumer_contact : cRMN , vendor_contact : vRMN ,payed_amount : updatedAmount , remaining_amount : remain , transaction_date : tempOnlyDate , total_amount :  threshold[0].balance, transaction_time: (new Date()).toLocaleTimeString(), tr_id:transactionId}
            const response = await fetch('http://localhost:5000/changedata',{
              method : 'POST',
              headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/JSON'
              },
              body : JSON.stringify(body)
            });          
            const result = await response.json();
            // alert(result);
            // alert("payed amount updated successfully.....");
            updatedata(remain);  
          }
          else{
            console.log('Falseeeeeee');
          }    
        }
        catch (err) {
         // alert("catch");
          console.error(err);
          console.log(err); 
        }     
      }
  }
  
   
  return (
    
    <View style={{ flex: 1, paddingTop:'10%',backgroundColor: '#edf7fc', }}>
      {isLoading ? <Text>Loading...</Text> : (
       <View style={{ flexDirection: 'column', justifyContent:  'space-between', height:'100%', width:'100%'}}>
        <FlatList
          data = {threshold}
          renderItem = {({item}) => {
            return(
              
              <View style={{ justifyContent: 'center', padding:'5%', alignItems: 'center',borderRadius:30,backgroundColor:'white',  flexDirection: 'column',width:'92%',marginHorizontal:'4%',height:'100%', flex: 1}}>
                <View style={{flexDirection:'row',width: '100%', marginTop:'5%'}}>
                  <Text style={{alignItems:'flex-start', width:'50%', fontWeight:"bold"}}>Total Due Amount</Text>
                  <Text style={{textAlign:'right', width:'50%'}}>₹ {(item.balance).toFixed(2)}</Text>                                           
                </View>
                <View style={{flexDirection:'row',width: '100%', marginTop:'5%'}}>
                  <Text style={{alignItems:'flex-start', width:'50%', fontWeight:"bold"}}>Minimum/Partial Due Amount</Text>
                  <Text style={{textAlign:'right', width:'50%'}}>₹ {(item.balance*item.threshold).toFixed(2)}</Text>                                           
                </View>                 
                <View style={{flexDirection:'row',width: '100%', marginTop:'5%'}}>
                  <Text style={{alignItems:'flex-start', width:'50%', fontWeight:"bold"}}>Paying Date</Text> 
                  <Text style={{textAlign:'right', width:'50%', color:'green'}} onPress={showDatePicker}>{defaultDate}</Text>  
                  <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"                            
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  maximumDate={new Date()}
                  />                                        
                </View>
                <View style={{flexDirection:'row',width: '100%', marginTop:'5%'}}>
                  <Text  style={{alignItems:'flex-start', width:'50%', fontWeight:"bold"}}>Paying Amount</Text>
                  <TextInput
                    textAlign='right'
                    keyboardType='numeric'
                    style={{width:'50%'}}
                    placeholderTextColor='green'
                    placeholder = 'Enter Amount'
                    onChangeText={(amount) =>  setAmount(amount)}
                    value={amount}/>                                          
                </View>
                <View style={{flexDirection:'row',width: '100%', marginTop:'5%', marginBottom:'5%'}}>
                  <Text style={{alignItems:'flex-start', width:'50%', fontWeight:"bold"}}>Remaining Amount</Text> 
                  <Text style={{textAlign:'right', width:'50%'}}>₹ {(item.balance - Number(amount)).toFixed(2)}</Text>                                           
                </View>
              </View>
            )
          }}
           
          />
           <View style = {{ alignItems : 'center', flex :1, height:'100%', width:'100%'}}>
                <TouchableOpacity style={styles.loginBtn} onPress={()=>check()}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Make Payment</Text>
                    </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    width: '50%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f55864',
    // borderWidth:1,
    borderColor:'green'
  }
  
})