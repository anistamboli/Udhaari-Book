import 'react-native-gesture-handler';

import { Button, View, Text, StyleSheet, TouchableOpacity, Image, Alert,ScrollView} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';

import axios from 'axios';

// import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';

export default function My_udhaari() {
  // const val = route.params.mob;
  // console.log(route.params);
  // console.log(val);

  const navigation = useNavigation();

  const [vRMN, setvRMN] = useState();
  const [cRMN, setcRMN] = useState();
  const [bal, setBal] = useState();

  const [allTransaction, setAllTransaction] = useState([]);
    
  const d1= new Date('2021-01-01');
  const d2= new Date();
  const [sDate, setStart] = useState(d1);
  const [eDate, setEnd] = useState(d2);

  
  const [month, setMonth] = useState('May');
  const [year, setYear] = useState('2021');

  const [accDetails, setAccDetails] = useState();

  const [flag, setflag] = useState('all');

  async function SaveTransactionID(value) {
    await SecureStore.setItemAsync('transactionID', value);
  }

  async function getValueFor() {
    let vRMN = await SecureStore.getItemAsync('vendorMob');
    let cRMN = await SecureStore.getItemAsync('consumerMob');
    setvRMN(vRMN);
    setcRMN(cRMN);
    
    const response_all = axios.get('http://localhost:5000/Transaction_history', {params:{
      vRMN, cRMN }})
      .then((response_all)=> {
        setAllTransaction(response_all.data)           
      })  
      .catch((error)=>{
        console.log(error)
      })

    const response_acc = axios.get('http://localhost:5000/Account_details/Udhaari_rec', {params:{
      vRMN,cRMN}})
      .then((response_acc)=> {
       setAccDetails(response_acc.data)
       setBal(response_acc.data.balance)
        setStart(new Date(response_acc.data.start_date))
      })
      .catch((error)=>{
        console.log(error)
      })

  }

  // useEffect(() => { 
  //   getValueFor();  
  //   },[]);  

  
  useFocusEffect(
    useCallback(() => {
      getValueFor();  
    }, [])
  );

  const AllTransaction = async (vRMN,cRMN) => {
    const response =  await axios.get('http://localhost:5000/Transaction_history', {params:{
      vRMN, cRMN }})
      .then((response)=> {

        setAllTransaction(response.data)
              
      })  
      .catch((error)=>{
        console.log(error)
      })  
  }


  const setRecords = (value) => {
    setflag(value)
  }
    
  return (
    <View style= {styles.container}>
      
      <View style={{flexDirection:'row',width:'100%'}}>
          <View style={{width:'34%'}}>
            <TouchableOpacity  
                style={flag=='all'?styles.button_click:styles.button} 
                onPress={() =>setflag('all') & AllTransaction(vRMN, cRMN) & setStart(new Date(accDetails.start_date))}>
                  <Text style={flag=='all'?styles.text1:styles.text}>All</Text>
            </TouchableOpacity>
          </View>
          <View style={{width:'33%'}}>
            <TouchableOpacity  
                style={flag=='purchase'?styles.button_click:styles.button} 
                onPress={() =>setflag('purchase')  & setStart(new Date(accDetails.start_date))}>
                  <Text style={flag=='purchase'?styles.text1:styles.text}>Purchase</Text>
            </TouchableOpacity>
          </View>
          <View style={{width:'33%'}}>
            <TouchableOpacity 
                style={flag=='payment'?styles.button_click:styles.button} 
                onPress={() =>setflag('payment') & setStart(new Date(accDetails.start_date))}>
                    <Text style={flag=='payment'?styles.text1:styles.text}>Payment</Text>
            </TouchableOpacity>
            </View>
      </View> 

      {
        (flag=='all' )? 
         
        <View style={{marginTop:'2%', width:'100%', height:'100%'}}>
          <View>
          <View style={{ flexDirection:'row', marginBottom:'2%'}}>
            <Picker 
            style={{width:'30%', height:25, borderWidth:1, color:'black', marginLeft:'2%', }} 
            selectedValue={month}
            itemStyle={{ fontStyle:'italic', backgroundColor:'blue'}}
            
            onValueChange={ (itemValue)=> {setMonth(itemValue) 
                var totDays= (new Date(year, itemValue, 0)).getDate()
                setStart(new Date(String(year+'-'+itemValue+'-01')))
                setEnd(new Date(String(year+'-'+itemValue+'-'+totDays)))}}
              >
              <Picker.Item label='Month'  />
              <Picker.Item label='Jan' value='01' />
              <Picker.Item label='Feb' value='02' />
              <Picker.Item label='Mar' value='03' />
              <Picker.Item label='Apr' value='04' />
              <Picker.Item label='May' value='05' />
              <Picker.Item label='Jun' value='06' />
              <Picker.Item label='Jul' value='07' />
              <Picker.Item label='Aug' value='08' />
              <Picker.Item label='Sep' value='09' />
              <Picker.Item label='Oct' value='10' />
              <Picker.Item label='Nov' value='11' />
              <Picker.Item label='Dec' value='12' />
            </Picker>

            <Picker 
            style={{width:'27%', height:25, borderWidth:1, color:'black'}} 
            selectedValue={year}
            onValueChange={ (itemValue)=>{ setYear(itemValue)
                var totDays= (new Date(itemValue, month, 0)).getDate()
                setStart(new Date(String(itemValue+'-'+month+'-01')))
                setEnd(new Date(String(itemValue+'-'+month+'-'+totDays)))} }
              >
              <Picker.Item label='2021' value='2021' />
              <Picker.Item label='2020' value='2020' />
              <Picker.Item label='2019' value='2019' />
              <Picker.Item label='2018' value='2018' />
              <Picker.Item label='2017' value='2017' />
              <Picker.Item label='2016' value='2016' />
              <Picker.Item label='2015' value='2015' />
            </Picker>
            
            <View style={{width:'40%', flexDirection:'column',}}>
              <Text style={{ fontWeight:'bold', width:'100%', textAlign:'right', paddingHorizontal:'5%', fontSize:14}}>Udhaari </Text>
              <Text style={{ fontWeight:'bold', width:'100%', textAlign:'right', paddingHorizontal:'5%', fontSize:14}}>₹ {bal}.00</Text>
            </View> 
          </View>
          

        
       
          <ScrollView vertical style={{height:'84%',  borderColor:'#5caff2', backgroundColor:'#EAF2F4'}} showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          
          {allTransaction.map((item,index) => {
            if(new Date(item.transaction_date)>=sDate && new Date(item.transaction_date)<=eDate)
            {
            return(
            <TouchableOpacity style= {{flexDirection :'column', width:'96%', marginHorizontal:'2%',height: 90,backgroundColor:'white', justifyContent: 'center', alignItems:'center', borderWidth:0.5, borderRadius:10, marginBottom:'2%' }} key={index}  onPress={()=>{ item.type=='payment'? SaveTransactionID(item.id) && navigation.navigate('Payment Details'): SaveTransactionID(item.id) && navigation.navigate('Purchase Bill')}}>
              <View style= {{flexDirection :'row', width:'100%',justifyContent: 'center', marginBottom:'3%'}}>
                <View style= {{ flexDirection:'row', width:'60%', alignItems:'flex-start', paddingLeft:'2%'}}>
                    <Text style={{fontWeight:'bold'}}>T-Id : </Text>
                    <Text>{item.id}</Text>
                </View>

                {(item.type=='purchase')?
                <View style= {{ width:'40%',justifyContent: 'center', alignItems: 'flex-end',paddingRight:'2%'}}>
                  <Text style={{fontWeight:'bold', fontSize:15,fontStyle:'italic', color:'blue'}}>{item.type}</Text>
                </View>
                :
                <View style= {{ width:'40%',justifyContent: 'center', alignItems: 'flex-end',paddingRight:'2%'}}>
                  <Text style={{fontWeight:'bold', fontSize:15,fontStyle:'italic', color:'green'}}>{item.type}</Text>
                </View>
                }
                
              </View >
              <View style= {{flexDirection :'row', width:'100%',justifyContent: 'center', alignItems:'flex-start'}}>
                <View style= {{ width:'70%',flexDirection:'row' ,paddingLeft:'2%'}}>
                    <Text style={{fontWeight:'bold'}}>Date: </Text>
                    <Text>{(new Date(item.transaction_date)).toDateString()}</Text>
                </View>
                <View style= {{ width:'30%',justifyContent: 'center',paddingRight:'2%',alignItems: 'flex-end'}}>
                  <Text>₹ {item.transaction_amount}.00</Text>
                </View>
              </View >
              
            </TouchableOpacity>
            )
            }
          })}
                
          </ScrollView>
        </View>
      </View>

      :
      
        (flag=='payment')?
        <View style={{ width:'100%', height:'100%'}}>
          <View style={{width:'100%', flexDirection:'row', marginBottom:'2%', marginTop:'2%'}}>
          <View style={{ flexDirection:'row',}}>
            <Picker 
            style={{width:'30%', height:25, borderWidth:1, color:'black', alignItems: 'center', marginLeft:'2%'}} 
            selectedValue={month}
            
            onValueChange={ (itemValue)=> {setMonth(itemValue) 
                var totDays= (new Date(year, itemValue, 0)).getDate()
                setStart(new Date(String(year+'-'+itemValue+'-01')))
                setEnd(new Date(String(year+'-'+itemValue+'-'+totDays)))}}
              >
              <Picker.Item label='Month'  />
              <Picker.Item label='Jan' value='01' />
              <Picker.Item label='Feb' value='02' />
              <Picker.Item label='Mar' value='03' />
              <Picker.Item label='Apr' value='04' />
              <Picker.Item label='May' value='05' />
              <Picker.Item label='Jun' value='06' />
              <Picker.Item label='Jul' value='07' />
              <Picker.Item label='Aug' value='08' />
              <Picker.Item label='Sep' value='09' />
              <Picker.Item label='Oct' value='10' />
              <Picker.Item label='Nov' value='11' />
              <Picker.Item label='Dec' value='12' />
            </Picker>

            <Picker 
            style={{width:'27%', height:25, borderWidth:1, color:'black'}} 
            selectedValue={year}
            onValueChange={ (itemValue)=>{ setYear(itemValue)
                var totDays= (new Date(itemValue, month, 0)).getDate()
                setStart(new Date(String(itemValue+'-'+month+'-01')))
                setEnd(new Date(String(itemValue+'-'+month+'-'+totDays)))} }
              >
              <Picker.Item label='2021' value='2021' />
              <Picker.Item label='2020' value='2020' />
              <Picker.Item label='2019' value='2019' />
              <Picker.Item label='2018' value='2018' />
              <Picker.Item label='2017' value='2017' />
              <Picker.Item label='2016' value='2016' />
              <Picker.Item label='2015' value='2015' />
            </Picker>
            
            <View style={{width:'40%', flexDirection:'column',}}>
              <Text style={{ fontWeight:'bold', width:'100%', textAlign:'right', paddingHorizontal:'5%', fontSize:14}}>Udhaari </Text>
              <Text style={{ fontWeight:'bold', width:'100%', textAlign:'right', paddingHorizontal:'5%', fontSize:14}}>₹ {bal}.00</Text>
            </View> 
          </View>
          
        </View> 
        <View>
          <ScrollView vertical style={{height:'84%',  borderColor:'#5caff2', backgroundColor:'#EAF2F4'}} showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          
          {allTransaction.map((item,index) => {
            if(new Date(item.transaction_date)>=sDate && new Date(item.transaction_date)<=eDate && item.type=='payment')
            {
            return(
            <View  key={index}>
             
             <TouchableOpacity style= {{flexDirection :'column', width:'96%', marginHorizontal:'2%',height: 90,backgroundColor:'white', justifyContent: 'center', alignItems:'center', borderWidth:0.5, borderRadius:10, marginBottom:'1%' , marginTop:'1%'}} key={index} onPress={()=>{SaveTransactionID(item.id) && navigation.navigate('Payment Details')}}>
              <View style= {{flexDirection :'row', width:'100%',justifyContent: 'center', marginBottom:'3%'}}>
                <View style= {{ flexDirection:'row', width:'60%', alignItems:'flex-start', paddingLeft:'2%'}}>
                    <Text style={{fontWeight:'bold'}}>T-Id : </Text>
                    <Text>{item.id}</Text>
                </View>        
                <View style= {{ width:'40%',justifyContent: 'center', alignItems: 'flex-end',paddingRight:'2%'}}>
                  <Text style={{fontWeight:'bold', fontSize:15,fontStyle:'italic', color:'black'}}>Paid Amount</Text>
                </View>  
              </View >
              <View style= {{flexDirection :'row', width:'100%',justifyContent: 'center', alignItems:'flex-start'}}>
                <View style= {{ width:'70%',flexDirection:'row' ,paddingLeft:'2%'}}>
                    <Text style={{fontWeight:'bold'}}>Date: </Text>
                    <Text>{(new Date(item.transaction_date)).toDateString()}</Text>
                </View>
                <View style= {{ width:'30%',justifyContent: 'center',paddingRight:'2%',alignItems: 'flex-end'}}>
                  <Text>₹ {item.transaction_amount}.00</Text>
                </View>
              </View >
              
            </TouchableOpacity>
             

            </View>
            )
            }
          })}
                
          </ScrollView>
        </View>
      </View>
      :

      <View style={{ width:'100%', height:'100%'}}>

        <View style={{width:'100%', flexDirection:'row', marginBottom:'2%', marginTop:'2%'}}>
          <View style={{ flexDirection:'row',}}>
            <Picker 
            style={{width:'30%', height:25, borderWidth:1, color:'black', alignItems: 'center', marginLeft:'2%'}} 
            selectedValue={month}
            
            onValueChange={ (itemValue)=> {setMonth(itemValue) 
                var totDays= (new Date(year, itemValue, 0)).getDate()
                setStart(new Date(String(year+'-'+itemValue+'-01')))
                setEnd(new Date(String(year+'-'+itemValue+'-'+totDays)))}}
              >
              <Picker.Item label='Month'  />
              <Picker.Item label='Jan' value='01' />
              <Picker.Item label='Feb' value='02' />
              <Picker.Item label='Mar' value='03' />
              <Picker.Item label='Apr' value='04' />
              <Picker.Item label='May' value='05' />
              <Picker.Item label='Jun' value='06' />
              <Picker.Item label='Jul' value='07' />
              <Picker.Item label='Aug' value='08' />
              <Picker.Item label='Sep' value='09' />
              <Picker.Item label='Oct' value='10' />
              <Picker.Item label='Nov' value='11' />
              <Picker.Item label='Dec' value='12' />
            </Picker>

            <Picker 
            style={{width:'27%', height:25, borderWidth:1, color:'black'}} 
            selectedValue={year}
            onValueChange={ (itemValue)=>{ setYear(itemValue)
                var totDays= (new Date(itemValue, month, 0)).getDate()
                setStart(new Date(String(itemValue+'-'+month+'-01')))
                setEnd(new Date(String(itemValue+'-'+month+'-'+totDays)))} }
              >
              <Picker.Item label='2021' value='2021' />
              <Picker.Item label='2020' value='2020' />
              <Picker.Item label='2019' value='2019' />
              <Picker.Item label='2018' value='2018' />
              <Picker.Item label='2017' value='2017' />
              <Picker.Item label='2016' value='2016' />
              <Picker.Item label='2015' value='2015' />
            </Picker>
            
            <View style={{width:'40%', flexDirection:'column',}}>
              <Text style={{ fontWeight:'bold', width:'100%', textAlign:'right', paddingHorizontal:'5%', fontSize:14}}>Udhaari </Text>
              <Text style={{ fontWeight:'bold', width:'100%', textAlign:'right', paddingHorizontal:'5%', fontSize:14}}>₹ {bal}.00</Text>
            </View> 
          </View>
          
        </View> 

        <View style={{width:'100%', height:'84%', marginTop:'1%',borderRadius:5, borderColor:'#5caff2'}}>

        <ScrollView vertical style={{height:'100%', marginHorizontal:'1%',  borderColor:'#5caff2', backgroundColor:'#EAF2F4'}} showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          
          {allTransaction.map((item,index) => {
            if(new Date(item.transaction_date)>=sDate && new Date(item.transaction_date)<=eDate && item.type=='purchase')
            {
            return(
            <View  key={index}>
             
             <TouchableOpacity style= {{flexDirection :'column', width:'98%', marginHorizontal:'1%',height: 90,backgroundColor:'white', justifyContent: 'center', alignItems:'center', borderWidth:0.5, borderRadius:10, marginBottom:'2%' }} key={index} onPress={()=>{SaveTransactionID(item.id) && navigation.navigate('Purchase Bill')}}>
              <View style= {{flexDirection :'row', width:'100%',justifyContent: 'center', marginBottom:'3%'}}>
                <View style= {{ flexDirection:'row', width:'60%', alignItems:'flex-start', paddingLeft:'2%'}}>
                    <Text style={{fontWeight:'bold'}}>T-Id : </Text>
                    <Text>{item.id}</Text>
                </View>        
                <View style= {{ width:'40%',justifyContent: 'center', alignItems: 'flex-end',paddingRight:'2%'}}>
                  <Text style={{fontWeight:'bold', fontSize:15,fontStyle:'italic', color:'black'}}>Bill Amount</Text>
                </View>  
              </View >
              <View style= {{flexDirection :'row', width:'100%',justifyContent: 'center', alignItems:'flex-start'}}>
                <View style= {{ width:'70%',flexDirection:'row' ,paddingLeft:'2%'}}>
                    <Text style={{fontWeight:'bold'}}>Date: </Text>
                    <Text>{(new Date(item.transaction_date)).toDateString()}</Text>
                </View>
                <View style= {{ width:'30%',justifyContent: 'center',paddingRight:'2%',alignItems: 'flex-end'}}>
                  <Text>₹ {item.transaction_amount}.00</Text>
                </View>
              </View >
              
            </TouchableOpacity>

            </View>
            )
            }
          })}
                
          </ScrollView>

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