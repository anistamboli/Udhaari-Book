
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    return (
      <View style={styles.container}>
        <Text style={{color: '#888', fontSize: 25 , paddingBottom:30}}> 
            Vendor Login
        </Text>
        <Image style={styles.image} source={require("../assets/sk.jpg")} />

        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Registered Mobile Number"
            placeholderTextColor="#003f5c"
            keyboardType="numeric"
            textAlign="center"
            maxLength={10}
            onChangeText={(contact) => setContact(contact)}
          />
        </View>
   
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            textAlign="center"
            onChangeText={(password) => setPassword(password)}
          />
        </View>
   
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
   
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
   
  const styles = StyleSheet.create({
    container: {
      flex: 0,
      backgroundColor: "#FFF",
      alignItems: "center",
      justifyContent: "center",
    },
   
    image: {
      marginBottom: 25,
    },
   
    inputView: {
      backgroundColor: "#FFC0CB",
      borderRadius: 30,
      width: 280,
      height: 45,
      marginBottom: 20,
      justifyContent: "center",
      alignItems: "center",
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
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "skyblue",
    },
  });