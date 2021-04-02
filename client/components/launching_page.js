import React from 'react';
import { Image,  ImageBackground,  StyleSheet, Text, View, Button } from 'react-native';
import udhaari from '../assets/udhaari.png'; 
import login from '../assets/login.png';

export default class Launching_page extends React.Component{
    render() {
  return (
    <View style = {styles.container}>
      <View>
          <Image source={udhaari} style={{ width: 400, height: 400 }} />
      </View>
      <View style = {{flexDirection: 'row'}}>
          <ImageBackground source={login} style={{ width: 130, height: 130 }} >
          <Text style={{color: '#888', fontSize: 18 , paddingTop:150, paddingLeft:40}}> 
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
});
