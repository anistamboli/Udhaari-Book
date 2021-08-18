//React Native Imports
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

//React Native Navigation Imports
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


//Asset Imports
import udhaari from '../assets/udhaari.png';
import App from '../App';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Launching_page = () => {

  const navigation = useNavigation();


  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: '10%', color: '#fa4d59' }}>UDHAARI BOOK</Text>
      <View style={{ marginBottom: '10%', marginTop: '10%', }}>
        <Image source={require('../assets/circle.png')} style={{ width: 250, height: 250, borderRadius: 60 }} />
      </View>

      <Text style={{ fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', color: '#f06771' }}>चल कर ले थोडी उधारी...</Text>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '15%' }}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%' }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Vendor Login'); }}>
            <Image source={require('../assets/seller.png')} style={{ height: 110, width: 110 }} />
          </TouchableOpacity>
          <Text style={{ marginTop: '10%', fontSize: 20, fontWeight: 'bold' }}>Vendor</Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%' }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Consumer Login'); }}>
            <Image source={require('../assets/consumer.png')} style={{ height: 110, width: 110 }} />
          </TouchableOpacity>
          <Text style={{ paddingRight: '3%', marginTop: '10%', fontSize: 20, fontWeight: 'bold' }}>Consumer</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf7fc',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center'

  },
});

export default Launching_page;
