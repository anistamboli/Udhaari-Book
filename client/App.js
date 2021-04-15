//React Native Imports
import 'react-native-gesture-handler';
import * as React from 'react';

//React Native Navigation Imports
import { NavigationContainer }           from '@react-navigation/native';
import { createStackNavigator }          from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//Export Imports
import { Constants } from 'expo';
import { StatusBar } from 'expo-status-bar';

import Launching_page from './components/Launching_page';

//Vendor Imports
import Vendor_register  from './components/Vendor/Vendor_register';
import Vendor_login     from './components/Vendor/Vendor_login';
import Vendor_dashboard from './components/Vendor/Vendor_dashboard';
import Add_consumer     from './components/Vendor/Add_consumer';
import Account_details  from './components/Vendor/Account_details';
import Add_products     from './components/Vendor/Add_products';
import Udhaari_records  from './components/Vendor/Udhaari_records';
import Make_payment     from './components/Vendor/Make_payment';

//Consumer Imports
import Consumer_register  from './components/Consumer/Consumer_register';
import Consumer_login     from './components/Consumer/Consumer_login';
import Consumer_dashboard from './components/Consumer/Consumer_dashboard';
import My_udhaari         from './components/Consumer/My_udhaari';
import My_account         from './components/Consumer/My_account';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const Vendor_navTab = () => {
  return (
    <Tab.Navigator style={{marginTop:'11%'}}>
        <Tab.Screen name="Account Details" component={Account_details}  />
        <Tab.Screen name="Add Products" component={Add_products} />
        <Tab.Screen name="Udhaari Records" component={Udhaari_records} />
        <Tab.Screen name="Make Payment" component={Make_payment} />
    </Tab.Navigator>
  );
}


const Consumer_navTab = () => {
  return (
    <Tab.Navigator style={{marginTop:'11%'}}>
        <Tab.Screen name="My Udhaari" component={My_udhaari}  />
        <Tab.Screen name="My Account" component={My_account} />
    </Tab.Navigator>
  );
}


const NavStack = () => {
  return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Launching Page'>
      <Stack.Screen name="Launching Page" component={Launching_page} options={{ headerShown: false }} />
      <Stack.Screen name="Vendor Login" component={Vendor_login} options={{ headerShown: false }} />      
      <Stack.Screen name="Vendor Registration" component={Vendor_register} options={{ headerShown: false }}/>      
      <Stack.Screen name="Vendor Dashboard" component={Vendor_dashboard} options={{ headerShown: false }}/>
      <Stack.Screen name="Add Consumer" component={Add_consumer} options={{ headerShown: false }}/>      
      <Stack.Screen name="Vendor_navTab" component={Vendor_navTab} options={{ headerShown: false }} /> 
      <Stack.Screen name="Consumer Login" component={Consumer_login} options={{ headerShown: false }} /> 
      <Stack.Screen name="Consumer Registration" component={Consumer_register} options={{ headerShown: false }}/>
      <Stack.Screen name="Consumer Dashboard" component={Consumer_dashboard} options={{ headerShown: false }} /> 
      <Stack.Screen name="Consumer_navTab" component={Consumer_navTab} options={{ headerShown: false }} />   
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const App = () =>{
  return (
      <NavStack/>
  );
}

export default App;