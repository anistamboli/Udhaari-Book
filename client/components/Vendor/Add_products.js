//React Native Imports
import 'react-native-gesture-handler';
// import * as React from 'react';


import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

import Modal from 'react-native-modal';

import * as SecureStore from 'expo-secure-store';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';

import InputSpinner from "react-native-input-spinner";

const Add_products = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [tempKey, setTempKey] = useState(0);
  const [current, setCurrent] = useState((new Date()).toDateString());
  const [consumers, setConsumers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tempTotalAmount, setTempTotalAmount] = useState(0);
  const [currentTotalAmount, setCurrentTotalAmount] = useState(0);
  const [onlyDate, setOnlyDate] = useState('');
  const [onlyTime, setOnlyTime] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState('');
  const [baseprice, setBasePrice] = useState('');

  const [vRMN, setvRMN] = useState();
  const [cRMN, setcRMN] = useState();

  const [inputs, setInputs] = useState([]);
  const [filteredConsumers, setFilteredConsumers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddHandlerClicked, setIsAddHandlerClicked] = useState(false);

  const [arrayKey, setArrayKey] = useState('');
  const [arrayId, setArrayId] = useState('');
  const [arrayProduct, setArrayProduct] = useState();
  const [arrayQuantity, setArrayQuantity] = useState('1');
  const [arrayBasePrice, setArrayBasePrice] = useState(0);
  const [arrayTotalPrice, setArrayTotalPrice] = useState(0);

  const [transactionId, setTransactionId] = useState(0);

  async function getValueFor() {
    let vRMN = await SecureStore.getItemAsync('vendorContact');
    let cRMN = await SecureStore.getItemAsync('consumerContact');
    setvRMN(vRMN);
    setcRMN(cRMN);

    var d = new Date();
    var n = d.getTime();
    setTransactionId(n);

    setProduct('');
    setBasePrice('');

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
    fetch('http://localhost:5000/Add_products/total_amount/' + vRMN + '/' + cRMN)
      .then((response) => response.json())
      .then((result) => {
        // console.log("DDDd");
        setTotalAmount(result);
        // console.log(totalAmount);
        ShowCurrentDate();

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

  //  useEffect(() => {
  //   getValueFor();
  // },[]);


  const AddRow = () => {
    console.log("ADD" + tempKey);
    const _inputs = [...inputs];
    _inputs.push({ key: '', id: '', current: '', product: '', quantity: 1, baseprice: '', total_price: '' });
    // setInputs(_inputs);  
    _inputs[tempKey].key = tempKey;
    _inputs[tempKey].id = arrayId;
    _inputs[tempKey].product = arrayProduct;
    _inputs[tempKey].baseprice = arrayBasePrice;
    _inputs[tempKey].quantity = arrayQuantity;
    _inputs[tempKey].total_price = _inputs[tempKey].baseprice * _inputs[tempKey].quantity;
    setInputs(_inputs);


    // const _inputs = [...inputs];
    // _inputs.push({key: '', id:'', current:'', product: '',quantity:1,baseprice:'',total_price:''});
    // setInputs(_inputs);

    console.log("AFTER ADD" + tempKey);
    console.log(_inputs);


    var tempTotalAmount = totalAmount + _inputs[tempKey].total_price;
    setTotalAmount(tempTotalAmount);
    setCurrentTotalAmount(currentTotalAmount + _inputs[tempKey].total_price);


    var changeTempKey = tempKey + 1;
    console.log(changeTempKey);
    setTempKey(changeTempKey);
    console.log('TempKey' + tempKey);
    setSearch('');
    setArrayQuantity('1');
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


  const toggleModal = () => {

    setModalVisible(!isModalVisible);
  };

  const onPressDelete = async () => {

    setModalVisible(!isModalVisible);

  }
  const onPressProduct = async () => {

    if (!product.trim()) {
      // alert('Threshold Missing')
      ToastAndroid.showWithGravity(
        "Product Name Missing!!!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
    else if (!baseprice.trim()) {
      // alert('Threshold Missing')
      ToastAndroid.showWithGravity(
        "Base Price Missing!!!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }

    else {

      try {
        const body = { name: product, base_price: baseprice };
        const response = await fetch('http://localhost:5000/Add_products/new_product', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/JSON'
          },
          body: JSON.stringify(body)
        });
        const result = await response.json();

        // alert(result.message);
        ToastAndroid.showWithGravity(
          result.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setModalVisible(!isModalVisible);
        getValueFor()
      }
      catch (err) {
        console.error(err.message);
      }
    }
  }



  const addHandler = async (vRMN, cRMN) => {
    if (arrayProduct == '') {
      ToastAndroid.showWithGravity(
        "Enter the product",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    else if (arrayQuantity == '') {
      ToastAndroid.showWithGravity(
        "Enter valid quantity",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    else if (!isNaN(arrayQuantity) && Number(arrayQuantity) < 0.1) {
      ToastAndroid.showWithGravity(
        "Invalid Quantity",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    else {
      console.log('BP' + arrayBasePrice);
      console.log('Q' + arrayQuantity);
      var tempTotalPrice = arrayBasePrice * arrayQuantity
      console.log(tempTotalPrice);
      setArrayTotalPrice(tempTotalPrice);
      console.log('dwwew' + arrayTotalPrice);
      AddRow();
      setIsAddHandlerClicked(true);
    }
  }


  const deleteHandler = key => {
    console.log('bDeletekey' + key);
    console.log('bDeletetempkey' + tempKey);
    const values = [...inputs];
    setTotalAmount(totalAmount - values[key].total_price);
    setCurrentTotalAmount(currentTotalAmount - values[key].total_price);
    values.splice(values.findIndex(_inputs => _inputs.key === key), 1);
    setInputs(values);
    console.log(inputs.length);
    console.log('aDeletekey' + key);
    console.log('aDeletetempkey' + tempKey);
    setTempKey(inputs.length - 1);
  }


  const inputHandler = (quantity) => {
    if (isNaN(quantity)) {
      ToastAndroid.showWithGravity(
        "Invalid Quantity",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    else {
      setArrayQuantity(quantity);
    }
  }


  // useEffect(() => {    
  //   GetProductDetails();
  //   GetTotalAmount();    
  // } , []);



  const addToRecords = async () => {
    console.log(transactionId);
    console.log(onlyDate);
    console.log(onlyTime);

    try {
      const body = { id: transactionId, type: 'purchase', transaction_amount: currentTotalAmount, transaction_date: onlyDate, transaction_time: onlyTime };
      const response = await fetch('http://localhost:5000/Add_products/transaction/' + vRMN + '/' + cRMN, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      if (result.success == true) {
        console.log('TRUEEEEEEEE');
        var i;
        for (i = 0; i < inputs.length; i++) {
          const body = { product_id: inputs[i].id, quantity: Number(inputs[i].quantity), date_purchase: onlyDate, time_purchase: onlyTime, total_price: Number(inputs[i].total_price), tr_id: transactionId, total_amount: Number(totalAmount) };
          const response = await fetch('http://localhost:5000/Add_products/' + vRMN + '/' + cRMN, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(body)
          });
          const result = await response.json();
          // console.log(result);
        }
        ToastAndroid.showWithGravity(
          "Bill Added Successfully",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        inputs.splice(0, inputs.length);
        // console.log(inputs);
        setIsAddHandlerClicked(false);
        setCurrentTotalAmount(0)
      }
      else {
        console.log('Falseeeeeee');
      }

    }
    catch (err) {
      console.error(err.message);
    }
  }


  const ShowCurrentDate = () => {
    // console.log(new Date());
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var tempOnlyDate = date + '-' + month + '-' + year;
    setOnlyDate(tempOnlyDate);
    // console.log(onlyDate);
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    var tempOnlyTime = hours + ':' + min + ':' + sec;
    setOnlyTime(tempOnlyTime);
    // console.log(onlyTime);
    var dataset = hours + ':' + min + ':' + sec + '  ' + date + '/' + month + '/' + year;
    setCurrent(dataset);
    // console.log(current);   
  }


  return (
    <View style={styles.container}>
      <View style={{ width: '100%', flexDirection: 'row', marginTop: '1%', paddingHorizontal: '3%' }}>
        <TouchableOpacity style={{ width: '50%' }} onPress={() => { navigation.navigate('New Product') }}>
          <Text style={{ fontSize: 14, width: '100%', textAlign: 'left', color: 'blue' }} >View All Products</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '50%' }} onPress={toggleModal}>
          <Text style={{ fontSize: 14, width: '100%', textAlign: 'right', color: 'blue' }} >Add New Product</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible} transparent={true} backgroundColor="#EAF2F4" height='90%' alignItems="center" >
        <View style={{ justifyContent: 'center', padding: '5%', alignItems: 'center', borderRadius: 30, backgroundColor: 'white', height: 400, width: '95%', flexDirection: 'column', flex: 0 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>ADD NEW PRODUCT</Text>
          <View style={{ flexDirection: 'row', width: '100%', marginTop: '10%' }}>
            <Text style={{ alignItems: 'flex-start', width: '50%', fontWeight: "bold", fontSize: 15 }}> Product Name : </Text>
            <TextInput
              textAlign='right'
              style={{ width: '50%' }}
              placeholder='Product Name'
              onChangeText={(product) => setProduct(product)}
              value={product} />
          </View>
          <View style={{ flexDirection: 'row', width: '100%', marginTop: '3%' }}>
            <Text style={{ alignItems: 'flex-start', width: '50%', fontWeight: "bold", fontSize: 15 }}> Base Price :</Text>
            <TextInput
              textAlign='right'
              keyboardType='numeric'
              style={{ width: '50%' }}
              placeholder='base price'
              onChangeText={(baseprice) => setBasePrice(baseprice)}
              value={baseprice} />
          </View>

          <View style={{ flexDirection: 'row', width: '100%', marginTop: '10%', marginBottom: '5%' }}>
            <View style={{ width: '50%', paddingHorizontal: '13%' }}>
              <Button title="ADD" color='green' onPress={() => { onPressProduct() }} />
            </View>
            <View style={{ width: '50%', paddingHorizontal: '13%' }}>
              <Button title="Cancel" color='red' onPress={() => { onPressDelete() }} />
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ flexDirection: 'row', width: '100%', marginTop: '2%', }}>
        <View style={{ width: '71%', flexDirection: 'column', alignItems: 'center', paddingHorizontal: '1%', }}>
          <SearchBar
            inputStyle={{ width: '100%', backgroundColor: 'white', borderRadius: 25 }}
            containerStyle={{ width: '100%', backgroundColor: 'white', borderRadius: 40 }}
            inputContainerStyle={{ width: '90%', backgroundColor: 'white', borderRadius: 40, height: 30, }}
            backgroundColor={'white'}
            placeholder="Search Product"
            searchIcon={false}
            lightTheme={true}
            cancelIcon={true}
            backgroundColor='white'
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            value={search}
          />
          {isLoading ?
            <View style={styles.listWrapper}>
              <FlatList
                data={filteredConsumers}
                renderItem={({ item }) => {
                  return (
                    <View>
                      {
                        <Text style={{ fontSize: 16, paddingVertical: 1 }} onPress={() => {
                          ShowCurrentDate();
                          setArrayId(item.id);
                          setArrayProduct(item.name);
                          setArrayBasePrice(item.base_price);
                          console.log(tempKey);
                          setSearch(item.name);
                          setIsLoading(false);
                        }}>
                          {item.name}   ₹ {item.base_price}
                        </Text>
                      }
                    </View>
                  )
                }} />
            </View>
            : <Text></Text>}
        </View>
        <TextInput
          style={{ height: 40, marginTop: '1%', backgroundColor: 'white', textAlign: 'center', borderWidth: 0.25, borderRadius: 3, width: '15%', marginLeft: '1%' }}
          placeholder={" Qty"}
          keyboardType='numeric'
          value={arrayQuantity}
          onChangeText={quantity => inputHandler(Number(quantity))}
        />
        <View style={{ width: '12%', marginTop: '1%', paddingLeft: '2%' }}>
          <Button title="+" onPress={() => addHandler(vRMN, cRMN)} />
        </View>
      </View>

      <Text style={{ fontSize: 15, width: '100%', fontWeight: 'bold', textAlign: 'right', }}>{onlyDate}</Text>

      <View style={{ width: '100%', marginTop: '1%', height: 40, backgroundColor: 'skyblue', flexDirection: 'row', paddingHorizontal: '2%', paddingTop: '2%', borderRadius: 5, borderEndColor: 'blue', borderWidth: 0.5 }}>
        <View style={{ width: '38%' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', }} > Product </Text>
        </View>
        <View style={{ width: '15%' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf: 'flex-end' }}>BP</Text>
        </View>
        <View style={{ width: '22%' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf: 'center' }}>   Qty</Text>
        </View>
        <View style={{ width: '15%' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf: 'flex-end' }}>Tot </Text>
        </View>
        <View style={{ width: '10%' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf: 'flex-end' }}></Text>
        </View>
      </View>
      <ScrollView vertical >
        {isAddHandlerClicked
          ? inputs.map((input, key = 0) =>
          (
            <View style={{ width: '100%', marginTop: '0.5%', paddingTop: '2%', paddingLeft: '2%', height: 50, backgroundColor: 'white', flexDirection: 'row', borderRadius: 5 }}>
              <View style={{ width: '38%' }}>
                {console.log("MAAAp" + key)}
                <Text >{inputs[key].product}</Text>
              </View>
              <View style={{ width: '15%' }}>
                <Text style={{ textAlign: 'right' }}>{(inputs[key].baseprice).toFixed(1)}</Text>
              </View>
              <View style={{ width: '22%', marginTop: '0%', paddingLeft: '2%', alignItems: 'flex-end' }}>
                <InputSpinner
                  style={{ width: '90%', height: 5 }}
                  max={100}
                  min={0}
                  rounded={false}
                  showBorder={true}
                  fontSize={14}
                  // background={'transparent'}
                  color={'gray'}
                  width={10}
                  height={25}
                  type={'real'}
                  step={1}
                  colorMax={"#f04048"}
                  colorMin={"#40c5f4"}
                  value={inputs[key].quantity}
                  onChange={quantity => {
                    console.log('GGHVHJGKJGKJGJK' + key);
                    console.log('inputs[key].quantity' + inputs[key].quantity);
                    if (quantity === 0) {
                      console.log('dfdfd');
                      console.log('quantity' + quantity);
                      deleteHandler(key);
                    }
                    else if (quantity > inputs[key].quantity) {
                      setTotalAmount(totalAmount + inputs[key].baseprice);
                      setCurrentTotalAmount(currentTotalAmount + inputs[key].baseprice);
                    }
                    else {
                      setTotalAmount(totalAmount - inputs[key].baseprice);
                      setCurrentTotalAmount(currentTotalAmount - inputs[key].baseprice);
                    }
                    inputs[key].quantity = Number(quantity);
                    inputs[key].total_price = inputs[key].baseprice * inputs[key].quantity;
                    setInputs(inputs);
                    console.log('After inputs[key].quantity' + inputs[key].quantity);
                    var tempTotalAmount = totalAmount + inputs[key].total_price;
                    setTempTotalAmount(tempTotalAmount);
                  }
                  } />
              </View>
              <View style={{ width: '15%' }}>
                <Text style={{ textAlign: 'right' }}>{(inputs[key].total_price).toFixed(1)}</Text>
              </View>
              <View style={{ width: '10%' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf: 'flex-end', paddingRight: '20%', color: 'red' }} onPress={() => deleteHandler(key)}>X</Text>
              </View>
            </View>
          )
          )
          : <Text></Text>}
      </ScrollView>
      <View style={{ flexDirection: 'row', width: '100%', alignContent: 'center', }}>
        <View style={styles.TotalAmountText}>
          <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Total Udhaari</Text>
          <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>₹ {(totalAmount).toFixed(2)}</Text>
        </View>
        <View style={styles.CurrentTotalAmountText}>
          <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }} onPress={addToRecords}>Add Current Bill</Text>
          <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }} onPress={addToRecords}>₹ {(currentTotalAmount).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    padding: '2%',
    backgroundColor: '#EAF2F4',
  },

  listWrapper: {
    marginTop: '1%',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: '5%',
    paddingHorizontal: '5%',
    borderRadius: 5,
    backgroundColor: '#EAF2F4'
    // flexWrap : 'wrap',
    // borderBottomWidth : 1
  },


  listWrapper1: {
    marginTop: '10%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: 'green',
  },


  TotalAmountText: {
    width: '40%',
    flexDirection: 'column',
    alignSelf: 'flex-end',
    padding: '2%',
    // borderRadius: 10, 
    marginHorizontal: '5%',
    // height:'10%',
    marginBottom: '5%',
    // marginRight:'4%',
    backgroundColor: '#EAF2F4'
  },

  CurrentTotalAmountText: {
    width: '40%',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    padding: '2%',
    // borderRadius: 10,
    marginHorizontal: '5%',

    // height:'10%',
    marginBottom: '5%',
    // marginLeft:'4%',
    backgroundColor: 'skyblue'
  }

  // MainContainer:{
  //   width : 300,
  //   paddingBottom : 30
  // },
})


export default Add_products;