import React from 'react';
import { Image,  ImageBackground,  StyleSheet, Text, View, Button } from 'react-native';
import udhaari from '../assets/udhaari.png'; 
import login from '../assets/login.png';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

export default function Launching_page() {
    
  const navigation = useNavigation();

    const OnPressRegister = () => {
      navigation.navigate('Login');
    }



  return (
    <View style = {styles.container}>
      <View>
          <Image source={udhaari} style={{ width: 400, height: 400 }} />
      </View>
      <View style = {{flexDirection: 'row'}}>
          <ImageBackground source={login} style={{ width: 130, height: 130 }} >
          <Text style={{color: '#888', fontSize: 18 , paddingTop:150, paddingLeft:40}} onPress = {() => {OnPressRegister()}}> 
           Vendor
         </Text>
         </ImageBackground>
          <ImageBackground source={login} style={{ width: 130, height: 130 , paddingTop:150, paddingLeft:30 }} > 
          <Text style={{color: '#888', fontSize: 18 }}> 
           Consumer
         </Text>
         </ImageBackground>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
});