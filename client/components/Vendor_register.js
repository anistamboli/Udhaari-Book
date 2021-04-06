import * as React from 'react';  
import { Alert } from 'react-native';

import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'; 


const Vendor_register = () => {  
  const[vendorName, setVendorName] = React.useState('');
  const[rmn, setRmn] = React.useState('');
  const[shopName, setShopName] = React.useState('');
  const[shopAddress, setShopAddress] = React.useState('');
  const[password, setPassword] = React.useState('');
  

  const display = () => {
    Alert.alert(vendorName+rmn+shopName+shopAddress+password);    
  }

  // const handleVendorName = (event) => {
  //    event.persist();
	//   setValues((values) => ({
  //     ...values,
  //     vendorName: event.target.value,
	//   }));
  // }

  // React.useEffect(async() => {
  //   try{      
  //     const body = {rmn, vendorName, shopName, shopAddress, password};
  //     const response = await fetch('http://localhost:5000/Vendor_register', {
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/JSON'},
  //       body: JSON.stringify(body)      
  //     });
  //     console.log(response);
  //   }
  //   catch(err){
  //     console.error(err.message);
  //   }
  // })

  


  return (  
    <View style={styles.Wrapper}>  
     <View style={styles.headerWrapper}> 
          <Text style={styles.heading}> WELCOME</Text> 
      </View>

      <TextInput style = {styles.textinputfields}
      underlineColorAndroid = "transparent"
      placeholder = 'Name' required
      placeholderTextColor = "white"
      value = {vendorName}
      onChangeText = {setVendorName}/>

      <TextInput style = {styles.textinputfields}
      underlineColorAndroid = "transparent"
      placeholder = "Contact Number" required
      placeholderTextColor = "white"
      value = {rmn}
      onChangeText = {setRmn}/>

      <TextInput style = {styles.textinputfields}
      underlineColorAndroid = "transparent"
      placeholder = "Shop Name" required
      placeholderTextColor = "white"
      value = {shopName}
      onChangeText = {setShopName}/>

      <TextInput style = {styles.textinputfields}
      underlineColorAndroid = "transparent"
      placeholder = "Shop Address" required
      placeholderTextColor = "white"
      value = {shopAddress}     
      onChangeText = {setShopAddress}/>

      <TextInput style = {styles.textinputfields}
      underlineColorAndroid = "transparent"
      placeholder = "Password" required
      placeholderTextColor = "white"
      secureTextEntry = {true}
      value = {password}
      onChangeText = {setPassword}/>

    {/* <TextInput style = {styles.textinputfields}
      underlineColorAndroid = "transparent"
      placeholder = "Re-enter Your Password" required
      placeholderTextColor = "white"
      autoCapitalize = "none"
      onChangeText = {this.handleEmailConfirmpassword}/> */}

      <TouchableOpacity style = {styles.buttonstyle} onPress={()=>display()}>
        <Text style={styles.textstyle}> Create Account </Text>
      </TouchableOpacity>
    </View>
  );  
}

const styles = StyleSheet.create({    
  Wrapper: {
    backgroundColor: 'rgb(88, 149, 164)',
    padding: 80,
    width: '100%',
    height: '100%'
  },

  textinputfields: {
    fontSize: 15,
    color: 'black',
    marginBottom: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },

  headerWrapper: {
    borderBottomColor: '#ff9933',
    borderBottomWidth: 2,
    marginBottom: 30, 
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold'
  },

  textstyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15
  },

  buttonstyle: {
    padding: 10,
    borderRadius: 5,
    width: '80%',
    backgroundColor: '#ff9933'
  }
}); 

export default Vendor_register;