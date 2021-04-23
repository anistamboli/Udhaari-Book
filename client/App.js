//React Native Imports
import 'react-native-gesture-handler';
import * as React from 'react';
import { View,Image, TouchableOpacity, StyleSheet } from 'react-native';

//React Native Navigation Imports
import { NavigationContainer, useNavigation }           from '@react-navigation/native';
import { createStackNavigator }                         from '@react-navigation/stack';
import { createMaterialTopTabNavigator }                from '@react-navigation/material-top-tabs';

//Export Imports
import { Constants } from 'expo';
import { StatusBar } from 'expo-status-bar';

import Launching_page from './components/Launching_page';
import back_button from './assets/back_button.png'; 
import logout_button from './assets/logout_button.png'; 
import { AntDesign } from '@expo/vector-icons';

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
import { Text } from 'react-native';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


const Vendor_navTab = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{widht:'100%', flexDirection:'row', alignItems:'center', marginTop:'11%'}}>
        <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Vendor Dashboard');}} style={{width:'15%', paddingLeft:'2%', alignItems:'flex-start'}}> 
          {/* <Image source={back_button} style={styles.back_button} /> */}
          <AntDesign name="home" size={40} color="black" />
        </TouchableOpacity>        
        <Text style={{textAlign:'center', fontWeight:'bold', fontSize:25, color:'rgb(88, 149, 164)', width:'70%'}}>अब उधारी ले, विश्वास से!</Text> 
        <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Vendor Login');}} style={{width:'15%',paddingRight:'2%', alignItems:'flex-end'}}> 
          {/* <Image source={logout_button} style={styles.logout_button} /> */}
          <AntDesign name="logout" size={34} color="black" />
        </TouchableOpacity>   
      </View>
      <Tab.Navigator style={{marginTop:'1%'}}>
        {/* // labeled={false}
        // shifting={true}
        // color={green}
        // activeColor="#f0edf6"
        // inactiveColor="#3e2465"
        // barStyle={{flex }}
        // style={{marginTop:'17%'}}> */}
        <Tab.Screen name="Account Details" component={Account_details} style={{ marginLeft: '5%' }}/>
        <Tab.Screen name="Add Products" component={Add_products} />
        <Tab.Screen name="Udhaari Records" component={Udhaari_records} />
        <Tab.Screen name="Make Payment" component={Make_payment} style={{ marginRight: '5%'}}/>
      </Tab.Navigator>
    </>
  );
}


const Consumer_navTab = () => {
  const navigation = useNavigation();
  return (
    <>    
      <View style={{widht:'100%', flexDirection:'row', alignItems:'center', marginTop:'5%'}}>
        <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Consumer Dashboard');}} style={{width:'15%', alignItems:'flex-start'}}> 
          <Image source={back_button} style={styles.back_button} />
        </TouchableOpacity>        
        <Text style={{textAlign:'center', fontWeight:'bold', fontSize:25, color:'rgb(88, 149, 164)', width:'70%'}}>अब उधारी ले, विश्वास से!</Text> 
        <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Consumer Login');}} style={{width:'15%', alignItems:'flex-end'}}> 
          <Image source={logout_button} style={styles.logout_button} />
        </TouchableOpacity>   
      </View>
      <Tab.Navigator>
        <Tab.Screen name="My Udhaari" component={My_udhaari}  />
        <Tab.Screen name="My Account" component={My_account} />
      </Tab.Navigator>
    </>
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
  const ref = React.useRef(null);
  return (
      <NavStack/>
  );
}


const styles = StyleSheet.create({
  back_button: {
    width: 40, 
    height: 40,     
    // top:25,
    // paddingTop:0,
    // position: 'absolute',
    // // zIndex: 99,
    // // bottom: 5,
    // // shadowColor: 'black',
    // // shadowOpacity: 0.15,
    // // shadowOffset: { width: 0, height: 2 },
    // // shadowRadius: 8,     
    // alignSelf:'flex-start'
  },
  logout_button: {
    width: 50, 
    height: 50,     
    // top:25,
    // paddingTop:0,
    // position: 'absolute',
    // // zIndex: 99,
    // // bottom: 5,
    // // shadowColor: 'black',
    // // shadowOpacity: 0.15,
    // // shadowOffset: { width: 0, height: 2 },
    // // shadowRadius: 8,     
    // alignSelf:'flex-end'
  }
})

export default App;