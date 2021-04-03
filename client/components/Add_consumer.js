import React from 'react';

import {
  Text,
  View,
  TextInput
} from 'react-native';

export default class Add_consumer extends React.Component() {
    /*constructor()
    {
        super();
        this.state={
            name:""
        }
    } */
    
    render(){
        return(
            <View>
                <Text>
                    {this.state.name}
                    <TextInput placeholder={"Enter name"}
                    onChangeText={(e)=>{this.setState({name:e})}}>

                    </TextInput>
                </Text>
            </View>
        )
}
}
