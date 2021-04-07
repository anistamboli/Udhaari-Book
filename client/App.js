import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import { Constants } from 'expo';
import Vendor_register from './components/Vendor_register';
import Consumer_register from './components/Consumer_register';
import Launching_page from './components/Launching_page';
import Dashboard from './components/Dashboard';
import Add_consumer from './components/Add_consumer';

const App = () => {
  return (
    <View style={styles.container}>
      <Vendor_register/>
      {/* <Consumer_register/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  }
});

export default App;