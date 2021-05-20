//React Native Imports
import 'react-native-gesture-handler';
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput, ToastAndroid, Alert } from 'react-native';

//Expo Imports
import { Entypo } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';

// import { response } from 'express';

import axios from 'axios';

// const promise = fetchData();
// fetchData = ()=>{

// }

const Account_details = () => {

  const [isLoading, setLoading] = useState(true);
  const [selectedConsumer, setSelectedConsumer] = useState([]);

  const [name, setName] = useState();
  const [threshold, setThreshold] = useState();

  const [tempName, setTempName] = useState();
  const [tempThreshold, setTempThreshold] = useState();

  const today = new Date();
  const [due, setDue] = useState(today);
  const [recentPayment, setRecentPayment] = useState();

  const [vRMN, setvRMN] = useState();
  const [cRMN, setcRMN] = useState();
  const navigation = useNavigation();

  async function getValueFor() {
    let vRMN = await SecureStore.getItemAsync('vendorContact');
    let cRMN = await SecureStore.getItemAsync('consumerContact');
    setvRMN(vRMN);
    setcRMN(cRMN);
    // const cRMN=12;
    const response = {}
    await fetch('https://udhaari.herokuapp.com/Account_details/' + vRMN + '/' + cRMN)
      .then((response) => response.json())
      .then((result) => {
        setSelectedConsumer(result);
        setName(result[0].consumer_name);
        setTempName(result[0].consumer_name);
        var stringThreshold = result[0].threshold.toString();
        setTempThreshold(stringThreshold);
        setThreshold(stringThreshold);
        setDue(new Date(result[0].due_date));
        console.log(due)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))

    const pymnt = axios.get('https://udhaari.herokuapp.com/Payment_history', {
      params: {
        vRMN, cRMN
      }
    })
      .then((pymnt) => {
        setRecentPayment(pymnt.data[0].transaction_amount)
      })
      .catch((error) => {
        console.log(error)
      })

  }



  // useEffect(() => {
  //   getValueFor();
  // },[]);


  useFocusEffect(
    useCallback(() => {
      getValueFor();
    }, [])
  );


  const DeleteAccount = () => {
    // alert("DELETE");
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete the account?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            // alert(selectedConsumer[0].contact);
            // var cRMN=selectedConsumer[0].contact;
            // alert(typeof(cRMN));
            const response = await fetch('https://udhaari.herokuapp.com/Account_details/' + vRMN + '/' + cRMN, { method: 'DELETE' });
            const result = await response.json()
            if (result.success === true) {
              navigation.navigate('Vendor Dashboard')
            }
            // alert(result.message);
            ToastAndroid.showWithGravity(
              result.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,

            );
            // navigation.navigate('NavStack', {screen : 'Vendor_dashboard'})
          }
        },
        {
          text: 'No',
          style: "Cancel"
        }
      ]
    );
  }


  const EditNameThreshold = async () => {
    if (name == tempName && threshold == tempThreshold) {
      ToastAndroid.showWithGravity(
        "You have not made any changes",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    else if (tempName == '') {
      ToastAndroid.showWithGravity(
        "Please Enter A Name",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    else if (tempThreshold == '') {
      ToastAndroid.showWithGravity(
        "Please Enter A Threshold",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    else if (!isNaN(tempName)) {
      ToastAndroid.showWithGravity(
        "Please Enter A Valid Name",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    else if (isNaN(tempThreshold)) {
      ToastAndroid.showWithGravity(
        "Please Enter A Valid Threshold",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    else if (!isNaN(tempThreshold) && (tempThreshold <= 0 || tempThreshold > 1)) {
      ToastAndroid.showWithGravity(
        "Threshold must be a value between 0-1",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    else {
      if (tempName != name) {
        try {
          const body = { updatingValue: tempName };
          const response = await fetch('https://udhaari.herokuapp.com/Account_details/' + vRMN + '/' + cRMN, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(body)
          });
          const result = await response.json();
          ToastAndroid.showWithGravity(
            result.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
        catch (err) {
          console.error(err.message);
        }
      }
      if (tempThreshold != threshold) {
        try {
          const body = { updatingValue: Number(tempThreshold) };
          const response = await fetch('https://udhaari.herokuapp.com/Account_details/' + vRMN + '/' + cRMN, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(body)
          });
          const result = await response.json();
          ToastAndroid.showWithGravity(
            result.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
        catch (err) {
          console.error(err.message);
        }
      }
      getValueFor();
    }
  }

  return (
    <View style={{ flex: 1, padding: '5%', backgroundColor: '#EAF2F4' }}>
      {isLoading ? <Text>Loading...</Text> : (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column', width: '50%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, }}>Address:</Text>
              <Text>{selectedConsumer[0].address}</Text>
            </View>
            <View style={{ width: '50%' }}>
              {(due.getTime() + 5 * 24 * 60 * 60 * 1000) > (today.getTime()) ?
                <Text style={{ textAlign: 'center', fontWeight: 'bold', padding: 10, borderRadius: 5, width: '50%', backgroundColor: '#B2EBE0', borderWidth: 1, borderColor: 'green', alignSelf: 'flex-end' }}>Active</Text> :
                <Text style={{ textAlign: 'center', fontWeight: 'bold', padding: 10, borderRadius: 5, width: '50%', backgroundColor: '#F5E2E4', borderWidth: 1, borderColor: 'red', alignSelf: 'flex-end' }}>Blocked</Text>
              }
            </View>
          </View>
          {/* <Text>{'\n'}</Text>  */}
          <TouchableOpacity activeOpacity={2} style={{ height: 45, width: '60%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
            <TextInput style={{ fontSize: 20, color: 'green' }}
              style={{ height: 40, textAlign: 'center' }}
              placeholderTextColor='gray'
              fontSize={20}
              color='green'
              onChangeText={setTempName}
              value={tempName}
              placeholder='Name Required'
            // placeholder={selectedConsumer[0].consumer_name}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 15, color: 'black', textAlign: 'center', paddingVertical: '1%', marginBottom: '2%' }}>{cRMN}</Text>
          <FlatList style={{ paddingHorizontal: '4%', marginBottom: '8%', width: '100%', backgroundColor: 'white', borderColor: 'orange', borderRadius: 30 }}
            data={selectedConsumer}
            renderItem={({ item }) => {
              return (
                <View style={{ flexDirection: 'column', marginTop: '10%', height: '100%', width: '100%' }}>
                  <View style={{ flexDirection: 'row', width: '100%', }}>
                    <View style={{ width: '50%', justifyContent: 'center' }}>
                      <Text style={{ fontWeight: 'bold' }}>Threshold</Text>
                    </View>
                    <View style={{ width: '50%', alignItems: 'flex-end', paddingRight: '1%' }}>
                      <TouchableOpacity activeOpacity={2} >
                        <TextInput style={{ fontSize: 20, color: 'green' }}
                          style={{ height: 45, width: '50%', borderColor: 'gray', textAlign: 'right' }}
                          placeholderTextColor='gray'
                          onChangeText={setTempThreshold}
                          value={tempThreshold}
                          color='green'
                          placeholder='Threshold Required'
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', marginTop: '3%' }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: 'bold' }}>Account Start Date</Text>
                    </View>
                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                      <Text>{new Date(item.start_date).toDateString()}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: 'bold' }}>Billing Start Date</Text>
                    </View>
                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                      <Text>{new Date(item.billing_start_date).toDateString()}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: 'bold' }}>Bill Due Date</Text>
                    </View>
                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                      <Text>{new Date(item.due_date).toDateString()}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: 'bold' }}>Last Paid Amount</Text>
                    </View>
                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                      {recentPayment === undefined || recentPayment === 0 || recentPayment === null ?
                        <Text>No Payments Yet</Text> :
                        <Text>₹ {(recentPayment).toFixed(2)}</Text>
                      }
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: 'bold' }}>Total Due Amount</Text>
                    </View>
                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>₹ {(item.balance).toFixed(2)}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{ fontWeight: 'bold' }}>Partial  Due Amount</Text>
                    </View>
                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>₹ {(item.balance * item.threshold).toFixed(2)}</Text>
                    </View>
                  </View>
                </View>
              )
            }} />
          <View style={{ flexDirection: 'row', width: '100%', marginBottom: '8%' }}>
            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity activeOpacity={2} style={styles.saveChangesButton}>
                <Text style={styles.saveChangesText} onPress={EditNameThreshold}>Save Changes</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%', paddingRight: '2%' }}>
              <TouchableOpacity activeOpacity={2} >
                <Entypo name="trash" size={35} color="gray" style={{ alignSelf: 'flex-end' }} onPress={() => DeleteAccount()} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  saveChangesButton: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#f55864'
  },

  saveChangesText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15
  }
})


export default Account_details;