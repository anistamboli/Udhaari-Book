//React Native Imports
import React                                               from 'react';
import { Image,  ImageBackground,  StyleSheet, Text, View} from 'react-native';

//React Native Navigation Imports
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator }               from '@react-navigation/stack';
import { createMaterialTopTabNavigator }      from '@react-navigation/material-top-tabs';

//Asset Imports
import udhaari from '../assets/udhaari.png'; 
import login   from '../assets/login.png';
import App from '../App';


const Launching_page = () => {
    
  const navigation = useNavigation();


  return (
    <View style = {styles.container}>
      <View>
        <Image source={udhaari} style={{ width: 400, height: 400 }} />
      </View>
      <View style = {{flexDirection: 'row'}}>
        <ImageBackground source={login} style={{ width: 130, height: 130 }} >
          <Text style={{color: '#888', fontSize: 18 , paddingTop:150, paddingLeft:40}} onPress = {() => {navigation.navigate('Vendor Login');}}> 
            Vendor
          </Text>
        </ImageBackground>
        <ImageBackground source={login} style={{ width: 130, height: 130 }} > 
          <Text style={{color: '#888', fontSize: 18 , paddingTop:150, paddingLeft:30 }} onPress = {() => { navigation.navigate('Consumer Login');}}> 
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

export default Launching_page;