import 'react-native-gesture-handler';
import Account_details from './components/Account_details';
import Add_products from './components/Add_products';
import Udhaari_records from './components/Udhaari_records';
import Make_payment from './components/Make_payment';

import My_udhaari from './components/My_udhaari';
import My_account from './components/My_account';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, Platform } from 'react-native';


import * as React from 'react';
import { Constants } from 'expo';
import Launching_page from './components/Launching_page';
import Vendor_register from './components/Vendor_register';
import Consumer_register from './components/Consumer_register';
import Login from './components/Login';

import Dashboard from './components/Dashboard';
import Vendor_dashboard from './components/Vendor_dashboard';
import Consumer_dashboard from './components/Consumer_dashboard';
import Add_consumer from './components/Add_consumer';



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//     alignItems: 'center',
//     // marginTop: 100,
//   }
// });


const Tab = createMaterialTopTabNavigator();
// const Stack = createStackNavigator();

function navTab() {
  return (
    <Tab.Navigator style={{marginTop:'11%'}}>
        <Tab.Screen name="Account Details" component={Account_details}  />
        <Tab.Screen name="Add Products" component={Add_products} />
        <Tab.Screen name="Udhaari Records" component={Udhaari_records} />
        <Tab.Screen name="Make Payment" component={Make_payment} />
    </Tab.Navigator>
  );
}

function NavStack(){
  return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
      <Stack.Screen name="Launching Page" component={Launching_page} options={{ headerShown: false }} />
      <Stack.Screen name="Vendor Registration" component={Vendor_register} options={{ headerShown: false }}/>
      <Stack.Screen name="navTab" component={navTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

function App() {
  return (
      <NavStack/>
      // <My_account/>
  );
}
export default App;