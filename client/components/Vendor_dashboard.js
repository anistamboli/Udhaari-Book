import React, {useState , useEffect} from 'react'
import { SearchBar } from 'react-native-elements';
import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity, Alert , FlatList, Text} from 'react-native';


const Vendor_dashboard = () =>{
  const [search, setSearch] = useState('');
  const [consumers , setConsumers] = useState([]);
  const [filteredConsumers, setFilteredConsumers] = useState([]);


  const SampleFunction=()=>{
    Alert.alert("Floating Button Clicked");
  }
    

  useEffect(() => {
    var vRMN = 9196191919;
    fetch('http://localhost:5000/Vendor_dashboard/'+vRMN)
    .then((response) => response.json())
    .then((result) => {
        setConsumers(result);
        setFilteredConsumers(result);
      })
      .catch((error) => {
        console.error(error);
      }); 
  },[]);


  const searchFilterFunction = (text) => {
    if (text) {
      const newData = consumers.filter(function (item) {
        var itemData;
        if(isNaN(text)){
          itemData = item.consumer_name
          ? item.consumer_name.toUpperCase()
          : ''.toUpperCase();
        }
        else{
          itemData = item.consumer_contact
          ? item.consumer_contact.toUpperCase()
          : ''.toUpperCase();
        }        
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredConsumers(newData);    
      setSearch(text);
    } 
    else {
      setFilteredConsumers(consumers);
      setSearch(text);
    }
  }

    
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style = {styles.container}>
        <SearchBar 
        backgroundColor = {'white'}
        placeholderTextColor = 'green'
        placeholder="Enter Consumer's Name or Contact Number....."
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction('')}
        value={search}          
        />              
        <View style = {styles.body}>
          <View style = {styles.listWrapper}>
              <Text style = {styles.row}>Name </Text>
              <Text style = {styles.row}>Consumer Contact Number</Text>
            </View>
          <FlatList 
          data = {filteredConsumers}
          renderItem = {({ item }) => {
            return(
              <View style = {styles.listWrapper}>
                <Text style = {styles.row}>{item.consumer_name} </Text>
                <Text style = {styles.row}>{item.consumer_contact}</Text>
              </View>
            )
          }}/>
        </View>         
        <View style={styles.MainContainer}>
          <TouchableOpacity activeOpacity={1.5} onPress = {() => SampleFunction()} style={styles.TouchableOpacityStyle} >
            <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} style={styles.FloatingButtonStyle}/>
          </TouchableOpacity>
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
      //backgroundColor : '#fff',
      flex : 1,
      fontSize : 15,
      paddingHorizontal : 45,
      paddingVertical : 15
    }
  });
export default Vendor_dashboard;