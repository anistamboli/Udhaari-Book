import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import { Constants } from 'expo';
import Vendor_register from './components/Vendor_register';
import Launching_page from './components/Launching_page';
import Dashboard from './components/Dashboard';
import Add_consumer from './components/Add_consumer';

// // You can import from local files
// import AssetExample from './components/AssetExample';

// // or any pure javascript modules available in npm
// import { Card } from 'react-native-elements'; 
// // Version can be specified in package.json

const App = () => {
    return (
      <View style={styles.container}>
        {/* <Launching_page/> */}
        <Vendor_register/>
        {/* <Dashboard/> 
          
        <Add_consumer/> */}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
    // paddingTop: Constants.statusBarHeight,
  }
});
 
export default App;