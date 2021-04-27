//React Native Imports
import 'react-native-gesture-handler';
// import * as React from 'react';


import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';


const Add_products = () => {
  const [search, setSearch] = useState('');
  const [tempKey, setTempKey] = useState(0);
  const [current, setCurrent] = useState('');
  const [consumers , setConsumers] = useState([]);
  const [totalAmount , setTotalAmount] = useState(0);
  const [onlyDate, setOnlyDate] = useState('');
  const [onlyTime, setOnlyTime] = useState('');
  
  const [inputs, setInputs] = useState([{key: '', id:'', current:'', product: '',quantity: '' ,baseprice:0,totalprice:0}]);  
  const [filteredConsumers, setFilteredConsumers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const GetProductDetails = () => {
    fetch('http://localhost:5000/Add_products/product')
    .then((response) => response.json())
    .then((result) => {
      setConsumers(result);
      setFilteredConsumers(result);
    })
    .catch((error) => {
      console.error(error);
    });
  }


  const GetTotalAmount = () => {
    console.log("TOTAL CLIENT");
    var vRMN = 1;
    var cRMN = 12;
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


  const addHandler = async () => {   

    if(inputs[tempKey].product==''){
      alert('Enter The Product');
    }
    else if(inputs[tempKey].quantity==''){
      alert('Enter The Quantity');
    }
    else{
      const _inputs = [...inputs];
      _inputs[tempKey].totalprice = inputs[tempKey].baseprice*inputs[tempKey].quantity;
      _inputs[tempKey].key   = tempKey;
      _inputs[tempKey].current = current;
      setInputs(_inputs);  
      var total=totalAmount+inputs[tempKey].totalprice;  
      console.log(total);
      setTotalAmount(total);
      console.log(totalAmount);  
      _inputs.push({key: '', id:'', current:'', product: '',quantity:'',baseprice:0,totalprice:0});
      setInputs(_inputs);
      setSearch('');
      console.log(_inputs);
      setTempKey(tempKey+1);
      console.log(tempKey);
      try{      
        console.log("total" + total);
        var vRMN = 9196191919;
        var cRMN = 7678697696;
        const body = {product_id:inputs[tempKey].id, quantity:Number(inputs[tempKey].quantity), date_purchase:onlyDate, time_purchase:onlyTime, total_amount:total};
        const response = await fetch('http://localhost:5000/Add_products/'+vRMN+'/'+cRMN, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/JSON'},
            body: JSON.stringify(body)      
        });
        const result = await response.json();
        alert(result.message);
      }
      catch(err){
        console.error(err.message);
      }  
    }
  }

  
  const inputHandler = (quantity)=>{
    const _inputs = [...inputs];
    _inputs[tempKey].quantity = quantity;
    _inputs[tempKey].totalprice = inputs[tempKey].baseprice*inputs[tempKey].quantity;
    _inputs[tempKey].key   = tempKey;
    setInputs(_inputs);    
  }


  useEffect(() => {    
    GetProductDetails();
    GetTotalAmount();    
  } , []);


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
      <View style = {{flexDirection:'row', width:'100%', justifyContent:'center', backgroundColor:'cyan'}}> 
      <View style={{width:'50%',flexDirection:'column', justifyContent:'center', alignItems:'center',backgroundColor:'brown',
      marginLeft:'5%', marginTop:'5%'
      }}>
        <SearchBar 
          inputStyle={{width:'50%'}}
          containerStyle={{width:'100%'}}
          backgroundColor = {'white'}
          placeholder="product"
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
                  <Text style = {styles.row} onPress = {() => {
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
                    {item.name} {item.base_price}
                  </Text>
                }                
                </View>
              )
            }}/>
          </View>
        :<Text></Text>}
        </View>

        <View styel={{width:'20%', justifyContent:'center', alignItems:'center',backgroundColor:'yellow'}}>
       <TextInput  placeholder={"Qty"} keyboardType='numeric' onChangeText = {quantity => inputHandler(Number(quantity))}/>
       
        </View>
        <View style={{width:'20%', alignItems:'flex-end',backgroundColor:'orange'}}>
          <Button title="+" onPress={()=>addHandler()} />
        </View> 
      </View>

      <View style = {styles.listWrapper1}>
                  <Text style = {styles.row}>Date</Text>
                  {/* <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text> */}
                  
                  <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                  <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                  <Text style = {styles.row}>Product </Text>
                  
                  <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                  <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                  
                  <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                  <Text></Text>
                  <Text style = {styles.row}>BP</Text>
                  {/* <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text> */}
                  <Text style = {styles.row}>QTY</Text>
                  {/* <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text> */}
                  <Text style = {styles.row}>Total </Text>
                  {/* <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text> */}
                  {/* <Text style = {styles.row}>Add</Text>             */}
              </View>


      <ScrollView  style={styles.inputsContainer}>          
      {inputs.map((input, key)=>(
        <View style={styles.inputContainer}>          
          {/* <Text>{current}</Text> */}
          <Text>{inputs[key].current}</Text> 
          {/* <StatusBar style='auto' /> */}
          {/* <View style = {styles.MainContainer}> */}
                    
          {/* <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text> */}
          <Text>{inputs[key].product}</Text> 
          <Text>{inputs[key].baseprice}</Text> 
          <Text>{inputs[key].quantity}</Text> 
          <Text>{inputs[key].totalprice}</Text> 
          

          
        </View>
       
      )
      )}
      </ScrollView>
      <View style = {styles.TotalAmountText}> 
        <Text>TOTAL AMOUNT</Text>
        <Text>{totalAmount}</Text>
      </View>
  </View>

  );
}


const styles = StyleSheet.create({

  container: {
    width : '100%',
    flex: 1,
    padding: 20,
    backgroundColor: 'blue'
  },
  inputsContainer: {
    flex: 1, marginBottom: 20,
    backgroundColor:'pink',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    marginTop:'1%',
    backgroundColor:'gray',
  },

  listWrapper : {
    marginTop:'3%',
    flexDirection : 'row',
    backgroundColor:'brown',
   // flexWrap : 'wrap',
    borderBottomWidth : 1
  },


  listWrapper1 : {
    marginTop:'20%',
    flexDirection : 'row',
   // flexWrap : 'wrap',
    borderBottomWidth : 1,
    backgroundColor:'green',
  },



  row: {
    //backgroundColor : '#fff',
    flex : 1,
    //fontSize : 15,
    //paddingHorizontal : 45,
    //paddingVertical : 15
  },

  TotalAmountText :{
    color:'black',
    fontWeight:'bold',
    textAlign: 'center',
    fontSize: 15,
    alignSelf:'flex-end',
    padding: 10,
    borderRadius: 5, 
    width: '100%', 
    backgroundColor: 'rgb(88, 149, 164)'
  },
  
  // MainContainer:{
  //   width : 300,
  //   paddingBottom : 30
  // },
})


export default Add_products;