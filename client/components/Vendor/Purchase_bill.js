import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Button, StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Alert, ScrollView } from 'react-native';


import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';

import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';


export default function Purchase_bill() {

  const [isLoading, setLoading] = useState(true);

  const [trID, setTrID] = useState();
  const [trDetails, setDetails] = useState([]);
  const [mainDetails, setMainDetails] = useState([]);

  const navigation = useNavigation();

  async function getValueFor() {
    let trID = await SecureStore.getItemAsync('transactionID');
    setTrID(trID);
    console.log(trID)

    const response1 = await axios.get('https://udhaari.herokuapp.com/Purchase_bill', {
      params: {
        trID
      }
    })
      .then((response1) => {
        setMainDetails(response1.data)
      })
      .catch((error) => {
        console.log(error)
      })

    const response = await axios.get('https://udhaari.herokuapp.com/Purchase_history', {
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
          <View style={{ widht: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: '11%', paddingBottom: '1%', backgroundColor: '#edf7fc' }}>
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
          <Text style={{ paddingHorizontal: '7%', fontSize: 20, fontWeight: 'bold', color: 'blue', fontStyle: 'italic', textAlign: 'right', marginBottom: '7%', marginTop: '7%' }}>Purchase</Text>

          <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: '5%', marginBottom: '2%' }}>
            <Text style={{ width: '50%', fontWeight: 'bold', fontSize: 15 }}>Transaction ID </Text>
            <Text style={{ width: '50%', textAlign: 'right' }}>{mainDetails[0].id}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: '5%', marginBottom: '2%' }}>
            <Text style={{ width: '50%', fontWeight: 'bold', fontSize: 15 }}>Date</Text>
            <Text style={{ width: '50%', textAlign: 'right' }}>{(new Date(mainDetails[0].transaction_date)).toDateString()} {mainDetails[0].transaction_time}</Text>
          </View>

          <View style={{ width: '98%', height: '50%', marginTop: '3%', marginHorizontal: '1%', borderWidth: 1, borderRadius: 5, borderColor: '#5caff2' }}>
            <View style={{ width: '100%', flexDirection: 'row', height: 40, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#0c88ed' }}>
              <View style={{ width: '40%', alignItems: 'flex-start', paddingLeft: '5%' }}>
                <Text style={{ fontWeight: 'bold' }}>Product</Text>
              </View>
              <View style={{ width: '20%', }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Qty</Text>
              </View>
              <View style={{ width: '20%', }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>Price</Text>
              </View>
              <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end', paddingRight: '4%' }}>
                <Text style={{ fontWeight: 'bold' }}>Total</Text>
              </View>
            </View>

            <View>
              <ScrollView vertical style={{ height: '100%', marginBottom: '1%', borderWidth: 0.5, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>

                {trDetails.map((item, index) => {
                  return (
                    <View style={{ width: '100%', flexDirection: 'row', height: 60, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5 }} key={index} >
                      <View style={{ width: '40%', paddingLeft: '5%' }}>
                        <Text>{item.name}</Text>
                      </View>
                      <View style={{ width: '20%', alignItems: 'center' }}>
                        <Text>{item.quantity}</Text>
                      </View>
                      <View style={{ width: '20%', alignItems: 'flex-end' }}>
                        <Text>{item.base_price}.00</Text>
                      </View>
                      <View style={{ width: '20%', alignItems: 'flex-end', paddingRight: '2%' }}>
                        <Text>{item.total_price}.00</Text>
                      </View>

                    </View>
                  )
                })}

              </ScrollView>
            </View>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: '5%', marginTop: '12%' }}>
            <Text style={{ width: '50%', fontWeight: 'bold', fontSize: 15 }}>Total Bill</Text>
            <Text style={{ width: '50%', textAlign: 'right', fontWeight: 'bold', fontSize: 15 }}>₹ {mainDetails[0].transaction_amount}.00</Text>
          </View>

          <View style={{ alignItems: 'flex-end', marginTop: '5%', flex: 1, width: '100%', paddingHorizontal: '3%' }}>
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