import React, { useState, useEffect } from 'react'; 
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'; 


const Consumer_register = () => {  
  const[consumerName, setConsumerName] = useState('');
  const[rmn, setRmn] = useState('');
  const[address, setAddress] = useState('');
  const[password, setPassword] = useState('');
  const[confirmpassword, setConfirmPassword] = useState('');


  const onSubmit = async () => { 
    if(!consumerName.trim()){
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
    if(!address.trim()){
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
        const body = {contact:rmn, name:consumerName, address:address, password:password};
        const response = await fetch('http://localhost:5000/Consumer_register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/JSON'},
            body: JSON.stringify(body)      
        });
        var result = await response.json();
        console.log(result);
        alert(result);
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
      </View>

      <TextInput style = {styles.textinputfields}      
      placeholder = 'Name' required
      placeholderTextColor = "white"
      onChangeText = {consumerName => setConsumerName(consumerName)}/>

      <TextInput style = {styles.textinputfields}      
      placeholder = "Contact Number" required
      placeholderTextColor = "white"
      maxLength={10}
      keyboardType='numeric'
      onChangeText = {rmn => setRmn(rmn)}/>

      <TextInput style = {styles.textinputfields}     
      placeholder = "Address" required
      placeholderTextColor = "white"
      onChangeText = {address => setAddress(address)}/>

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
    </View>
  );  
}


const styles = StyleSheet.create({    
  Wrapper: {
    backgroundColor: 'rgb(88, 149, 164)',
    padding: 80,
    width: '100%',
    height: '100%',
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

export default Consumer_register;