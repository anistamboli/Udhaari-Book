//React Native Imports
import React, { useState }                                     from 'react'; 
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'; 

//React Native Navigation Imports
import { useNavigation } from '@react-navigation/native';
import { NavigationContext, NavigationEvents } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import back_button from '../../assets/back_button.png'; 


const Vendor_register = () => {  
  const[vendorName, setVendorName] = useState('');
  const[rmn, setRmn] = useState('');
  const[shopName, setShopName] = useState('');
  const[shopAddress, setShopAddress] = useState('');
  const[password, setPassword] = useState('');
  const[confirmpassword, setConfirmPassword] = useState('');
  // const[refreshPage, setRefreshPage] = useState('');
  
  const navigation = useNavigation();

  const OnPressLogin = () => {
    navigation.navigate('Vendor Login');
  }

  const onSubmit = async () => { 
    if(!vendorName.trim()){
      alert('Please Enter Your Name');
      return;
    }
    if(!rmn.trim()){
      alert('Please Enter Your Contact Number');
      return;
    }
    if(rmn>10000000000 || rmn<999999999){
      alert("Required 10 Digit Contact Number");
      return;
    }
    if(!shopName.trim()){
      alert('Please Enter Your Shop Name');
      return;
    }
    if(!shopAddress.trim()){
      alert('Please Enter Your Shop Address');
      return;
    }
    if(!password.trim()){
      alert('Please Enter Your Password');
      return;
    }
    if(password!=confirmpassword){
      alert('Password Unmatched');
      return;
    }
    else{
      try{      

        const body = {contact:Number(rmn), name:vendorName, shop_name:shopName, shop_address:shopAddress, password:password};
        const response = await fetch('http://localhost:5000/Vendor_register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/JSON'},
            body: JSON.stringify(body)      
        });
        const result = await response.json();
        // JSON.stringify(result);
        // console.log(result);
        alert(result.message);
        // window.location.reload();
        // setRefreshPage("refresh");
        alert('dsd');
        
      }
      catch(err){
        console.error(err.message);
      }
    }
  }


  return (  
    <View style={styles.Wrapper}>  
      <View style={styles.headerWrapper}> 
        <Text style={styles.heading}> WELCOME</Text> 
        <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Vendor Login');}}> 
          {/* <Ionicons name="arrow-back-circle-sharp" size={24} color="black" /> */}
        </TouchableOpacity>
      </View>
     
      <TextInput style = {styles.textinputfields}      
      placeholder = 'Name' required
      placeholderTextColor = "white"
      onChangeText = {vendorName => setVendorName(vendorName)}/>

      <TextInput style = {styles.textinputfields}      
      placeholder = "Contact Number" required
      placeholderTextColor = "white"
      maxLength={10}
      keyboardType='numeric'
      onChangeText = {rmn => setRmn(rmn)}/>

      <TextInput style = {styles.textinputfields}      
      placeholder = "Shop Name" required
      placeholderTextColor = "white"
      onChangeText = {shopName => setShopName(shopName)}/>

      <TextInput style = {styles.textinputfields}     
      placeholder = "Shop Address" required
      placeholderTextColor = "white"
      onChangeText = {shopAddress => setShopAddress(shopAddress)}/>

      <TextInput style = {styles.textinputfields}      
      placeholder = "Password" required
      placeholderTextColor = "white"
      secureTextEntry = {true}
      onChangeText = {password => setPassword(password)}/>

      <TextInput style = {styles.textinputfields}      
      placeholder = "Re-Enter Your Password" required
      placeholderTextColor = "white"
      secureTextEntry = {true}
      onChangeText = {confirmpassword => setConfirmPassword(confirmpassword)}/>

      <TouchableOpacity style = {styles.buttonstyle} onPress={()=>onSubmit()}>
        <Text style={styles.textstyle}> Create Account </Text>
      </TouchableOpacity>  

      <TouchableOpacity style={{ marginTop:'6%'}}>
          <Text  style={styles.textstyle} onPress={()=>{OnPressLogin()}}>Already User? Login...</Text>
      </TouchableOpacity>    
      
    </View>
  );  
}

const styles = StyleSheet.create({    
  Wrapper: {
    backgroundColor: 'rgb(88, 149, 164)',
    // padding: 80,
    width: '100%',
    height: '100%',
    paddingTop:'30%',
    paddingHorizontal:'14%'
  },

  textinputfields: {
    fontSize: 15,
    color: 'black',
    marginBottom: '12%',
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },

  headerWrapper: {
    borderBottomColor: '#ff9933',
    borderBottomWidth: 2,
    marginBottom: '10%', 
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    // alignSelf:'center',
    marginBottom:'3%'
  },

  textstyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15
  },

  buttonstyle: {
    padding: '4%',
    marginTop:'3%',
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#ff9933'
  },

  back_button: {
    width: 40, 
    height: 40,     
    top:0,
    paddingTop:0,
    position: 'absolute',
    // zIndex: 99,
    // bottom: 5,
    // shadowColor: 'black',
    // shadowOpacity: 0.15,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 8,     
    alignSelf:'flex-start'
    
  }

}); 

export default Vendor_register;