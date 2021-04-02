import * as React from 'react';  

import {   
 Text,   
 View,   
 StyleSheet,    
 TextInput,  
 TouchableOpacity   
 } from 'react-native'; 


 export default class Vendor_register extends React.Component {  
  render() {  
   return (  
    <View style={styles.Wrapper}>  
     <View style={styles.headerWrapper}> 
          <Text style={styles.heading}> Registration </Text> 
      </View>
      <TextInput style = {styles.textinput}
      underlineColorAndroid = "transparent"
      placeholder = "Enter Your Name"
      placeholderTextColor = "#9a73ef"
      onChangeText = {this.handleName}/>

      <TextInput style = {styles.textinput}
      underlineColorAndroid = "transparent"
      placeholder = "Enter Your Email"
      placeholderTextColor = "#9a73ef"
      autoCapitalize = "none"
      onChangeText = {this.handleEmail}/>

      <TextInput style = {styles.textinput}
      underlineColorAndroid = "transparent"
      placeholder = "Enter Your Password"
      placeholderTextColor = "#9a73ef"
      autoCapitalize = "none"
      secureTextEntry = {true}
      onChangeText = {this.handlePassword}/>

      <TouchableOpacity style = {styles.ButtonStyle}>
        <Text style={styles.TextStyle}> Create Account </Text>
      </TouchableOpacity>

    </View>  

   );  
  }  
 } 


 const styles = StyleSheet.create({  
  
      Wrapper: {
      backgroundColor: 'yellow',
      padding: 50
      },
      textinput: {
        fontSize: 18,
        // alignSelf: 'self',
        color: 'black',
        marginBottom: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 2
      },
      headerWrapper: {
        borderBottomColor: 'red',
        borderBottomWidth: 2,
        marginBottom: 30, 
      },
      heading: {
        fontSize: 28
      },
      TextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign:'center',
        fontSize: 28
      },
      ButtonStyle: {
       padding: 10,
       borderRadius:5,
       width: '100%',
       backgroundColor: 'grey'
     }
}); 
