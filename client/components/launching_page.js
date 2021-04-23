//React Native Imports
import React                                               from 'react';
import { Image,  ImageBackground,  StyleSheet, Text, View} from 'react-native';

//React Native Navigation Imports
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator }               from '@react-navigation/stack';
import { createMaterialTopTabNavigator }      from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


//Asset Imports
import udhaari from '../assets/udhaari.png';
import App from '../App';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Launching_page = () => {
    
  const navigation = useNavigation();


  return (
    <SafeAreaView style = {styles.container}>
      <View style={{marginTop:'25%'}}>
        <Image source={udhaari} style={{ width: 270, height: 270 }} />
      </View>
      <View style={{flexDirection:'row', width:'100%', alignItems:'center',justifyContent:'center', marginTop:'15%'}}>
        <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', paddingHorizontal:'5%'}}>
          <TouchableOpacity onPress = {() => { navigation.navigate('Vendor Login');}}>
          <Image source= {require('../assets/seller.png')} style={{height:110, width:110}}/> 
          </TouchableOpacity>
          <Text style={{marginTop:'5%', fontSize:20}}>Vendor</Text>
        </View>
        <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', paddingHorizontal:'5%'}}>
          <TouchableOpacity onPress = {() => { navigation.navigate('Consumer Login');}}>
          <Image source= {require('../assets/customer.png')} style={{height:110, width:110}}/> 
          </TouchableOpacity>
          <Text style={{marginTop:'5%', fontSize:20}}>Consumer</Text>
        </View>      
      </View> 
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDFFEF',
    height:'100%',
    width:'100%',
    alignItems: 'center',
    // justifyContent: 'center'
    
  },
});

export default Launching_page;