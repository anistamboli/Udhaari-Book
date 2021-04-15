//React Native Imports
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { FlatList,Text, View, Alert } from 'react-native';


const My_account = () => {      
  const [isLoading, setLoading] = useState(true);
  const [vendorContact, setVendorContact]=('9196191919');
  const [consumerContact, setConsumerContact]=('9021390130');
  const [selectedConsumer, setSelectedConsumer] = useState([]);  
  

  useEffect(() => {
    var vRMN =9196191919;
    var cRMN =9021390130;
    fetch('http://localhost:5000/Account_details/'+vRMN+'/'+cRMN)
      .then((response) => response.json())
      .then((result) => setSelectedConsumer(result))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    alert('My Account');
  }, []);


    return (      
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <Text>Loading...</Text> : (       
                <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between', paddingTop:10}}>  
                    {selectedConsumer[0].payed_amount>0 ? 
                        <Text style={{textAlign:'center',padding: 10, borderRadius: 5, width: '20%', backgroundColor: 'green', alignSelf:'flex-end'}}>Active</Text>: 
                        <Text style={{textAlign:'center',padding: 10, borderRadius: 5, width: '20%', backgroundColor: 'red', alignSelf:'flex-end'}}>Blocked</Text>
                    }           
                    <Text>{'\n'}</Text>        
                    <Text style={{ fontSize: 14, color: 'green', textAlign: 'left', paddingBottom: 10}}>{selectedConsumer[0].consumer_name}</Text> 
                    <Text style={{ fontSize: 14, color: 'green', textAlign: 'left', paddingBottom: 10}}>9021390130</Text>                  
                    <FlatList
                    data = {selectedConsumer}
                    renderItem = {({item}) => {
                        return(
                            <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flex: 1, paddingTop:0}}>
                                <View>                
                                    <Text>THRESHOLD</Text>
                                    <Text>ACCOUNT STARTED DATE</Text>                                
                                    <Text>START DATE</Text>
                                    <Text>DUE DATE</Text>     
                                    <Text>LAST PAID AMOUNT</Text>                            
                                    <Text>TOTAL DUE AMOUNT</Text>
                                    <Text>PARTIAL DUE AMOUNT</Text>      
                                </View>
                                <View>
                                    <Text>{item.threshold}</Text> 
                                    <Text>{item.start_date}</Text>                                
                                    <Text>{item.billing_start_date}</Text>
                                    <Text>{item.due_date}</Text>      
                                    <Text>₹{item.payed_amount}.00</Text>                
                                    <Text>₹{item.balance}.00</Text>
                                    <Text>₹{item.balance*item.threshold}.00</Text>                                          
                                </View>  
                            </View>
                        )            
                    }}/>   
                </View>
            )}
        </View>
    );
}


export default My_account ;