//React Native Imports
import React, { useState }                                            from 'react';
import { SafeAreaView }                                               from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

//React Native Navigation Imports
import { useNavigation } from '@react-navigation/native';

//Expo Imports
import { StatusBar } from 'expo-status-bar';

import axios from 'axios';


export default function Consumer_login() {

  const navigation = useNavigation();

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text 
        onPress = {() => { 
          navigation.navigate('Consumer Dashboard',{cRMN: 9021390130})
        }}>
        Consumer Login
        </Text>
      </View>
    );
    
  }