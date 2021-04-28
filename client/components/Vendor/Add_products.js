//React Native Imports
import 'react-native-gesture-handler';
// import * as React from 'react';


import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

import * as SecureStore from 'expo-secure-store';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';


const Add_products = () => {
  const [search, setSearch] = useState('');
  const [tempKey, setTempKey] = useState(0);
  const [current, setCurrent] = useState('');
  const [consumers , setConsumers] = useState([]);
  const [totalAmount , setTotalAmount] = useState(0);
  const [onlyDate, setOnlyDate] = useState('');
  const [onlyTime, setOnlyTime] = useState('');

  const [vRMN, setvRMN] = useState();
  const [cRMN, setcRMN] = useState();
  
  const [inputs, setInputs] = useState([{key: '', id:'', current:'', product: '',quantity: '' ,baseprice:0,total_price:0}]);  
  const [filteredConsumers, setFilteredConsumers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  async function getValueFor() {
    let vRMN = await SecureStore.getItemAsync('vendorContact');
    let cRMN = await SecureStore.getItemAsync('consumerContact');
    setvRMN(vRMN);
    setcRMN(cRMN);
    

    fetch('http://localhost:5000/Add_products/product')
    .then((response) => response.json())
    .then((result) => {
      setConsumers(result);
      setFilteredConsumers(result);
    })
    .catch((error) => {
      console.error(error);
    });

    // console.log("TOTAL CLIENT");
    // var vRMN = 1;
    // var cRMN = 12;
    fetch('http://localhost:5000/Add_products/total_amount/'+vRMN+'/'+cRMN)
    .then((response) => response.json())
    .then((result) => {
      // console.log("DDDd");
      setTotalAmount(result);
      console.log(totalAmount);
    })
    .catch((error) => {
      console.error(error);
    });
   
  }

  useFocusEffect(
    useCallback(() => {
      getValueFor();  
    }, [])
  );



  const searchFilterFunction = (text) => {
    console.log(totalAmount);
    const newData = consumers.filter(function (item) {
      var itemData; 
      itemData = item.name
      ? item.name.toUpperCase()
      : ''.toUpperCase();      
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredConsumers(newData);    
    setIsLoading(true);
    setSearch(text);
  }


  const addHandler = async (vRMN,cRMN) => {   

    if(inputs[tempKey].product==''){
      alert('Enter The Product');
    }
    else if(inputs[tempKey].quantity==''){
      alert('Enter The Quantity');
    }
    else{
      const _inputs = [...inputs];
      _inputs[tempKey].total_price = inputs[tempKey].baseprice*Number(inputs[tempKey].quantity);
      _inputs[tempKey].key   = tempKey;
      _inputs[tempKey].current = current;
      setInputs(_inputs);  
      var total=totalAmount+inputs[tempKey].total_price;  
      console.log(total);
      setTotalAmount(total);
      console.log(totalAmount);  
      _inputs.push({key: '', id:'', current:'', product: '',quantity:'',baseprice:0,total_price:0});
      setInputs(_inputs);
      setSearch('');
      console.log(_inputs);
      setTempKey(tempKey+1);
      console.log(tempKey);
      try{      
        console.log("total" + total);
        const body = {product_id:inputs[tempKey].id, quantity:Number(inputs[tempKey].quantity), date_purchase:onlyDate, time_purchase:onlyTime, total_amount:total, total_price:inputs[tempKey].total_price};
        const response = await fetch('http://localhost:5000/Add_products/'+vRMN+'/'+cRMN, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/JSON'},
            body: JSON.stringify(body)      
        });
        const result = await response.json();
        // alert(result.message);
      }
      catch(err){
        console.error(err.message);
      }  
    }
  }

  
  const inputHandler = (quantity)=>{
    const _inputs = [...inputs];
    _inputs[tempKey].quantity = quantity;
    _inputs[tempKey].total_price = inputs[tempKey].baseprice*inputs[tempKey].quantity;
    _inputs[tempKey].key   = tempKey;
    setInputs(_inputs);    
  }


  // useEffect(() => {    
  //   GetProductDetails();
  //   GetTotalAmount();    
  // } , []);


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
    var dataset = date + '/' + month + '/' + year+'\n'+hours+':'+min+':'+sec;
    setCurrent(dataset); 
    console.log(current);
  }


  return (
    <View style={styles.container}>
      <View style = {{flexDirection:'row', width:'100%',}}> 
      <View style={{width:'75%',flexDirection:'column', alignItems:'center',}}>
        <SearchBar 
          inputStyle={{width:'100%', backgroundColor:'white', borderRadius: 25}}
          containerStyle={{width:'95%', backgroundColor: 'white', borderWidth: 1, borderRadius: 40}}
          inputContainerStyle={{width:'100%', backgroundColor: 'white',borderWidth:1, borderRadius: 40, height:40}}
          backgroundColor = {'white'}
          placeholder="Search Product"
          searchIcon = {false}
          lightTheme = {true}
          cancelIcon = {true}
          backgroundColor = 'white'
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}                     
        />
        {isLoading?
          <View style={styles.listWrapper}>
            <FlatList 
            data = {filteredConsumers}
            renderItem = {({ item }) => {
              return(
                <View>
                {  
                  <Text style = {{fontSize:16, paddingVertical:1}} onPress = {() => {
                    ShowCurrentDate();
                    const _inputs = [...inputs];                  
                    _inputs[tempKey].id = item.id;                      
                    _inputs[tempKey].product = item.name;  
                    _inputs[tempKey].baseprice = item.base_price;                              
                    setInputs(_inputs);
                    _inputs[tempKey].key = tempKey;
                    console.log(tempKey);
                    setSearch(item.name);
                    setIsLoading(false);
                  }}>                
                    {item.name}   ₹ {item.base_price}
                  </Text>
                }                
                </View>
              )
            }}/>
          </View>
        :<Text></Text>}
        </View>

        <View styel={{width:'15%', justifyContent:'center', alignItems:'center',}}>
          <TextInput  placeholder={"Qty"} keyboardType='numeric' onChangeText = {quantity => inputHandler(Number(quantity))}/> 
        </View>
        <View style={{width:'10%',marginLeft:'5%', marginTop:'3%' }}>
          <Button title="+" onPress={()=>addHandler(vRMN, cRMN)} />
        </View> 
      </View>

      <View style = {{width:'100%', marginTop:'3%', height:40,backgroundColor:'skyblue', flexDirection:'row', paddingHorizontal:'2%', paddingTop:'2%', borderRadius:5, borderEndColor:'blue', borderWidth:0.5}}>
        <View style= {{width:'20%'}}>
          <Text style={{fontSize:15, fontWeight:'bold'}}>Date</Text>
        </View>
        <View style= {{width:'41%'}}>
          <Text style={{fontSize:15, fontWeight:'bold',}} > Product </Text>
        </View>
        <View style= {{width:'13%'}}>
          <Text  style={{fontSize:15, fontWeight:'bold'}}>BP</Text>
        </View>
        <View style= {{width:'13%'}}>
          <Text style={{fontSize:15, fontWeight:'bold'}} >Qty</Text>
        </View>
        <View style= {{width:'13%'}}>
          <Text style={{fontSize:15, fontWeight:'bold'}} >Tot </Text>
        </View>
      </View>

      <ScrollView  vertical >          
      {inputs.map((input, key)=>(
      <View style = {{width:'100%', marginTop:'0.5%',paddingTop:'2%',paddingLeft:'2%', height:50,backgroundColor:'white', flexDirection:'row', borderRadius:5}}>
        <View style= {{width:'20%'}}>
          <Text >{inputs[key].current}</Text>
        </View>
        <View style= {{width:'41%'}}>
          <Text >   {inputs[key].product} </Text>
        </View>
        <View style= {{width:'13%'}}>
          <Text >{inputs[key].baseprice}</Text>
        </View>
        <View style= {{width:'13%'}}>
          <Text >{inputs[key].quantity}</Text>
        </View>
        <View style= {{width:'13%'}}>
          <Text >{inputs[key].total_price}</Text>
        </View>
      </View>   
      )
      )}
      </ScrollView>
      <View style = {styles.TotalAmountText}> 
        <Text style={{color:'white', fontWeight:'bold', textAlign:'center'}}>Total Udhaari</Text>
        <Text style={{color:'white', fontWeight:'bold', textAlign:'center'}}>₹ {totalAmount}</Text>
      </View>
  </View>

  );
}


const styles = StyleSheet.create({

  container: {
    width : '100%',
    height:'100%',
    flex: 1,
    padding: '2%',
    backgroundColor : '#EAF2F4',
  },

  listWrapper : {
    marginTop:'1%',
    flexDirection : 'row',
    backgroundColor:'white',
    marginHorizontal:'5%',
    paddingHorizontal:'5%',
    borderRadius:5,
    backgroundColor:'#EAF2F4'
   // flexWrap : 'wrap',
    // borderBottomWidth : 1
  },


  listWrapper1 : {
    marginTop:'10%',
    flexDirection : 'row',
    borderBottomWidth : 1,
    backgroundColor:'green',
  },


  TotalAmountText :{
    flexDirection:'column',
    alignSelf:'flex-end',
    padding: '3%',
    borderRadius: 10, 
    width: '40%', 
    // height:'10%',
    marginBottom:'5%',
    marginRight:'4%',
    backgroundColor: '#f55864'
  },
  
  // MainContainer:{
  //   width : 300,
  //   paddingBottom : 30
  // },
})


export default Add_products;