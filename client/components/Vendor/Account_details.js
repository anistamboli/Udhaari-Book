//React Native Imports
import 'react-native-gesture-handler';
import React, { useState, useEffect}                                           from 'react';
import { FlatList,StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

//Expo Imports
import { Entypo } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
// import { response } from 'express';


const Account_details = () => {  

  // const vRMN = route.params.vRMN; 
  // const cRMN = route.params.cRMN; 
  const [isLoading, setLoading] = useState(true);
  // const [vendorContact, setVendorContact]=('9196191919');
  // const [consumerContact, setConsumerContact]=('9021390130');
  const [selectedConsumer, setSelectedConsumer] = useState([]);
  const [name, setName] = useState();
  const [threshold, setThreshold] = useState();

  const [vRMN, setvRMN] = useState();
  const [cRMN, setcRMN] = useState();
  
  async function getValueFor() {
    let vRMN = await SecureStore.getItemAsync('vendorContact');
    let cRMN = await SecureStore.getItemAsync('consumerContact');
    setvRMN(vRMN);
    setcRMN(cRMN);
    // const cRMN=12;
    const response={}
    fetch('http://localhost:5000/Account_details/'+vRMN+'/'+cRMN)
    .then((response) => response.json())
    .then((result) => setSelectedConsumer(result))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }

  useEffect(() => {
    getValueFor();
    // const response= await fetch('http://localhost:5000/Account_details/'+vRMN+'/'+cRMN)
    // .then((response) => response.json())
    // .then((result) => setSelectedConsumer(result))
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
            // alert(selectedConsumer[0].contact);
            // var cRMN=selectedConsumer[0].contact;
            alert(typeof(cRMN));
            const response = await fetch('http://localhost:5000/Account_details/'+vRMN+'/'+cRMN, { method: 'DELETE' });
            const result = await response.json();
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
    // alert("EDIT VALUE"+editValue);//1
    // setName(editValue);
    // alert(typeof(name));
    // var vRMN =9196191919;
    // var cRMN =9021390130;
    alert(name);//3 //3
    alert(threshold);
    alert(typeof(name));
    alert(typeof(threshold));
    if(typeof(name)==='string' || typeof(threshold)==='string'){
      // var cRMN = selectedConsumer[0].contact;
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
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <Text>Loading...</Text> : (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between', paddingTop:'3%'}}>  
          {selectedConsumer[0].payed_amount>0 ? 
            <Text style={{textAlign:'center',padding: 10, borderRadius: 5, width: '20%', backgroundColor: 'green', alignSelf:'flex-end'}}>Active</Text>: 
            <Text style={{textAlign:'center',padding: 10, borderRadius: 5, width: '20%', backgroundColor: 'red', alignSelf:'flex-end'}}>Blocked</Text>
          }           
          {/* <Text>{'\n'}</Text>  */}
          <TouchableOpacity activeOpacity={2} style={{marginTop:'10%'}} >
            <TextInput style={{ fontSize: 18, color: 'green'}}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, textAlign: 'center' }}
            placeholderTextColor = 'green'
            textColor='black'
            onChangeText={setName}
            value={name}
            placeholder={selectedConsumer[0].consumer_name}
          />
          </TouchableOpacity>
          <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingVertical: '2%'}}>{cRMN}</Text>                  
          <FlatList
          data = {selectedConsumer}
          renderItem = {({item}) => {
            return(
              <View style={{flexDirection:'column'}}>
                <View style={{flexDirection:'row', width:'100%',marginTop:'3%'}}>
                  <View style={{width:'50%', justifyContent:'center'}}>
                    <Text>Threshold</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end', paddingRight:'1%'}}>
                    <TouchableOpacity activeOpacity={2} >
                      <TextInput style={{ fontSize: 18, color: 'green'}}
                        style={{ height: 30, width:'50%', borderColor: 'gray', textAlign: 'right' }}
                        placeholderTextColor = 'black'
                        onChangeText={setThreshold}
                        value={threshold}
                        placeholder={(selectedConsumer[0].threshold).toString()}
                      />        
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{flexDirection:'row', width:'100%',marginTop:'2%'}}>
                  <View style={{width:'50%'}}>
                    <Text>Account Started Date</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    <Text>{new Date(item.start_date).toDateString()}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', width:'100%',marginTop:'3%'}}>
                  <View style={{width:'50%'}}>
                    <Text>Start Date</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    <Text>{new Date(item.billing_start_date).toDateString()}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', width:'100%',marginTop:'3%'}}>
                  <View style={{width:'50%'}}>
                    <Text>Due Date</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    <Text>{new Date(item.due_date).toDateString()}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', width:'100%',marginTop:'3%'}}>
                  <View style={{width:'50%'}}>
                    <Text>Last Paid Amount</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    <Text>₹{item.payed_amount}.00</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', width:'100%',marginTop:'3%'}}>
                  <View style={{width:'50%'}}>
                    <Text>Total Due Amount</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    <Text>₹{item.balance}.00</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', width:'100%',marginTop:'3%'}}>
                  <View style={{width:'50%'}}>
                    <Text>Partial  Due Amount</Text>
                  </View>
                  <View style={{width:'50%', alignItems:'flex-end'}}>
                    <Text>₹{item.balance*item.threshold}.00</Text>
                  </View>
                </View>
              </View>
              // <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flex: 1, paddingTop:0}}>
              //   <View>                
              //     <Text>THRESHOLD</Text>
              //     <Text></Text>
              //     <Text>ACCOUNT STARTED DATE</Text>                                
              //     <Text>START DATE</Text>
              //     <Text>DUE DATE</Text>     
              //     <Text>LAST PAID AMOUNT</Text>                            
              //     <Text>TOTAL DUE AMOUNT</Text>
              //     <Text>PARTIAL DUE AMOUNT</Text>        
              //   </View>
              //   <View>
              //     <TouchableOpacity activeOpacity={2} >
              //       <TextInput style={{ fontSize: 18, color: 'green', textAlign: 'center'}}
              //       style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              //       placeholderTextColor = 'black'
              //       onChangeText={setThreshold}
              //       value={threshold}
              //       placeholder={(selectedConsumer[0].threshold).toString()}
              //       />        
              //     </TouchableOpacity>
              //     <Text>{new Date(item.start_date).toDateString()}</Text>                                
              //     <Text>{new Date(item.billing_start_date).toDateString()}</Text>
              //     <Text>{new Date(item.due_date).toDateString()}</Text>      
              //     <Text>₹{item.payed_amount}.00</Text>                
              //     <Text>₹{item.balance}.00</Text>
              //     <Text>₹{item.balance*item.threshold}.00</Text>   
              //     {/* <TouchableOpacity activeOpacity={2} >
              //         <Entypo name="trash" size={50} color="red" style={{alignSelf:'flex-end'}} onPress = {DeleteAccount}/> 
              //     </TouchableOpacity>                       */}
              //   </View>  
              // </View>
            )            
          }}/>   
          <View style={{flexDirection:'row', width:'100%', marginBottom:'8%'}}>
            <View style={{width:'50%', justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity activeOpacity={2} style={styles.saveChangesButton}>
                <Text style={styles.saveChangesText} onPress = {EditNameThreshold}>Save Changes</Text>
              </TouchableOpacity>
            </View>
            <View style={{width:'50%', paddingRight:'2%'}}>
              <TouchableOpacity activeOpacity={2} >
                <Entypo name="trash" size={50} color="red" style={{alignSelf:'flex-end'}} onPress = {DeleteAccount}/> 
              </TouchableOpacity>
            </View>  
          </View>
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


export default Account_details;