import React, {Component} from "react";
import {
    View,
    
    StyleSheet, TouchableOpacity, Text,AsyncStorage,WebView, Dimensions
} from "react-native";
import { CheckBox, PricingCard} from 'react-native-elements';
import { Container, List, Content, Card, CardItem, ListItem, Button, Left, Body, Right } from 'native-base';
import { Icon } from 'react-native-elements'






class Shop extends Component{

  constructor(props) {
    super(props);
  
      this.state = {
          item: [],
          shop:[],
          totalprice:0,
          showWebView:false,
          paymentdata:{}
        
          

      };

  }

 
//     const bodyobj = {
//         email:Email,
//         firstName:FirstName,
//         lastName:LastName,
//         mobileNo:MobileNo,
//         pass_word:Pass_word
//     };
//     console.log(bodyobj),
//   //console.log(username)
//   fetch('https://handallo.azurewebsites.net/api/Customer/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   //   body: JSON.stringify({
//   //     email: username,
//   //     pass_word: password,
//   //   }),
//   body: JSON.stringify(bodyobj)
    
// })
// .then((response) => 
// {
//     if(response.status === 200){
//       this.props.navigation.navigate('Login');
//     }
//     else{
//         alert("login failed")
//     }
    
// })

  

  
OnDeliveryPress=() =>{
    this.props.navigation.navigate('Location')
}





  componentDidMount(){
    const data = this.props.navigation.state.params;
    //console.log(this.props.navigation.state.params);
    //console.log(data);
    // this.setState({
    //     item:data.Items,
    //     shop:data.Shop,
    //     totalprice:data.Totalprice
    // })
    this.state.item=data.Items,
    this.state.shop=data.Shop,
    this.state.totalprice = data.Totalprice  


    
    console.log(this.state,"cart");
    
  }

async PayByCard(){
    const Customer = await this.customerdetails();
    //console.log(Customer);
    const data={
        "CustomerId":Customer.CustomerId,
        "TotalAmount":this.state.totalprice
    }

    fetch('https://handallo.azurewebsites.net/api/Customer/checkoutorder',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
        
    })
    .then((response) => {
        console.log(response,"fghj")
        if(response.status === 200){
            response.json().then(
                (responsejson => {
                    console.log(responsejson)
                    this.paymentview(responsejson)
                })
            )
        }
    })

    //console.log(data)
}


  async customerdetails(){
    var decoded;
  const token =  await AsyncStorage.getItem('token')

    var jwtDecode = require('jwt-decode');
    
    decoded = jwtDecode(token);


  Customer={
    "CustomerId" : decoded.acr,
    "CurrentLat" : this.state.latitude,
    "CurrentLng" : this.state.longitude,
}
  //console.log(Customer);
  return await Customer;
}

paymentview(responsejson){
    const data = {
        "merchant_id":responsejson.merchant_id,
        "address":responsejson.address,
        "amount":responsejson.amount,
        "cancel_url":responsejson.cancle_url,
        "city":responsejson.city,
        "country":responsejson.country,
        "currency":responsejson.currency,
        "email":responsejson.email,
        "first_name":responsejson.first_name,
        "items":responsejson.items,
        "last_name":responsejson.last_name,
       
        "notify_url":responsejson.notify_url,
        "order_id":responsejson.order_id,
        "phone":responsejson.phone,
        "return_url":responsejson.return_url
    }

    this.setState({paymentdata:data})
    
}

renderContent(){
    console.log(this.state.paymentdata,"dfghjk")
    const formData = new URLSearchParams();
    formData.append('merchant_id',this.state.paymentdata.merchant_id);
    formData.append('return_url',this.state.paymentdata.return_url);
    formData.append('cancel_url',this.state.paymentdata.cancel_url);
    formData.append('notify_url',this.state.paymentdata.notify_url);
    formData.append('first_name',this.state.paymentdata.first_name);
    formData.append('last_name',this.state.paymentdata.last_name);
    formData.append('email',this.state.paymentdata.email);
    formData.append('phone',this.state.paymentdata.phone);
    formData.append('address',this.state.paymentdata.address);
    formData.append('city',this.state.paymentdata.city);
    formData.append('country',this.state.paymentdata.country);
    formData.append('order_id',this.state.paymentdata.order_id);
    formData.append('items',this.state.paymentdata.items);
    formData.append('currency',this.state.paymentdata.currency);
    formData.append('amount',this.state.paymentdata.amount);

    for(var p of formData){
        console.log(p);
    }
    console.log(" &&&&&&&&&&&&&&&&&&&&&&&& ");
    const data = formData.toString();
    return(
        <WebView
        source={{
            uri:"https://sandbox.payhere.lk/pay/checkout",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:data,method:'POST'}
        }
        
        />
    )
}
  




  render(){

    return(



        <View >


        <View >
          <Button  full onPress={ ()=>{this.PayByCard(),this.setState({showWebView:true})}}> 
                <Text>Pay by Credit Card</Text>
          </Button>  
 
          <Button  full onPress={this.OnDeliveryPress}> 
                <Text>On Delivery</Text>
          </Button>    
        </View>


         <View style={styles.container}>
            {this.state.showWebView && this.renderContent()}
        </View>   

        <View>

        </View>

    </View>


    //     <View style={{ flexDirection: "row" }}>
    //     <View style={{ flex: 1 }}>
     
    //         <TouchableOpacity style={{ alignSelf: 'stretch',backgroundColor: '#2980B9' }} onPress= { this.onSavePress }>
    //              <Text style={{ alignSelf: 'center',
    //                            color: '#ffffff',
    //                            fontSize: 16,
    //                            fontWeight: '600',
    //                            paddingTop: 10,
    //                            paddingBottom: 10 }}>Pay on Delivery</Text>
    //         </TouchableOpacity>
    //     </View>
    //     <View style={{borderLeftWidth: 1,borderLeftColor: 'white'}}/>
    //     <View style={{ flex: 1}}>
    //         <TouchableOpacity style={{ alignSelf: 'stretch',backgroundColor: '#2980B9'}} onPress={ ()=>{this.PayByCard(),this.setState({showWebView:true})}}>
    //              <Text style={{ alignSelf: 'center',
    //                            color: '#ffffff',
    //                            fontSize: 16,
    //                            fontWeight: '600',
    //                            paddingTop: 10,
    //                            paddingBottom: 10 }}>Pay by Credit Card</Text>
    //         </TouchableOpacity>
           
    //     </View>
    //     <View>
    //            {this.state.showWebView && this.renderContent()}
    //     </View>
       
    // </View>














        // <CheckBox
        // center
        // title='On Delivery'
        // checkedIcon='dot-circle-o'
        // uncheckedIcon='circle-o'
        // checked={this.state.checked}
        // onPress = {this.OnDeliveryPressed}
        // />

        // <CheckBox
        // center
        // title='Credit Card'
        // checkedIcon='dot-circle-o'
        // uncheckedIcon='circle-o'
        // checked={this.state.checked}
        // onPress = {this.CreditCardPressed}
        // />

    //     <Container>
    //   <Content>
    //   <List dataArray={this.state.data} renderRow={(item) =>
    //   <ListItem>
    //     <Card>
    //       <CardItem 
    //         button = {true}
    //        // onPress = { ()=>{this.onPressShop(item.ShopId)}}
    //         cardBody  
    //         style={{width: Dimensions.get('window').width}}>
    //         <Image source={{uri: item.url }} style={{height: 100, width: null , flex: 1}}/>
    //       </CardItem>
    //       <CardItem>
    //           <Body>
    //             <Text>{item.ShopName}</Text>
    //             <Text note>{item.Des_cription}</Text>
               
    //           </Body>
    //           <Button> 
               
    //           </Button>
    //       </CardItem>
    //     </Card>
    //     </ListItem>
    //   }>
    //   </List>
    //   </Content>
    // </Container>


   


/* 

    <PricingCard
    color='#4f9deb'
    title='Total Rs.'
    price= {this.state.totalprice}
    info={['', '', '']}
    // button={{ title: 'Pay On Delivery', icon: 'cash-multiple' }}
    // button={{ title: 'Pay by Credit Card', icon: 'credit-card' }}
    button={{ title: 'Proceed to Payment ', icon: 'credit-card'}} />
     */
  

// onButtonPress: this.props.navigation.navigate('Home')


        // <View style={styles.container} > 
        //     <Text>Cart</Text>
        // </View>
       
    );
}


}
export default Shop;

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent:'center'
        
//     }
// });



const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;




const styles = StyleSheet.create({
    container: {
      width: ScreenWidth,
      height: 600,
      backgroundColor: 'powderblue' // just to be able to differentiate it for debugging 
      // (though the webview itself covers up the blue, so you won't actually see it in the finished example, 
      // unless you do something unsupported like turn your device sideways)
    },
  });