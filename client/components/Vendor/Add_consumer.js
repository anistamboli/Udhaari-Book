//React Native Imports
import React, { useState }                                                                from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { SearchBar }                                                                      from 'react-native-elements';
import DateTimePickerModal                                                                from "react-native-modal-datetime-picker";

//ExpoImports
import { StatusBar } from 'expo-status-bar';


export default function Add_consumer() {
    const [search,setSearch] = useState('');
    const [user, setUser] = useState('');
    const [address, setAddress] = useState('');
    const [threshold,setThreshold] = useState('');
    const [start, setStart] = useState('');
    const [due, setDue] = useState('');
    

    
        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);

      
        const showDatePicker = () => {
          setDatePickerVisibility(true);
        };
      
        const hideDatePicker = () => {
          setDatePickerVisibility(false);
        };
      
        const handleConfirm = (date) => {
         // console.warn("A date has been picked: ", date);
          setStart(date);
          console.warn("A date has been picked: ", start);
          hideDatePicker();
        };

        const showDatePicker1 = () => {
            setDatePickerVisibility1(true);
          };
        
          const hideDatePicker1 = () => {
            setDatePickerVisibility1(false);
          };
        
          const handleConfirm1 = (date) => {
           // console.warn("A date has been picked: ", date);
            setDue(date);
            console.warn("A date has been picked: ", setDue);
            hideDatePicker1();
          };
      

    const onPressConsumer = () => {
        alert('contact : '+search+''+'name : '+user+''+'Address : '+address+' '+'Threshold : '+threshold+' '+'Start Date :'+start+' '+ 'Due Date :'+due);
        };

        return(
        <ScrollView>
            <View style ={styles.container}>
                <Text style={{color: '#888', fontSize: 25, paddingBottom : 30}}> 
            NEW CONSUMER
                </Text>
                <StatusBar style='auto' />

                <View style={styles.MainContainer}>
                    <SearchBar
                        style={styles.TextInput}
                        placeholder='Consumers RMN'
                        placeholderTextColor='#FFA07A'
                        keyboardType='numeric'
                        maxLength={10}
                        textAlign='center'
                        value = {search}
                        onChangeText = {setSearch}
                    />
                    </View>
                    <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder='Name'
                        placeholderTextColor='#FFA07A'
                        textAlign='center'
                        onChangeText={(user) => setUser(user)}
                    />
                    </View>
            
                    <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder='Address'
                        placeholderTextColor='#FFA07A'
                        textAlign='center'
                        onChangeText={(address) => setAddress(address)}
                    />
                    </View>
                    <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder='Threshold'
                        placeholderTextColor='#FFA07A'
                        keyboardType='numeric'
                        maxLength={2}
                        textAlign='center'
                        onChangeText={(threshold) => setThreshold(threshold)}
                    />
                    </View>
                    <View style={styles.inputView}>
                    <Button title="Start Date" onPress={showDatePicker} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                <View style={styles.inputView}>
                <Button title="Due Date" onPress={showDatePicker1} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible1}
                            mode="date"
                            onConfirm={handleConfirm1}
                            onCancel={hideDatePicker1}
                        />
                   
                </View>
            
                    <TouchableOpacity style={styles.loginBtn} onPress={onPressConsumer}>
                    <Text style={styles.loginText}>Add Consumer</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 0,
      paddingTop : 50,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
   
    image: {
      marginBottom: 25,
    },
   
    inputView: {
      backgroundColor: '#27408B',
      borderRadius: 30,
      width: 280,
      height: 45,
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
    },
   
    forgot_button: {
      height: 30,
    },
   
    loginBtn: {
      width: 150,
      borderRadius: 25,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      backgroundColor: '#FF4040',
     

    },
    MainContainer:{

        width : 300,
        paddingBottom : 30

      }

  });
