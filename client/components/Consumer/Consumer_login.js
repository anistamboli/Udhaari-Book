
import { StatusBar } from 'expo-status-bar';
// import { response } from 'express';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function Consumer_login() {
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    async function SaveConsumerContact(value) {
      await SecureStore.setItemAsync('consumerMob', value);
      setContact('');
      setPassword('');
    }

    const OnPressRegister = () => {
      navigation.navigate('Consumer Registration');
    }

    const OnPressLogin = async (contact) => {
      // var result = parseInt(reqId); 
      if(!contact.trim() && !password.trim()){
        alert('Please Enter RMN and password');
        return;
      }
      if(!contact.trim()){
        alert('Please Enter Your Contact Number');
        return;
      }
      // if(contact>10000000000 || contact<999999999){
      //   alert("Required 10 Digit Contact Number");
      //   return;
      // }
      if(!password.trim()){
        alert('Please Enter Your Password');
        return;
      }


      else{
        // console.log(contact)
        const response = await axios.get('http://localhost:5000/Consumer_login', {params:{
          contact }})
          .then((response)=> {
            const validPassword = response.data.password
            Check(validPassword)
          })
            // console.log(validPassword) 
          .catch((error)=>{
          console.log(error)
          })

          
        function Check(validPassword){
          if(validPassword==undefined){
            alert('user not found');
            return;
          }
          if(password===validPassword){
            // alert('welcome...');
            SaveConsumerContact(contact)
            navigation.navigate('Consumer Dashboard')
            return;
          }
          if(password!==validPassword){
            alert('invalid password... Try again');
            return;
          }
        }
      }
 }
      
    // const OnPressForgotPassword = () => {
    //     alert('Forgot Password?')
    // };
   
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{color: 'black', fontSize: 25, fontWeight:'bold', paddingBottom:'4%', paddingTop:'10%'}}> 
            Consumer Login
        </Text>
        <Image style={styles.image} source={require('../../assets/log.jpg')} />

        <StatusBar style='auto' />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder='Registered Mobile Number'
            placeholderTextColor='#000'
            keyboardType='numeric'
            // value={Number}
            textAlign='center'
            maxLength={10}
            onChangeText={(contact) => setContact(contact)}
            value ={contact}/>
        </View>
   
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder='Password'
            placeholderTextColor='#000'
            secureTextEntry={true}
            textAlign='center'
            onChangeText={(password) => setPassword(password)}
            value = {password}/>
        </View>
   
        {/* <TouchableOpacity>
          <Text style={styles.forgot_button} onPress={OnPressForgotPassword}>Forgot Password?</Text>
        </TouchableOpacity> */}
   
        <TouchableOpacity style={styles.loginBtn} onPress={()=>{OnPressLogin(contact)}}>
          <Text style={styles.TextInput1}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.register_button}>
          <Text style={styles.textstyle}>New User? </Text>
          <Text style={styles.textstyle1} onPress={()=>{OnPressRegister()}}>Register now...</Text>
        </TouchableOpacity>

      </SafeAreaView>
    );
  }
   
  const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 0,
        backgroundColor: '#edf7fc',
        alignItems: 'center',
        // justifyContent: 'center',
        // padding: 60
        // paddingTop:'40%'
        
    },
   
    image: { 
        width: 200, 
        height: 200,
        marginBottom: '5%',
        borderRadius: 100
    },
   
    inputView: {
        borderColor:'skyblue',
        backgroundColor: 'white',
        borderWidth:1,
        borderRadius: 20,
        width: '75%',
        height: 52,
        marginBottom: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
   
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        fontSize: 16
    },

    TextInput1: {
      height: 50,
      flex: 1,
      padding: 10,
      fontSize: 16,
      color:'white', 
      fontWeight:'bold'
  },
   
    textstyle: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16
    },

    textstyle1: {
      color: '#109dcc',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16
    },

    register_button: {
      marginTop: '50%',   
      height: 30,
      fontSize:16,
      fontWeight:'bold',
      flexDirection:'row',
       justifyContent:'center'
    },
   
    loginBtn: {
      width: '35%',
      borderRadius: 13,
      borderWidth:0.5,
      // backgroundColor: '#F5E2E4',
      backgroundColor:'#f55864',
      borderColor:'red',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
  });