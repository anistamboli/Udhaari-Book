import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Button, StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native';


import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';

import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';


export default function Payment_details() {

  const [isLoading, setLoading] = useState(true);

  const [trID, setTrID] = useState();
  const [trDetails, setDetails] = useState([]);

  const navigation = useNavigation();

  async function getValueFor() {
    let trID = await SecureStore.getItemAsync('transactionID');
    setTrID(trID);

    const response = await axios.get('/Payment_details', {
      params: {
        trID
      }
    })
      .then((response) => {
        setDetails(response.data)

      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false));
  }

  // useEffect(() => {
  //   getValueFor();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getValueFor();
    }, [])
  );



  return (

    <View style={{ flex: 1, paddingTop: '1%', backgroundColor: '#edf7fc', }}>
      {isLoading ? <Text>Loading...</Text> : (
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%' }}>
          <View style={{ widht: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: '15%', paddingBottom: '1%', backgroundColor: '#edf7fc' }}>
            <TouchableOpacity activeOpacity={1.5} onPress={() => { navigation.navigate('Vendor Dashboard'); }} style={{ width: '15%', paddingLeft: '3%', alignItems: 'flex-start' }}>
              {/* <Image source={back_button} style={styles.back_button} /> */}
              {/* <AntDesign name="home" size={39} color="black" /> */}
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25, color: '#109dcc', width: '70%' }}>अब उधारी ले, विश्वास से!</Text>
            <TouchableOpacity activeOpacity={1.5} onPress={() => { navigation.navigate('Vendor Login'); }} style={{ width: '15%', paddingRight: '3%', alignItems: 'flex-end' }}>
              {/* <Image source={logout_button} style={styles.logout_button} /> */}
              {/* <AntDesign name="logout" size={32} color="black" /> */}
            </TouchableOpacity>
          </View>
          <Text style={{ paddingHorizontal: '12%', fontSize: 20, fontWeight: 'bold', color: 'green', fontStyle: 'italic', textAlign: 'right', marginTop: '15%' }}>Payment</Text>
          {trDetails.map((item, index) => {
            return (

              <View style={{ justifyContent: 'center', padding: '5%', alignItems: 'center', borderRadius: 30, backgroundColor: 'white', flexDirection: 'column', width: '92%', marginHorizontal: '4%', height: '100%', flex: 1, marginTop: '10%' }} key={index}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <Text style={{ alignItems: 'flex-start', width: '50%', fontWeight: "bold" }}>Transaction ID </Text>
                  <Text style={{ textAlign: 'right', width: '50%' }}>{item.id}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                  <Text style={{ alignItems: 'flex-start', width: '50%', fontWeight: "bold" }}>Date </Text>
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <Text style={{ textAlign: 'right' }}>{(new Date(item.transaction_date).toDateString())}</Text>
                    <Text style={{ textAlign: 'right' }}>{item.transaction_time}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                  <Text style={{ alignItems: 'flex-start', width: '50%', fontWeight: "bold" }}>Total Amount</Text>
                  <Text style={{ textAlign: 'right', width: '50%', color: 'black' }}>₹ {item.total_amount}.00</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                  <Text style={{ alignItems: 'flex-start', width: '50%', fontWeight: "bold" }}>Paid Amount</Text>
                  <Text style={{ textAlign: 'right', width: '50%' }}>₹ {item.payed_amount}.00</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%', }}>
                  <Text style={{ alignItems: 'flex-start', width: '50%', fontWeight: "bold" }}>Carry-Forward Amount</Text>
                  <Text style={{ textAlign: 'right', width: '50%' }}>₹ {item.remaining_amount}.00</Text>
                </View>
              </View>
            )
          }
          )}

          <View style={{ alignItems: 'flex-end', flex: 1, width: '100%', marginTop: '10%', paddingHorizontal: '7%' }}>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.goBack()}>
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    width: '30%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f55864',
    // borderWidth:1,
    // borderColor:'green'
  }

})