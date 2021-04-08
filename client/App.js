import 'react-native-gesture-handler';
import Account_details from './components/Account_details';
import Add_products from './components/Add_products';
import Udhaari_records from './components/Udhaari_records';
import Make_payment from './components/Make_payment';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import * as React from 'react';
import { Constants } from 'expo';
import Vendor_register from './components/Vendor_register';
import Consumer_register from './components/Consumer_register';
import Launching_page from './components/Launching_page';
import Dashboard from './components/Dashboard';
import Add_consumer from './components/Add_consumer';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <Vendor_register/>
//       {/* <Consumer_register/> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     marginTop: 100,
//   }
// });

// export default App;


const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Account Details" component={Account_details} />
        <Tab.Screen name="Add Products" component={Add_products} />
        
        <Tab.Screen name="Udhaari Records" component={Udhaari_records} />
        <Tab.Screen name="Make Payment" component={Make_payment} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}