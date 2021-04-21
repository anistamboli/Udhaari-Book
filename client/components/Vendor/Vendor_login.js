
import { StatusBar } from 'expo-status-bar';
// import { response } from 'express';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function Vendor_login() {
    const [contact, setContact] = useState('0');
    const [password, setPassword] = useState('');
    // const [validPassword, setValidPassword] = useState ('');

    const navigation = useNavigation();

    async function SaveVendorContact(value) {
      await SecureStore.setItemAsync('vendorContact', value);
    }

    const OnPressRegister = () => {
      navigation.navigate('Vendor Registration');
    }

    const OnPressLogin = async (contact) => {
      // var result = parseInt(reqId); 
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
        const response = await axios.get('http://localhost:5000/Vendor_login', {params:{
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
            SaveVendorContact(contact)
            navigation.navigate('Vendor_navTab')
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
        <Text style={{color: '#888', fontSize: 23 , paddingBottom:'4%'}}> 
            Vendor Login
        </Text>
        <Image style={styles.image} source={require('../../assets/sk.jpg')} />

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
          />
        </View>
   
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder='Password'
            placeholderTextColor='#000'
            secureTextEntry={true}
            textAlign='center'
            onChangeText={(password) => setPassword(password)}
          />
        </View>
   
        {/* <TouchableOpacity>
          <Text style={styles.forgot_button} onPress={OnPressForgotPassword}>Forgot Password?</Text>
        </TouchableOpacity> */}
   
        <TouchableOpacity style={styles.loginBtn} onPress={()=>{OnPressLogin(contact)}}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.register_button} onPress={()=>{OnPressRegister()}}>New User? Register.</Text>
        </TouchableOpacity>

      </SafeAreaView>
    );
  }
   
  const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 0,
        backgroundColor: '#EDFFEF',
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 60
        
    },
   
    image: { 
        marginBottom: 20,
    },
   
    inputView: {
        backgroundColor: '#FFC0CB',
        borderRadius: 30,
        width: 280,
        height: 45,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
   
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
    },
   
    register_button: {
      marginTop: '10%',   
      height: 30,
    },
   
    loginBtn: {
        width: 150,
        borderRadius: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: 'skyblue',
    },
  });