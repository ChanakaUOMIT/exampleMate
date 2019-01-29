 

import React, {Component} from 'react';
import {View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    AsyncStorage
} from 'react-native';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import colors from '../../styles/colors';
import InputField from '../../components/form/InputField';
import NextArrorButton from '../../components/button/NextArrorButton';
// import Loader from '../../components/form/Loader';
// import Notification from '../../components/notification/Notification';
import NavBarButton from '../../components/button/NavBarButton';
//import CustomHeader from '../../components/Header/CustomHeader';
 
 
class ResetCode extends Component{
    constructor(props){
        super(props);
        this.state={
            state:'',
            code:'',  
            userCode:'' ,
            validCode:false,         
        };

        this.handleResetCode=this.handleResetCode.bind(this);


    }

    componentDidMount(){
        this.getCode();
        this.getEmail();
    }

    async getEmail(){
        console.log("getEmail in ResetCode");
        try{
            let email=await AsyncStorage.getItem("fp_email");
            console.log("!!!!!!!!!!!!!!!! "+email);
            this.setEmail(email);
        }
        catch(error){
            alert('get email error'+error);

        }
    }

    async getCode(){
        console.log("getCode in ResetCode");
        try{
            let code=await AsyncStorage.getItem("fp_code");
            console.log("%%%%%%%%%%%%%%%%%%%%%"+code);
            this.setCode(code);
        }
        catch(error){
            alert('getCode error'+error);

        }
    }

    setEmail(email){
        this.setState({
            email:email
        })

        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"+this.state.email);
    }

    setCode(code){
        this.setState({
            code:code
        })

        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"+this.state.code);
    }

    handleResetCode(code){
        this.setState({ userCode:code});


        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ "+this.state.userCode);



        if(!this.state.validCode){
            if(code.length==7){
                this.setState({ validCode: true});
            }
        }else{
            if(code.length!=7){
                this.setState({ validCode: false});
            }
        }
    }

    goToNextStep(userCode,code){
        // console.log("go to next step"+this.state.userCode);
        console.log("go to next step userCode "+userCode);
        console.log("go to next step code "+code);

        if(code==userCode){
            alert("Reset link is sent tio your email");
            this.informToServer();
            this.props.navigation.navigate("Login");
        }else{
            alert("Check");
            this.props.navigation.navigate("ForgotPassword");

        }        
    }

   informToServer(){
        // alert('Presss Next');


        console.log('ForgotPassword');
        console.log(this.state.emailAddress);
      
        // url = 'https://ems.aladinlabs.com/api/password/create';
        url = 'https://clzmate.herokuapp.com/user/forgotPassword/dldndasanayaka@gmail.com';

        console.log(url);

        fetch(url,{
            method:'GET',
            // headers:{
            //     'Content-Type': 'application/json',
            //     'X-Requested-With': 'XMLHttpRequest'
            // },
            // body:JSON.stringify({
            //         email : this.state.emailAddress
            // })
        })
        .then((res) => res.json() /*console.log(res)*/)
        .then((resJson) =>{
            console.log(resJson," (((((((((((((((((((((((((())))))))))))))))))))))")
            this.datahandler(resJson)
        })
    }    

    datahandler(data){

        var state=data.state;
        var code=data.code.toString();
        // var stateString=state.toString();
        if(state)
            var stateString="true"
        else
            var stateString="false"

        console.log("In datahandler ",data);
        console.log("In datahandler ",stateString);
        console.log("In datahandler code ",code);

        this.setState({
            state:stateString,
            code:code
        })

        this.setfp_State(stateString);
        this.setCode(code);

        console.log("in state "+this.state.code+" "+this.state.state);



        if(state){
            this.props.navigation.navigate("ResetCode");

        }else{
            alert("Your email doesn't exist");
        }
    }

    

  render() {
    const { loadingVisible, formValid, validCode }=this.state;
    const background=formValid ? colors.green01 : colors.darkOrange;
    // const showNotification=formValid? false:true;
      return (
        <KeyboardAvoidingView 
        style={[{backgroundColor:background},styles.wrapper]}
        // behavior="padding"
    > 
        
        <View style={styles.scrollViewWrapper}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.forgotPasswordHeading}>
                    Reset password ?
                </Text>
                <Text style={styles.forgotPasswordSubheading}>
                    Enter Recovery Key
                </Text>

                <InputField 
                    labelText="RECOVERY KEY"
                    customStyle={{marginBottom:30}}
                    textColor={colors.white}
                    labelTextSize={14}
                    labelColor={colors.white}
                    borderBottomColor={colors.white}
                    inputType="num"
                    onChangeText={this.handleResetCode}
                    showCheckmark={validCode}
                />
            </ScrollView>
        

            <View>
                <NextArrorButton 
                    handleNextButton={()=>this.goToNextStep(this.state.userCode, this.state.code)}
                    // disabled={!validEmail}
                />
            </View>

            {/* <View style={styles.notificationWrapper}> */}
                {/* <Notification 
                    showNotification={showNotification}
                    handleCloseNotification={this.handleCloseNotification}
                    type="Error"
                    firstLine="No account exists for the requested"
                    secondLine="email address"
                /> */}
            {/* </View> */}
        </View>

        {/* <Loader 
            modalVisible={loadingVisible}
            animationType="fade"
        /> */}
     </KeyboardAvoidingView>
      );
    }

}
export default ResetCode;

const styles = StyleSheet.create({
    wrapper: {
        display:'flex',
        flex:1,
        // backgroundColor: colors.green01,
    },
    scrollViewWrapper:{
        marginTop:70,
        flex:1,
    },
    scrollView:{
        paddingLeft:30,
        paddingRight:30,
        paddingTop:20,
        flex:1
    },
    form:{
        marginTop:90,
        paddingLeft:20,
        paddingRight:20,
        flex:1,
    },
    forgotPasswordHeading:{
        fontSize:28,
        color:colors.white,
        fontWeight:'300'
    },
    forgotPasswordSubheading:{
        color:colors.white,
        fontWeight:'600',
        fontSize:15,
        marginTop:10,
        marginBottom:60
    },
    notificationWrapper:{
        position:'absolute',
        bottom:0,
        // zIndex:9
        zIndex:999
    },
});