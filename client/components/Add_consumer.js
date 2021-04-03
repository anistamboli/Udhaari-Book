import React, { Component } from 'react';  

import {
  Text,
  View,
  TextInput
} from 'react-native';

export default class Add_consumer extends Component {
    constructor()
    {
        super();
        this.state={
            name:""
        }
    } 
    
    render(){
        return(
            <View>
                
                    <TextInput placeholder={"Enter name"}
                    onChangeText={(e)=>this.setState({e})}>

                    </TextInput>
                    <Text>
                    {this.state.name}
                </Text>
            </View>
        )
}
}
