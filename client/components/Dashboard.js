import React, {useState} from 'react'
import { SearchBar } from 'react-native-elements';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
function Dashboard() {
  const [user, setUser] = useState('');
//const {search } = user;
/*const onInputChange = e => {
  setUser({ ...user, [e.target.name]: e.target.value });
};
*/
const SampleFunction=()=>{

  Alert.alert("Floating Button Clicked");

}

    return (
    
      <View style = {styles.container}>
        <SearchBar backgroundColor = {'white'}
          placeholder="Enter Consumer's RMN....."
          onChangeText={setUser}
          value={user}
        />
        <View style={styles.MainContainer}>
        
        <TouchableOpacity activeOpacity={1.5} onPress = {() => SampleFunction()} style={styles.TouchableOpacityStyle} >

          <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} 
          
                 style={styles.FloatingButtonStyle} />
       
        </TouchableOpacity>

      </View>
      </View>
   
    );
  }
  const styles = StyleSheet.create({
 
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : '#EDFFEF'
    },
   
    TouchableOpacityStyle:{
   
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: '10%',
      bottom: '8%',
    },
   
    FloatingButtonStyle: {
   
      resizeMode: 'contain',
      width: 70,
      height: 70,
    },

    container: {
      marginTop: '0%',
      width : '100%',
      height: '100%',
      flex: 1,
      
    }
  });
export default Dashboard;