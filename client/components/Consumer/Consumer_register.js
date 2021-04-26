//React Native Imports
import React, { useState }                                     from 'react'; 
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'; 

//React Native Navigation Imports
import { useNavigation } from '@react-navigation/native';
import { NavigationContext, NavigationEvents } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';


const Consumer_register = () => {  
  const[vendorName, setConsumerName] = useState('');
  const[rmn, setRmn] = useState('');
  const[address, setAddress] = useState('');
  const[password, setPassword] = useState('');
  const[confirmpassword, setConfirmPassword] = useState('');
  // const[refreshPage, setRefreshPage] = useState('');
  
  const navigation = useNavigation();

  const OnPressLogin = () => {
    navigation.navigate('Consumer Login');
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
    if(!shopAddress.trim()){
      alert('Please Enter Your Address');
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
        const response = await fetch('http://localhost:5000/Consumer_register', {
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
        {/* <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Vendor Login');}}> 
          <Ionicons name="arrow-back-circle-sharp" size={40} color="black" />
        </TouchableOpacity> */}
      </View>

      <View style={{ flexDirection:'row', borderBottomColor: '#ff9933', borderBottomWidth: 2, marginBottom: '10%' }}> 
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom:'3%', justifyContent :'center'}}> Register Here </Text> 
      </View>
     
      <TextInput style = {styles.textinputfields}      
      placeholder = 'Name' required
      placeholderTextColor = "black"
      onChangeText = {consumerName => setConsumerName(consumerName)}/>

      <TextInput style = {styles.textinputfields}      
      placeholder = "Contact Number" required
      placeholderTextColor = "black"
      maxLength={10}
      keyboardType='numeric'
      onChangeText = {rmn => setRmn(rmn)}/>

      <TextInput style = {styles.textinputfields}     
      placeholder = "Address" required
      placeholderTextColor = "black"
      onChangeText = {address => setAddress(address)}/>

      <TextInput style = {styles.textinputfields}      
      placeholder = "Password" required
      placeholderTextColor = "black"
      secureTextEntry = {true}
      onChangeText = {password => setPassword(password)}/>

      <TextInput style = {styles.textinputfields}      
      placeholder = "Re-Enter Your Password" required
      placeholderTextColor = "black"
      secureTextEntry = {true}
      onChangeText = {confirmpassword => setConfirmPassword(confirmpassword)}/>

      <TouchableOpacity style = {styles.buttonstyle} onPress={()=>onSubmit()}>
        <Text style={styles.textstyle}> Create Account </Text>
      </TouchableOpacity>  

      <TouchableOpacity style={{ flexDirection:'row', justifyContent:'center', marginTop:'62%'}}>
          <Text style={styles.textstyle}>Already User? </Text>
          <Text  style={styles.textstyle1} onPress={()=>{OnPressLogin()}}> Login...</Text>
      </TouchableOpacity>    
      
    </View>
  );  
}

const styles = StyleSheet.create({    
  Wrapper: {
    // backgroundColor: 'rgb(88, 149, 164)',
    // padding: 80,
    backgroundColor: '#EAF2F4',
    width: '100%',
    height: '100%',
    paddingTop:'20%',
    paddingHorizontal:'14%'
  },

  textinputfields: {
    fontSize: 15,
    color: 'black',
    marginBottom: '10%',
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },

  headerWrapper: {
    flexDirection:'row',
    // borderBottomColor: '#ff9933',
    // borderBottomWidth: 2,
    marginBottom: '10%', 
    justifyContent:'center'
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
    fontSize: 16
  },

  textstyle1: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
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

export default Consumer_register;