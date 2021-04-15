//React Native Imports
import 'react-native-gesture-handler';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as React                         from 'react';

export default function My_udhaari({route}) {
  const cRMN = route.params.cRMN; 
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>My Udhaari</Text>
        <Text>{cRMN}</Text>
      </View>
    );
  }