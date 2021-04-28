import 'react-native-gesture-handler';

import { Button, View, Text, StyleSheet, TouchableOpacity, Image, Alert,ScrollView} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import axios from 'axios';

// import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';

export default function Udhaari_records() {
  // const val = route.params.mob;
  // console.log(route.params);
  // console.log(val);

  const [vRMN, setvRMN] = useState();
  const [cRMN, setcRMN] = useState();

  const [allPaymentRec, setAllPaymentRec] = useState([]);
  const [allPurchaseRec, setAllPurchaseRec] = useState([]);
    
  const d1= new Date('2021-01-01');
  const d2= new Date();
  const [sDate, setStart] = useState(d1);
  const [eDate, setEnd] = useState(d2);


  const [accDetails, setAccDetails] = useState();

  const [flag, setflag] = useState('purchase');

  async function getValueFor() {
    let vRMN = await SecureStore.getItemAsync('vendorContact');
    let cRMN = await SecureStore.getItemAsync('consumerContact');
    setvRMN(vRMN);
    setcRMN(cRMN);
    
    // console.log(vRMN,cRMN)
    // const cRMN=12;
    // console.log(result,cc)
    const response = await axios.get('http://localhost:5000/Purchase_history', {params:{
      vRMN, cRMN }})
      .then((response)=> {
        setAllPurchaseRec(response.data)  
        // console.log("First Call :",response.data)
      })  
      .catch((error)=>{
        console.log(error)
      })
    // console.log(vRMN);
    const response_acc = await axios.get('http://localhost:5000/Account_details/Udhaari_rec', {params:{
      vRMN,cRMN}})
      .then((response_acc)=> {
       setAccDetails(response_acc.data)
        setStart(new Date(response_acc.data.start_date))
      })
      .catch((error)=>{
        console.log(error)
      })
      
  }

  useFocusEffect(
    useCallback(() => {
      getValueFor();  
    }, [])
  );


  // useEffect(() => { 
  //   getValueFor();  
  //   },[]);  


  const PurchaseRec = async (vRMN,cRMN) => {

    const response =  await axios.get('http://localhost:5000/Purchase_history', {params:{
      vRMN, cRMN }})
      .then((response)=> {
        // console.log(response.data)
        // const allPayments= response.data
        // console.log(allPayments)
        // console.log(typeof(response.data[0].transaction_date))
        setAllPurchaseRec(response.data)
        // console.log(allPurchaseRec)
      })  
      .catch((error)=>{
        console.log(error)
      })  
  }

  // PurchaseRec(vRMN,cRMN);

  const PayRec = async (vRMN,cRMN) => {
    const response =  await axios.get('http://localhost:5000/Payment_history', {params:{
      vRMN, cRMN }})
      .then((response)=> {
        // console.log(response.data)
        // const allPayments= response.data
        // console.log(allPayments)
        // console.log(typeof(response.data[0].transaction_date))
        setAllPaymentRec(response.data)
              
      })  
      .catch((error)=>{
        console.log(error)
      })  
  }

  
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      setStart(date);
      // console.log(typeof(date))
      hideDatePicker();
      setDatePickerVisibility(false);
      // console.log("A date has been picked: ", date.toDateString());    
    };
  
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);

    const showDatePicker1 = () => {
      setDatePickerVisibility1(true);
    };
  
    const hideDatePicker1 = () => {
      setDatePickerVisibility1(false);
    };
  
    const handleConfirm1 = (date) => {
      setEnd(date);
      // console.log(typeof(date))
      hideDatePicker();
      setDatePickerVisibility1(false);
      // console.log("A date has been picked by 1: ", date.toDateString());      
    };
  



  const setRecords = (value) => {
    setflag(value)
  }
    return (
      <View style= {styles.container}>
        
        <View style={{flexDirection:'row',width:'100%'}}>
            <View style={{width:'50%'}}>
              <TouchableOpacity  
                  style={flag=='purchase'?styles.button_click:styles.button} 
                  onPress={() =>setflag('purchase') & PurchaseRec(vRMN, cRMN) & setStart(new Date(accDetails.start_date))}>
                    <Text style={flag=='purchase'?styles.text1:styles.text}>Purchase History</Text>
              </TouchableOpacity>
            </View>
            <View style={{width:'50%'}}>
              <TouchableOpacity 
                  style={flag=='payment'?styles.button_click:styles.button} 
                  onPress={() =>setflag('payment') & PayRec(vRMN, cRMN) & setStart(new Date(accDetails.start_date))}>
                      <Text style={flag=='payment'?styles.text1:styles.text}>Payment History</Text>
              </TouchableOpacity>
              </View>
        </View> 

        {
          (flag=='payment' )? 
           
          <View style={{marginTop:'1%', width:'100%', height:'100%'}}>
            <View style={{width:'100%', flexDirection:'row', marginBottom:'2%', marginTop:'2%'}}>
            <View style={{width:'30%', marginHorizontal:'10%'}}>
              <View style={{width:'60%', marginHorizontal:'20%' }}>
              <Button color='#109dcc' title="From" onPress={showDatePicker} />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}                
                  onCancel={hideDatePicker}
                  maximumDate={d2}
                />
                </View>
              <Text style={{textAlign:'center', marginTop:'2%', fontWeight:'bold'}}>{sDate.toDateString('en-US')}</Text>
            </View>
            <View style={{width:'30%', marginHorizontal:'10%'}}>
              <View style={{width:'60%', marginHorizontal:'20%'}}>
              <Button color='#109dcc' title="To" onPress={showDatePicker1} />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible1}
                  mode="date"
                  onConfirm={handleConfirm1}
                  onCancel={hideDatePicker1}
                  minimumDate={sDate}
                  maximumDate={d2}
                />
                </View>
              <Text style={{textAlign:'center', marginTop:'2%', fontWeight:'bold'}}>{eDate.toDateString()}</Text>
            </View> 
          </View> 
          <View>
            <ScrollView vertical style={{height:'80%', marginHorizontal:'2%', borderWidth:1, borderColor:'#5caff2', backgroundColor:'white'}} showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            
            {allPaymentRec.map((item,index) => {
              if(new Date(item.transaction_date)>=sDate && new Date(item.transaction_date)<=eDate)
              {
              return(
              <View style= {{flexDirection :'column', width:'100%',height: 100,justifyContent: 'center', alignItems:'center', borderWidth:0.5}} key={index}>
                <View style= {{flexDirection :'row', width:'100%',justifyContent: 'center'}}>
                  <View style= {{ width:'50%',justifyContent: 'center', alignItems:'flex-start', paddingLeft:'2%'}}>
                      <Text style={{fontWeight:'bold'}}>T-Id : {item.id}</Text>
                  </View>
                  <View style= {{ width:'50%',justifyContent: 'center', alignItems: 'flex-end',paddingRight:'2%'}}>
                    <Text style={{fontWeight:'bold'}}>{new Date(item.transaction_date).toDateString()}</Text>
                  </View>
                </View >
                <View style= {{flexDirection :'row', width:'100%',justifyContent: 'center', alignItems:'flex-start'}}>
                  <View style= {{ width:'50%',justifyContent: 'center' ,paddingLeft:'2%'}}>
                      <Text>Total Amount</Text>
                  </View>
                  <View style= {{ width:'50%',justifyContent: 'center',paddingRight:'2%',alignItems: 'flex-end'}}>
                    <Text>₹ {item.total_amount}</Text>
                  </View>
                </View >
                <View style= {{flexDirection :'row', width:'100%',justifyContent: 'center', alignItems:'flex-start'}}>
                  <View style= {{ width:'50%',justifyContent: 'center' ,paddingLeft:'2%'}}>
                      <Text>Paid Amount</Text>
                  </View>
                  <View style= {{ width:'50%',justifyContent: 'center',paddingRight:'2%',alignItems: 'flex-end'}}>
                    <Text>₹ {item.payed_amount}</Text>
                  </View>
                </View >
                <View style= {{flexDirection :'row', width:'100%',justifyContent: 'center', alignItems: 'flex-start'}}>
                  <View style= {{ width:'50%',justifyContent: 'center',paddingLeft:'2%'}}>
                      <Text>Carry-forward Amount</Text>
                  </View>
                  <View style= {{ width:'50%',justifyContent: 'center',paddingRight:'2%',alignItems: 'flex-end'}}>
                    <Text>₹ {item.remaining_amount}</Text>
                  </View>
                </View >
              </View>
              )
              }
            })}
                  
            </ScrollView>
          </View>
        </View>

        :
          
        <View style={{marginTop:'1%', width:'100%', height:'100%'}}>
          <View style={{width:'100%', flexDirection:'row', marginBottom:'2%', marginTop:'2%'}}>
            <View style={{width:'30%', marginHorizontal:'10%'}}>
              <View style={{width:'60%', marginHorizontal:'20%'}}>
              <Button color='#109dcc' title="From" onPress={showDatePicker} />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}                
                  onCancel={hideDatePicker}
                  maximumDate={d2}
                />
                </View>
              <Text style={{textAlign:'center', marginTop:'2%', fontWeight:'bold'}}>{sDate.toDateString()}</Text>
            </View>
            <View style={{width:'30%', marginHorizontal:'10%'}}>
             <View style={{width:'60%', marginHorizontal:'20%'}}>
              <Button title="To" color='#109dcc' onPress={showDatePicker1} />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible1}
                  mode="date"
                  onConfirm={handleConfirm1}
                  onCancel={hideDatePicker1}
                  minimumDate={sDate}
                  maximumDate={d2}
                />
                </View>
              <Text style={{textAlign:'center', marginTop:'2%', fontWeight:'bold'}}>{eDate.toDateString()}</Text>
            </View> 
          </View> 
          <View style={{width:'98%', height:'100%', marginTop:'1%', marginHorizontal:'1%', borderWidth:1,borderRadius:5, borderColor:'#5caff2'}}>
            <View style= {{width:'100%', flexDirection:'row', height:'7%', backgroundColor:'skyblue',justifyContent: 'center', alignItems:'center', borderWidth:1, borderColor:'#0c88ed'}}>
              <View style= {{width:'30%', justifyContent: 'center', alignItems:'flex-start', paddingLeft: '1%'}}>
                <Text style={{fontWeight:'bold'}}>Date</Text>
              </View>
              <View style= {{width:'25%', justifyContent: 'center', alignItems:'center'}}>
                <Text style={{fontWeight:'bold'}}>Product</Text>
              </View>
              <View style={{width:'15%', justifyContent: 'center', alignItems:'center'}}>
                <Text style={{fontWeight:'bold'}}>Qty</Text>
              </View>
              <View style={{width:'15%', justifyContent: 'center', alignItems:'center'}}>
                <Text style={{fontWeight:'bold'}}>Price</Text>
              </View>
              <View style={{width:'15%', justifyContent: 'center', alignItems:'flex-end', paddingRight:'2%'}}>
                <Text style={{fontWeight:'bold'}}>Tot</Text>
              </View>
            </View>
  
          <View>
            <ScrollView vertical style={{height:'72%', marginBottom:'1%',borderWidth:0.5, backgroundColor:'white'}} showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
      
            {allPurchaseRec.map((item, index) => {
              if(new Date(item.date_purchase)>=sDate && new Date(item.date_purchase)<=eDate)
              {
              return(
                <View style= {{ width:'100%', flexDirection:'row', height: 80,justifyContent: 'center', alignItems:'center', borderWidth:0.5}} key={index} >
                  <View style= {{width:'30%', flexDirection:'column',justifyContent: 'center', alignItems:'flex-start', paddingLeft:'2%'}}>
                    <View>
                      <Text>{new Date(item.date_purchase).toDateString()}</Text>
                    </View>
                    <View>
                      <Text>{item.time_purchase}</Text>
                    </View>
                  </View>
                  <View style= {{width:'25%', justifyContent: 'center', alignItems:'center'}}>
                    <Text>{item.name}</Text>
                  </View>
                  <View style={{width:'15%', justifyContent: 'center', alignItems:'center'}}>
                    <Text>{item.quantity}</Text>
                  </View>
                  <View style={{width:'15%', justifyContent: 'center', alignItems:'center'}}>
                    <Text>{item.base_price}</Text>
                  </View>
                  <View style={{width:'15%', alignItems: 'flex-end', paddingRight:'2%'}}>
                    <Text>{item.total_price}</Text>
                  </View>

                </View>
              )}
            })}

            </ScrollView>
          </View>
        </View>
        </View>
        }

      </View>
    );
  }

  const styles = StyleSheet.create({

     container: {
      width: '100%',
      // height: '100%',
      flex: 1,
      backgroundColor: '#EAF2F4',
      alignItems: 'center',
      justifyContent: 'flex-start',
      
  },

  text:{
    display:'flex',
    justifyContent:'center',
    textAlign:'center',
    fontSize:14,
    color:'#000',
    fontWeight:'bold',
    letterSpacing:1,
    marginBottom: '10%',
},

button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:'10%',
    marginLeft:'0%',
    width:'100%',
    height:30,
    // backgroundColor:'#fff',
    // borderRadius:20,
    justifyContent:'center',
    textAlign:'center',
  },
  button_click: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:'10%',
    width:'100%',
    height:30,
    borderBottomWidth:2,
    borderBottomColor:'#4398D4',
    // backgroundColor:'#4398D4',
    // borderRadius:20,
    justifyContent:'center',
    textAlign:'center',
    fontWeight:'bold'
  },
  text1:{
    display:'flex',
    justifyContent:'center',
    textAlign:'center',
    fontSize:14,
    color:'#4398D4',
    marginBottom:'10%',
    letterSpacing:1,
    fontWeight:'bold'
},

  });