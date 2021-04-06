import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';

import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';

export default class Dashboard extends Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  SampleFunction=()=>{

      Alert.alert('Floating Button Clicked');

  }
  

  render() {
    const { search } = this.state;
    return (
    <View style = {styles.container}>
      <SearchBar
        placeholder="Search by Name or RMN..."
        onChangeText={this.updateSearch}
        value={search}
      />
      
      <View style={styles.MainContainer}>
        
        <TouchableOpacity activeOpacity={0.5} onPress={()=>this.SampleFunction()} style={styles.TouchableOpacityStyle} >

          <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} 
          
                 style={styles.FloatingButtonStyle} />
       
        </TouchableOpacity>

      </View>
      
    </View>

    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : '#F5F5F5'
  },

  TouchableOpacityStyle:{

    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    top: 450,
  },

  FloatingButtonStyle: {

    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  container: {
    paddingTop: 70,
    //paddingRight: 100
  }
});