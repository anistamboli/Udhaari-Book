//React Native Imports
import React, { useState }                                     from 'react'; 
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ToastAndroid,Image, ImageBackground } from 'react-native'; 

//React Native Navigation Imports
import { useNavigation } from '@react-navigation/native';
import { NavigationContext, NavigationEvents } from 'react-navigation';


const Vendor_register = () => {  
  const[vendorName, setVendorName] = useState('');
  const[rmn, setRmn] = useState('');
  const[shopName, setShopName] = useState('');
  const[shopAddress, setShopAddress] = useState('');
  const[password, setPassword] = useState('');
  const[confirmpassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();


  const OnPressLogin = () => {
    navigation.navigate('Vendor Login');
  }


  const ClearStates = () => {
    setVendorName('');
    setRmn('');
    setShopName('');
    setShopAddress('');
    setPassword('');
    setConfirmPassword('');
  }


  const onSubmit = async () => { 
    if(!vendorName.trim()){
      //alert('Please Enter Your Name');
      ToastAndroid.showWithGravity(
        "Please Enter Your Name",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
       
      );
      return;
    }
    else if(!isNaN(vendorName) || !(vendorName.match(/^[A-Za-z]+$/))){
     // alert('Please Enter A Valid Name Containing Alphabets Only');
     ToastAndroid.showWithGravity(
      "Please Enter A Valid Name Containing Alphabets Only",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
     
    );
      return;
    }
    else if(!rmn.trim()){
     // alert('Please Enter Your Contact Number');
     ToastAndroid.showWithGravity(
      "Please Enter Your Contact Number",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
     
    );
      return;
    }
    else if(isNaN(rmn)){
      //alert("Please Enter A Valid 10 Digit Contact Number");
      ToastAndroid.showWithGravity(
        "Please Enter A Valid 10 Digit Contact Number",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
       
      );
      return;
    }
    else if(rmn>9999999999 || rmn<6999999999){
     // alert("Required 10 Digit Valid Contact Number");
     ToastAndroid.showWithGravity(
      "Required 10 Digit Valid Contact Number",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
     
    );
      return;
    }
    else if(!shopName.trim()){
      //alert('Please Enter Your Shop Name');
      ToastAndroid.showWithGravity(
        "Please Enter Your Shop Name",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
       
      );
      return;
    }
    else if(!shopAddress.trim()){
     // alert('Please Enter Your Shop Address');
     ToastAndroid.showWithGravity(
      "Please Enter Your Shop Address",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
     
    );
      return;
    }
    else if(!password.trim()){
     // alert('Please Enter Your Password');
     ToastAndroid.showWithGravity(
      "Please Enter Your Password",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
     
    );
      return;
    }
    else if(!confirmpassword.trim()){
     // alert('Please Re-Enter Your Password');
     ToastAndroid.showWithGravity(
      "Please Re-Enter Your Password",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
     
    );
      return;
    }    
    else if(password!=confirmpassword){
      //alert('Password Unmatched');
      ToastAndroid.showWithGravity(
        "Password Unmatched",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
       
      );
      return;
    }
    else{
      try{      
        const body = {contact:Number(rmn), name:vendorName, shop_name:shopName, shop_address:shopAddress, password:password};
        const response = await fetch('http://localhost:5000/Vendor_register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/JSON'
          },
          body: JSON.stringify(body)      
        });
        const result = await response.json();
        //alert(result.message);
        ToastAndroid.showWithGravity(
          result.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
         
        );
        if(result.success==true){
          ClearStates()
          navigation.navigate('Vendor Login')        
        }
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

      <View style={{ flexDirection:'row', borderBottomColor: '#f55864', borderBottomWidth: 2, marginBottom: '12%', marginTop:'5%' }}> 
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom:'3%', justifyContent :'center'}}> Register Here </Text> 
      </View>
     
      <TextInput style = {styles.textinputfields}      
      placeholder = 'Name' required
      placeholderTextColor = "black"
      onChangeText = {vendorName => setVendorName(vendorName)}
      value = {vendorName}/>

      <TextInput style = {styles.textinputfields}      
      placeholder = "Contact Number" required
      placeholderTextColor = "black"
      maxLength={10}
      keyboardType='numeric'
      onChangeText = {rmn => setRmn(rmn)}
      value={rmn}/>

      <TextInput style = {styles.textinputfields}      
      placeholder = "Shop Name" required
      placeholderTextColor = "black"
      onChangeText = {shopName => setShopName(shopName)}
      value = {shopName}/>

      <TextInput style = {styles.textinputfields}     
      placeholder = "Shop Address" required
      placeholderTextColor = "black"
      onChangeText = {shopAddress => setShopAddress(shopAddress)}
      value = {shopAddress}/>

      <TextInput style = {styles.textinputfields}      
      placeholder = "Password" required
      placeholderTextColor = "black"
      secureTextEntry = {true}
      onChangeText = {password => setPassword(password)}
      value = {password}/>

      <TextInput style = {styles.textinputfields}      
      placeholder = "Re-Enter Your Password" required
      placeholderTextColor = "black"
      secureTextEntry = {true}
      onChangeText = {confirmpassword => setConfirmPassword(confirmpassword)}
      value = {confirmpassword}/>

      <TouchableOpacity style = {styles.buttonstyle} onPress={()=>onSubmit()}>
        <Text style={styles.textstyle}> Create Account </Text>
      </TouchableOpacity>  

      <TouchableOpacity style={{ flexDirection:'row', justifyContent:'center', marginTop:'30%'}}>
          <Text style={{color:'black',fontWeight: 'bold',textAlign: 'center', fontSize: 16}}>Already User? </Text>
          <Text  style={styles.textstyle1} onPress={()=>{OnPressLogin()}}> Login...</Text>
      </TouchableOpacity>      
    </View>
  );  
}


const styles = StyleSheet.create({    
  Wrapper: {
    // backgroundColor: 'rgb(88, 149, 164)',
    // padding: 80,
    backgroundColor: '#edf7fc',
    width: '100%',
    height: '100%',
    paddingTop:'20%',
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
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },

  textstyle1: {
    color: '#109dcc',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },

  buttonstyle: {
    padding: '4%',
    marginTop:'3%',
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#f55864'
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