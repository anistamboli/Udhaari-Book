//React Native Imports
import React, { useState, useEffect, useCallback } from 'react'
import { SearchBar } from 'react-native-elements';
import { StyleSheet, View, Image, TouchableOpacity, Alert, FlatList, Text } from 'react-native';

//React Native Navigation Imports
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


// import logout_button from '../../assets/logout_button.png'; 
import { AntDesign } from '@expo/vector-icons';


const Vendor_dashboard = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [consumers, setConsumers] = useState([]);
  const [filteredConsumers, setFilteredConsumers] = useState([]);

  const [vRMN, setvRMN] = useState();
  // const [cRMN, setcRMN] = useState(12);

  const SampleFunction = () => {
    navigation.navigate('Add Consumer');
  }

  async function SaveConsumerContact(value) {
    await SecureStore.setItemAsync('consumerContact', value);
  }

  async function getValueFor() {
    let vRMN = await SecureStore.getItemAsync('vendorContact');
    setvRMN(vRMN);
    // const cRMN=12;

    fetch('https://udhaari.herokuapp.com/Vendor_dashboard/' + vRMN)
      .then((response) => response.json())
      .then((result) => {
        setConsumers(result);
        setFilteredConsumers(result);
      })
      .catch((error) => {
        console.error(error);
      });

  }

  // useEffect(() => { 
  //   getValueFor();  
  //   },[]);  

  useFocusEffect(
    useCallback(() => {
      getValueFor();
    }, [])
  );

  var today = new Date();

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = consumers.filter(function (item) {
        var itemData;
        if (isNaN(text)) {
          itemData = item.consumer_name
            ? item.consumer_name.toUpperCase()
            : ''.toUpperCase();
        }
        else {
          itemData = item.consumer_contact
            ? item.consumer_contact.toUpperCase()
            : ''.toUpperCase();
        }
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredConsumers(newData);
      setSearch(text);
    }
    else {
      setFilteredConsumers(consumers);
      setSearch(text);
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, paddingTop: '11%', height: '100%', width: '100%', backgroundColor: '#EAF2F4' }}>
      <View style={{ widht: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: '2%', paddingBottom: '2%', backgroundColor: '#EAF2F4' }}>
        <TouchableOpacity activeOpacity={1.5} onPress={() => { navigation.navigate('Vendor Dashboard'); }} style={{ width: '15%', paddingLeft: '4%', alignItems: 'flex-start' }}>
          {/* <Image source={back_button} style={styles.back_button} /> */}
          <AntDesign name="home" size={39} color="black" />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25, color: '#109dcc', width: '70%' }}>?????? ??????????????? ??????, ????????????????????? ??????!</Text>
        <TouchableOpacity activeOpacity={1.5} onPress={() => { navigation.navigate('Vendor Login'); }} style={{ width: '15%', paddingRight: '4%', alignItems: 'flex-end' }}>
          {/* <Image source={logout_button} style={styles.logout_button} /> */}
          <AntDesign name="logout" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', alignItems: 'center', paddingTop: '1%' }}>
        <SearchBar
          inputStyle={{ width: '100%', backgroundColor: 'white', borderRadius: 25 }}
          containerStyle={{ width: '94%', backgroundColor: 'white', borderWidth: 1, borderRadius: 40 }}
          inputContainerStyle={{ width: '100%', backgroundColor: 'white', borderRadius: 40, height: 35 }}
          backgroundColor={'white'}
          placeholderTextColor='black'
          platform='lightTheme'
          fontSize={15}
          placeholder="   Consumer Name or Number....."
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}
        />

      </View>
      <View style={styles.body}>
        <View style={styles.listWrapper1}>
          <Text style={styles.row1}>Name </Text>
          <Text style={styles.row3}>Udhaari </Text>
        </View>
        <FlatList
          data={filteredConsumers}
          renderItem={({ item }) => {
            return (
              <View style={styles.listWrapper}>
                <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'flex-start', width: '60%', paddingHorizontal: '5%', }}>
                  <Text style={styles.nam}
                    onPress={() => {
                      SaveConsumerContact(item.consumer_contact)
                      navigation.navigate('Vendor_navTab', { screen: 'Account Details' })
                    }}>
                    {item.consumer_name}
                  </Text>
                  <Text style={styles.row}
                    onPress={() => {
                      SaveConsumerContact(item.consumer_contact)
                      navigation.navigate('Vendor_navTab', { screen: 'Account Details' })
                    }}>
                    {item.consumer_contact}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '40%', paddingLeft: '3%', }}>
                  {((new Date(item.due_date)).getTime() + 5 * 24 * 60 * 60 * 1000) > today.getTime() ?
                    <Text style={styles.row2}
                      onPress={() => {
                        SaveConsumerContact(item.consumer_contact)
                        navigation.navigate('Vendor_navTab', { screen: 'Account Details' })
                      }}>
                      ??? {(item.balance).toFixed(2)}
                    </Text>
                    :
                    <Text style={styles.row4}
                      onPress={() => {
                        SaveConsumerContact(item.consumer_contact)
                        navigation.navigate('Vendor_navTab', { screen: 'Account Details' })
                      }}>
                      ??? {(item.balance).toFixed(2)}
                    </Text>
                  }
                </TouchableOpacity>
              </View>

            )
          }} />
      </View>
      <View style={styles.MainContainer}>
        <TouchableOpacity activeOpacity={1.5} onPress={() => SampleFunction()} style={styles.TouchableOpacityStyle} >
          <Image source={require('../../assets/floating.png')} style={styles.FloatingButtonStyle} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  MainContainer: {
    position: 'absolute',
    // flex: 1,
    // backgroundColor:'red',
    // width: '100%',
    // height:'100%',
    // justifyContent: 'flex-end',
    // alignItems: 'stretch',
    marginTop: '180%',
    marginLeft: '80%'
  },

  TouchableOpacityStyle: {

    // position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: '10%',
    bottom: '8%',
    flex: 1,
  },

  FloatingButtonStyle: {

    resizeMode: 'contain',
    width: 70,
    height: 70,
  },

  body: {
    backgroundColor: '#EAF2F4',
    // borderWidth:2,
    borderRadius: 15,
    flex: 1,
    marginTop: '5%',
    marginBottom: '2%',
    height: '100%',
    width: '100%',
    // marginHorizontal:'2%',
    backgroundColor: 'white'
  },
  listWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderBottomWidth: 0.5,
    borderStartColor: 'gray'

  },
  listWrapper1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderBottomWidth: 2,

  },
  nam: {
    //backgroundColor : '#fff',
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#484848',
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  row: {
    //backgroundColor : '#fff',
    flex: 1,
    fontSize: 15,
    // fontWeight:'bold',
    color: '#484848',
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  row1: {
    //backgroundColor : '#fff',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#484848',
    fontStyle: 'italic',
    paddingHorizontal: 45,
    paddingVertical: 15,
  },
  row3: {
    //backgroundColor : '#fff',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#484848',
    fontStyle: 'italic',
    paddingHorizontal: 45,
    paddingVertical: 15,
    textAlign: 'right'
  },
  row2: {
    //backgroundColor : '#fff',
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'right',
    paddingHorizontal: 30,
    paddingVertical: 5
  },
  row4: {
    //backgroundColor : '#fff',
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'right',
    paddingHorizontal: 30,
    paddingVertical: 5
  },
});

export default Vendor_dashboard;
