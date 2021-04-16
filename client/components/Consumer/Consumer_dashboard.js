//React Native Imports
import React, {useState , useEffect}                                                      from 'react'
import { SearchBar }                                                                      from 'react-native-elements';
import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity, Alert , FlatList, Text} from 'react-native';

//React Native Navigation Imports
import { useNavigation } from '@react-navigation/native';


import logout_button from '../../assets/logout_button.png'; 


const Consumer_dashboard = ({route}) =>{
  const cRMN = route.params.cRMN; 
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [vendors , setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
   

  useEffect(() => {
    // var cRMN = 7678697696;
    // console.log(val);
    // var cRMN = val;
    fetch('http://localhost:5000/Consumer_dashboard/'+cRMN)
    .then((response) => response.json())
    .then((result) => {
        setVendors(result);
        setFilteredVendors(result);
      })
      .catch((error) => {
        console.error(error);
      }); 
  },[]);


  const searchFilterFunction = (text) => {
    if (text) {
      const newData = vendors.filter(function (item) {
        var itemData;
        if(isNaN(text)){
          itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        }
        else{
          itemData = item.contact
          ? item.contact.toUpperCase()
          : ''.toUpperCase();
        }        
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredVendors(newData);    
      setSearch(text);
    } 
    else {
      setFilteredVendors(vendors);
      setSearch(text);
    }
  }

    
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style = {styles.container}>
        <View style={{widht:'100%', flexDirection:'row', alignItems:'center', marginTop:'5%'}}>
          <SearchBar 
          inputStyle={{width:'85%'}}
          containerStyle={{width:'85%'}}
          backgroundColor = {'white'}
          placeholderTextColor = 'green'
          placeholder="Enter Consumer's Name or Contact Number....."
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}          
          />       
          <TouchableOpacity activeOpacity={1.5} onPress={()=>{navigation.navigate('Consumer Login');}} style={{width:'15%'}}> 
            <Image source={logout_button} style={{ width: 60, height: 60, alignSelf:'flex-end', top:0, paddingTop:0}} />
          </TouchableOpacity>
        </View>       
        <View style = {styles.body}>
          <View style = {styles.listWrapper}>
              <Text style = {styles.row}>Name </Text>
              <Text style = {styles.row}>Vendor Contact Number</Text>
            </View>
          <FlatList 
          data = {filteredVendors}
          renderItem = {({ item }) => {
            return(
              <View style = {styles.listWrapper}>
                <Text style = {styles.row}
                onPress = {() => { 
                  navigation.navigate('Consumer_navTab', {screen : 'My Udhaari', params: {cRMN: cRMN, vRMN:item.contact}})
                }}>
                  {item.name} 
                </Text>
                <Text style = {styles.row}
                onPress = {() => { 
                  navigation.navigate('Consumer_navTab', {screen : 'My Udhaari', params: {cRMN: cRMN, vRMN:item.contact}})
                }}>
                  {item.contact}
                </Text>
              </View>
            )
          }}/>
        </View>         
      </View>
    </SafeAreaView>
  );
}


  const styles = StyleSheet.create({
 
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
   
    TouchableOpacityStyle:{
   
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: '10%',
      bottom: '8%',
      flex: 1
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
      
    },
    body: {
      backgroundColor : '#fff',
      flex : 7
    },
    listWrapper : {
      flexDirection : 'row',
      flexWrap : 'wrap',
      borderBottomWidth : 1
    },
    row: {
    //   backgroundColor : '#fff',
      flex : 1,
      fontSize : 15,
      paddingHorizontal : 45,
      paddingVertical : 15
    }
  });
export default Consumer_dashboard;