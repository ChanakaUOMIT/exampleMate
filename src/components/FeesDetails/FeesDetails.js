 
import React, {Component} from 'react';
import {View,
    Text,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView,
    AsyncStorage,
    WebView,
} from 'react-native';
import JwtDecode from 'jwt-decode';
import { Container, List, Content, Card, CardItem, ListItem, Button, Left, Body, Right } from 'native-base';



class Fees extends Component{

    constructor(props){
        super(props);
    // this.subjectHandler=this.subjectHandler.bind(this);

        this.state={
            clz_Id:'',
            showWebView:false,
            token:'',
            userId:"",
            subjects:null,
            isLoading:true,
        }
    }

    componentDidMount(){
        this.getToken();
        console.log("I am here @ Payment");
    }

    async getToken(){
        try{
            let token = await AsyncStorage.getItem("token");
            let clz_Id = await AsyncStorage.getItem("clz_Id");

            console.log("#################### get user id in payment"+token);
            console.log("#################### get clz_Id in payment"+clz_Id);

            if(token!=null){
                console.log("*****");
                this.handleToken(token);
                this.handleclz_Id(clz_Id);


            }else{
                console.log("user id is not available");
                // this.getToken();
            }
        }catch(error){
            alert(error+" in Payment ************** ");
        }
     }

     handleclz_Id(clz_Id){
         this.setState({clz_Id:clz_Id});
         console.log("handle clz_Id in payment "+this.state.clz_Id);
     }

     handleToken(token){
        this.setState({token:token});
        console.log("handle token in payment "+this.state.token);
        // this.decode_user_details(token)
    //    this.requestSubjects();
    }

    decode_user_details(){
        var token=this.state.token;
        console.log("decode_user_details  JWT_Token "+token);
        var decoded=JwtDecode(token);
        var user_id=decoded.user._id;
        var merchant_id=1212111;
        var return_url ="https://clzmate.herokuapp.com/payment/payahereResponce/";
        var cancel_url ="https://clzmate.herokuapp.com/payment/payahereResponce/";
        var notify_url ="https://clzmate.herokuapp.com/payment/payahereResponce/";
        var firstName=decoded.user.firstName;
        var lastName=decoded.user.lastName;
        var email=decoded.user.email;
        var phone=decoded.user.phone;

        var firstLine=decoded.user.address.firstLine;
        var secondLine=decoded.user.address.secondLine;

        var address=firstLine+" "+secondLine;

        // var custom_1 = decoded.user._id;
        var custom_2 = this.state.clz_Id;

        console.log(" &&&&&&&&&&&&&&& "+custom_2+" ^^^^^^^^^^^")



        // var city="Colombo";
        var city = decoded.user.address.city
        var country="Sri lanka";
        var order_id=decoded.user.order_id;
        var items=decoded.user.items;
        var currency="LKR";
        var amount=decoded.user.amount;
        var custom_1 = user_id;
        var custom_2 = custom_2;

        // var user_id=decoded.user._id;
        console.log(" decode_user_details merchant_id  "+merchant_id);
        console.log(" decode_user_details return_url  "+return_url);
        console.log(" decode_user_details cancel_url  "+cancel_url);
        console.log(" decode_user_details notify_url  "+notify_url);
        console.log(" decode_user_details user_id  "+user_id);
        console.log(" decode_user_details firstName  "+firstName);
        console.log(" decode_user_details lastName  "+lastName);
        console.log(" decode_user_details email  "+email);
        console.log(" decode_user_details phone  "+phone);

        console.log(" decode_user_details firstLine  "+firstLine);
        console.log(" decode_user_details secondLine  "+secondLine);

        console.log(" decode_user_details address  "+address);
        console.log(" decode_user_details city  "+city);
        console.log(" decode_user_details country  "+country);
        console.log(" decode_user_details order_id  "+order_id);
        console.log(" decode_user_details items  "+items);
        console.log(" decode_user_details currency  "+currency);
        console.log(" decode_user_details amount  "+amount);

        const formData = new URLSearchParams();
        formData.append('merchant_id',merchant_id);
        formData.append('return_url',return_url);
        formData.append('cancel_url',cancel_url);
        formData.append('notify_url',notify_url);
        formData.append('first_name',firstName);
        formData.append('last_name',lastName);
        formData.append('email',email);
        formData.append('phone',phone);
        formData.append('address',address);
        formData.append('city',city);
        formData.append('country',country);
        formData.append('order_id',order_id);
        // formData.append('items',items);
        formData.append('items',"Class Fees");

        formData.append('currency',currency);
        // formData.append('amount',amount);
        formData.append('amount',100);


        for(var p of formData){
            console.log(p);
        }
        const data = formData.toString();
        return(
            <WebView
            source={{
                uri:"https://sandbox.payhere.lk/pay/checkout",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:data,method:'POST'}
            }
            
            />
        )
    }

    
    render() {
        return (
    //         <View >


    //     <View >
    //       {/* <Button  full onPress={ ()=>{this.PayByCard(),this.setState({showWebView:true})}}>  */}
    //       <Button  full onPress={ ()=>{this.setState({showWebView:true}),this.decode_user_details(), console.log("Press Payment")}}> 
                
    //             <Text>Pay by Credit Card</Text>
    //       </Button>  
 
    //       <Button  full onPress={this.OnDeliveryPress}> 
    //             <Text>On Delivery</Text>
    //       </Button>    
    //     </View>


    //      <View style={styles.container}>
    //         {this.state.showWebView && this.decode_user_details()}
    //         {/* {this.decode_user_details()} */}

    //     </View>   

    //     <View>

    //     </View>

    // </View>
            <View>
            
            <Text>Fees details</Text>
            <TouchableOpacity
                onPress={ ()=>{this.setState({showWebView:true}),this.decode_user_details(), console.log("Press Payment")}}
            >
                <Text>Payment</Text>
            </TouchableOpacity>

            <ScrollView>
            <View style={styles.container}>
             {this.state.showWebView && this.decode_user_details()}
             {/* {this.decode_user_details()} */}

         </View>   
         </ScrollView>
            </View>
        );
      }

}
export default Fees;

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
      width: ScreenWidth,
      height: 1000,
      backgroundColor: 'powderblue' // just to be able to differentiate it for debugging 
      // (though the webview itself covers up the blue, so you won't actually see it in the finished example, 
      // unless you do something unsupported like turn your device sideways)
    },
  });
