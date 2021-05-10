import 'react-native-gesture-handler';
// import * as React from 'react';


import React, { useEffect, useState, useCallback } from 'react'
import { View,SafeAreaView, Text, Button, TextInput, Image,TouchableOpacity, StyleSheet, ScrollView, ToastAndroid, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import Modal from 'react-native-modal';

// import * as SecureStore from 'expo-secure-store';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';



const New_product = () => {

    // const [vRMN, setvRMN] = useState();
    // const [cRMN, setcRMN] = useState();
    const [consumers , setConsumers] = useState([]);
    const [filteredConsumers, setFilteredConsumers] = useState([]);
    const [search, setSearch] = useState('');
    const [product, setProduct] = useState('');
    const [baseprice, setBasePrice] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();
   
    async function getValueFor() {
        // let vRMN = await SecureStore.getItemAsync('vendorContact');
        // let cRMN = await SecureStore.getItemAsync('consumerContact');
        // setvRMN(vRMN);
        // setcRMN(cRMN);
    setProduct('');
    setBasePrice('');

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
    }

    // useEffect(() => {
    //   getValueFor()
    // }, []);


    useEffect(() => {
      getValueFor()
    }, []);
    
    useFocusEffect(
      useCallback(() => {
        getValueFor();  
      }, [])
    );
    


    const toggleModal = () => {
        
        setModalVisible(!isModalVisible);
      };
    
      const searchFilterFunction = (text) => {
        if (text) {
          const newData = consumers.filter(function (item) {
            var itemData;
            if(isNaN(text)){
              itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
            }
                 
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredConsumers(newData);
          setSearch(text);
        }
        else {
          setFilteredConsumers(consumers);
          setSearch(text);
            }
            
      }
      const onPressDelete = async () => {
    
        setModalVisible(!isModalVisible);
    
      }
      const onPressProduct = async () => {
    
        if(!product.trim()){
          // alert('Threshold Missing')
          ToastAndroid.showWithGravity(
           "Product Name Missing!!!",
           ToastAndroid.SHORT,
           ToastAndroid.CENTER
         );
         }
         else if(!baseprice.trim()){
          // alert('Threshold Missing')
          ToastAndroid.showWithGravity(
           "Base Price Missing!!!",
           ToastAndroid.SHORT,
           ToastAndroid.CENTER
         );
         }
        
         else{
          
          try{                          
            const body = {name : product , base_price : baseprice };
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
          catch(err){
            console.error(err.message);
          }
        }       
      }
    
    
   return (
        <SafeAreaView style={{ flex: 1 , paddingTop:'11%', height:'100%', width:'100%', backgroundColor:'#EAF2F4'}}>
        <View style={{height:'90%'}}>
        <View style={{widht:'100%', alignItems:'center', paddingTop:'2%'}}>
          <SearchBar 
          inputStyle={{width:'100%', backgroundColor:'white', borderRadius: 25}}
          containerStyle={{width:'90%', backgroundColor: 'white', borderWidth: 1, borderRadius: 40}}
          inputContainerStyle={{width:'100%', backgroundColor: 'white', borderRadius: 40, height:35}}
          backgroundColor = {'white'}
          placeholderTextColor = 'black'
          platform='lightTheme'
          fontSize= {15}
          placeholder="Enter Product Name....."
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}          
          />              
         
        </View>
        <View style = {styles.body}>
            <View style = {styles.listWrapper1}>
              <Text style = {styles.row1}>Product Name </Text>
              <Text style = {styles.row3}>Base Price</Text>
            </View>
            <FlatList 
            data = {filteredConsumers}
            renderItem = {({ item }) => {
            return(
            <View style = {styles.listWrapper}>
                <Text style = {styles.row}>
                  {item.name} 
                </Text>
                <Text style = {styles.row2}>
                ₹ {(item.base_price).toFixed(2)}
                </Text>
            </View>
            )
            }}/>
        </View>
        </View>
    <View style={styles.MainContainer}>
        <View style={{width:'50%', alignItems:'flex-start', paddingLeft:'7%'}}>
        <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.goBack()}>
            <Text style={{color:'white', fontWeight:'bold', textAlign:'center'}}>Close</Text>
        </TouchableOpacity>
        </View>
        <View style={{width:'50%', alignItems:'flex-end', paddingRight:'5%'}}>
        <TouchableOpacity activeOpacity={1.5} onPress={toggleModal} style={styles.TouchableOpacityStyle1} >
            <Image source={require('../../assets/floating.png')} onPress={toggleModal} style={styles.FloatingButtonStyle } />
        </TouchableOpacity>
        </View>
    </View>

    <View> 
    <Modal isVisible={isModalVisible}  transparent={true} backgroundColor = "#EAF2F4" height='90%' alignItems = "center" >
      <View style={{ justifyContent: 'center', padding:'5%', alignItems: 'center',borderRadius:30,backgroundColor:'white',height : 400, width : '95%',  flexDirection: 'column', flex: 0}}>
          <Text style={{fontWeight:'bold', fontSize:17}}>ADD NEW PRODUCT</Text>
      <View style={{flexDirection:'row',width: '100%', marginTop:'10%'}}>
                  <Text  style={{alignItems:'flex-start', width:'50%', fontWeight:"bold", fontSize:15}}> Product Name : </Text>
                  <TextInput
                    textAlign='right'
                    style={{width:'50%'}}
                    placeholder = 'Product Name'
                    onChangeText={(product) =>  setProduct(product)}
                    value={product}/>                                          
                </View>
                <View style={{flexDirection:'row',width: '100%', marginTop:'3%'}}>
                  <Text  style={{alignItems:'flex-start', width:'50%', fontWeight:"bold", fontSize:15}}> Base Price :</Text>
                  <TextInput
                    textAlign='right'
                    keyboardType='numeric'
                    style={{width:'50%'}}
                    placeholder = 'base price'
                    onChangeText={(baseprice) =>  setBasePrice(baseprice)}
                    value={baseprice}/>                                          
                </View>
                
                <View style={{flexDirection:'row' ,width: '100%', marginTop:'10%', marginBottom:'5%'}}>
                  <View style={{width:'50%', paddingHorizontal:'13%'}}>
                    <Button title="ADD" color='green' onPress={() => {onPressProduct()}} />
                  </View>
                  <View style={{width:'50%', paddingHorizontal:'13%'}}>
                    <Button title="Cancel" color='red'  onPress={() => {onPressDelete()}} />    
                  </View>
                </View>
       </View>
      </Modal>

    </View>  
                       
    </SafeAreaView> 
      );  
      

}

const styles = StyleSheet.create({

  MainContainer: {
    flexDirection:'row',
    alignItems:'center',
    height:'15%',
    marginTop:'5%',
    width:'100%',
    // marginBottom:'10%',
    justifyContent: 'center',
    // alignItems: 'stretch',
  //  marginBottom: 1,
    paddingBottom : '21%',
    // marginLeft:'80%'
  },

  loginBtn: {
    width: '50%',
    borderRadius: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f55864',
    // borderWidth:1,
    // borderColor:'green'
  },
 
  TouchableOpacityStyle1:{
 
    // position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: '10%',
    bottom: '8%',
    flex: 1,
  },
 
  FloatingButtonStyle: {
 
    resizeMode: 'contain',
    width: 70,
    height: 70,
  },


    body: {
        backgroundColor : '#EAF2F4',
        // borderWidth:2,
        borderRadius:15,
        flex : 1,
        marginTop: '5%',
        marginBottom:'2%',
        height: '100%',
        width: '96%',
        marginHorizontal:'2%',
        backgroundColor:'white'
      },
      listWrapper : {
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems:'center',
        flexWrap : 'wrap',
        borderBottomWidth : 0.5,
        borderStartColor: 'gray'
  
      },
      listWrapper1 : {
        width:'100%',
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems:'center',
        flexWrap : 'wrap',
        borderBottomWidth : 2,
  
      },
      row: {
        //backgroundColor : '#fff',
        flex : 1,
        fontSize : 15,
        fontWeight:'bold',
        color:'#484848',
        paddingHorizontal : '10%',
        paddingVertical : 15
      },
      row2: {
        //backgroundColor : '#fff',
        textAlign:'right',
        paddingHorizontal:'10%',
        flex : 1,
        fontSize : 15,
        fontWeight:'bold',
        color:'#484848',
        // paddingHorizontal : 45,
        paddingVertical : 15
      },
      row1: {
        //backgroundColor : '#fff',
        width:'50%',
        flex : 1,
        fontSize : 18,
        fontWeight:'bold',
        color:'#484848',
        fontStyle:'italic' ,
        paddingHorizontal : '8%',
        paddingVertical : 15,
      },
      row3: {
        //backgroundColor : '#fff',
        width:'50%',
        textAlign:'right',
        flex : 1,
        fontSize : 18,
        fontWeight:'bold',
        color:'#484848',
        fontStyle:'italic' ,
        paddingHorizontal : '8%',
        paddingVertical : 15,
      }
})
export default New_product;