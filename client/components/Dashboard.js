import React, {useState} from 'react'
import { SearchBar } from 'react-native-elements';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
function App() {
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
        <SearchBar
          placeholder="Enter Consumer's RMN....."
          onChange={setUser}
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
      flex: 25,
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
      top: 300,
    },
   
    FloatingButtonStyle: {
   
      resizeMode: 'contain',
      width: 50,
      height: 50,
    },
    container:{
      width : '80%'
    }
  });
export default App;