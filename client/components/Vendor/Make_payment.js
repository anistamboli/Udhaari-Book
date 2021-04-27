import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { FlatList,Button, StyleSheet, Text, View , TextInput , TouchableOpacity , Alert} from 'react-native';


import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

export default function Make_payment() {

  // const vRMN = route.params.vRMN; 
  // const cRMN = route.params.cRMN; 
  const [isLoading, setLoading] = useState(true);
  
  const [current, setCurrent] = useState('');
  const [newDate , setNewDate] = useState('');
  const [amount , setAmount] = useState('');
  const [threshold , setthreshold] = useState('');
  const [vRMN, setvRMN] = useState();
  const [cRMN, setcRMN] = useState();

  async function getValueFor() {
    let vRMN = await SecureStore.getItemAsync('vendorContact');
    let cRMN = await SecureStore.getItemAsync('consumerContact');
    setvRMN(vRMN);
    setcRMN(cRMN); 
      
    fetch('http://localhost:5000/threshold/'+vRMN+'/'+cRMN)
    .then((response1) => response1.json())
    .then((result1) => setthreshold(result1))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
    ShowCurrentDate();
  }
 
  useEffect(() => {
    const vRMN= 1;
    const cRMN = 12;
    
    getValueFor();
  }, []);
 
  const ShowCurrentDate= async ()=>{
 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var month1 = new Date().getMonth() + 2;
    var dataset = date + '-' + month + '-' + year
    var dataset1 = date + '-' + month1 + '-' + year
    setCurrent(dataset);
    setNewDate(dataset1);
   

   }

   const updatedata = async (remain) => {
    
    try {
      var vRMN = 2;
      var cRMN = 11;
     
      const body= {due_date :newDate, balance : Number(remain) , billing_start_date : current}
      const response = await fetch('http://localhost:5000/updatedata/'+vRMN+'/'+cRMN,{
        method : 'PUT',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/JSON'},
          body : JSON.stringify(body)
        }
      );
      
      const result = await response.json();
      alert(result);
      alert("Balance updated successfully.....");
              
      
    
    }


    catch (err) {
     // alert("catch");
      console.error(err);
      console.log(err);
     
    }

   }
 
      const check = async ()=> {
      var total = threshold[0].balance * threshold[0].threshold;
      alert( threshold[0].balance);
      alert(typeof( threshold[0].balance));
      alert(amount);
      alert(typeof(amount));
      var remain =  threshold[0].balance - Number(amount)
     
      
      if(!amount.trim()){
        alert('Please Enter paying amount...')
        return 
      }
      if(amount <0){
        alert('Negative amount is not allowed!!!');
        return

      }
      if(total > amount ){
        alert('Paying amount should be atleast'+' '+ total);
        return
      }
      if(amount >  threshold[0].balance) {
        alert('Paying amount should be less than total amount....');
        return
      }
      
      if(typeof(amount) === 'string' && typeof(current)==='string' && typeof(remain)=== 'number'){
        var updatedAmount = Number(amount);
        
        try {
          var vRMN = 2;
          var cRMN = 11;
         
          const body = {consumer_contact : cRMN , vendor_contact : vRMN ,payed_amount : updatedAmount , remaining_amount : remain , transaction_date : current , total_amount :  threshold[0].balance}
          const response = await fetch('http://localhost:5000/changedata',{
            method : 'POST',
            headers: {
              'Accept' : 'application/json',
              'Content-Type' : 'application/JSON'},
              body : JSON.stringify(body)
            }
          );
          
          const result = await response.json();
          alert(result);
          alert("payed amount updated successfully.....");
          updatedata(remain);          
        
        }
        catch (err) {
         // alert("catch");
          console.error(err);
          console.log(err); 
        }     
      }
  }
  
   
  return (
    
    <View style={{ flex: 1, marginTop:'10%' }}>
      {isLoading ? <Text>Loading...</Text> : (
       <View style={{ flexDirection: 'column', justifyContent:  'space-between', height:'100%', width:'100%'}}>
        <FlatList
          data = {threshold}
          renderItem = {({item}) => {
            return(
              
              <View style={{ justifyContent: 'center', padding:'5%', alignItems: 'center',borderRadius:10, borderColor:'green',backgroundColor:'white', borderWidth:1, flexDirection: 'column',width:'92%',marginHorizontal:'4%',height:'100%', flex: 1}}>
                <View style={{flexDirection:'row',width: '100%', marginTop:'5%'}}>
                  <Text style={{alignItems:'flex-start', width:'50%', fontWeight:"bold"}}>Total Amount</Text>
                  <Text style={{textAlign:'right', width:'50%'}}>₹ {item.balance}</Text>                                           
                </View>
                <View style={{flexDirection:'row',width: '100%', marginTop:'5%'}}>
                  <Text style={{alignItems:'flex-start', width:'50%', fontWeight:"bold"}}>Paying Date</Text> 
                  <Text style={{textAlign:'right', width:'50%'}}>{(new Date()).toDateString()}</Text>                                          
                </View>
                <View style={{flexDirection:'row',width: '100%', marginTop:'5%'}}>
                  <Text  style={{alignItems:'flex-start', width:'50%', fontWeight:"bold"}}>Paying Amount</Text>
                  <TextInput
                    textAlign='right'
                    keyboardType='numeric'
                    placeholder = 'Enter Paying Amount...'
                    onChangeText={(amount) =>  setAmount(amount)}
                  />                                          
                </View>
                <View style={{flexDirection:'row',width: '100%', marginTop:'5%', marginBottom:'5%'}}>
                  <Text style={{alignItems:'flex-start', width:'50%', fontWeight:"bold"}}>Remaining Amount</Text> 
                  <Text style={{textAlign:'right', width:'50%'}}>₹ {item.balance - Number(amount)}</Text>                                           
                </View>
              </View>
            )
          }}
           
          />
           <View style = {{ alignItems : 'center', flex :1, height:'100%', width:'100%'}}>
                <TouchableOpacity style={styles.loginBtn} onPress={()=>check()}>
                    <Text >Make Payment</Text>
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
    backgroundColor: '#B2EBE0',
    borderWidth:1,
    borderColor:'green'
  }
  
})