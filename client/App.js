import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import { Constants } from 'expo';
import Vendor_register from './components/Vendor_register';
import launching_page from './components/launching_page';

// // You can import from local files
// import AssetExample from './components/AssetExample';

// // or any pure javascript modules available in npm
// import { Card } from 'react-native-elements'; 
// // Version can be specified in package.json

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <launching_page/>
       
          
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
    // paddingTop: Constants.statusBarHeight,
  }
});
