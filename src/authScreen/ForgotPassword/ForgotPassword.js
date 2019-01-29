import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    AsyncStorage
} from 'react-native';
import colors from '../../styles/colors';
import InputField from '../../components/form/InputField';
import NextArrorButton from '../../components/button/NextArrorButton';
import Loader from '../../components/form/Loader';
import Notification from '../../components/notification/Notification';
import NavBarButton from '../../components/button/NavBarButton';
 
class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            state:'',
            code:'',
            formValid:true,
            loadingVisible:false,
            validEmail:false,
            emailAddress:''
        };
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.goToNextStep=this.goToNextStep.bind(this);
        this.handleCloseNotification=this.handleCloseNotification.bind(this);
        this.datahandler=this.datahandler.bind(this);

    }

    handleEmailChange(email){
        const emailCheckRegex=/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        this.setState({ emailAddress:email});

        if(!this.state.validEmail){
            if(emailCheckRegex.test(email)){
                this.setState({ validEmail: true});
            }
        }else{
            if(!emailCheckRegex.test(email)){
                this.setState({ validEmail: false});
            }
        }
    }

    goToNextStep(){
        // this.setState({ loadingVisible:true});
        // alert('Presss Next');
        // alert(this.state.emailAddress);


        console.log('ForgotPassword');
        var user_email=this.state.emailAddress
        console.log(user_email);
      
        // url = 'https://ems.aladinlabs.com/api/password/create';
        // url = 'https://clzmate.herokuapp.com/user/forgotPassword/dldndasanayaka@gmail.com';
        url = `https://clzmate.herokuapp.com/user/forgotPassword/${user_email}`;


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

        if(data.state){

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
        this.setfp_Email(this.state.emailAddress);


        console.log("in state "+this.state.code+" "+this.state.state+" *** "+this.state.emailAddress);



        if(state){
            this.props.navigation.navigate("ResetCode");
        }
        }else{
            alert("Your email doesn't exist");
            // this.props.navigation.navigate("ForgotPassword");
            // this.setState({
            //     emailAddress:''
            // })
        }
    }

    async setfp_Email(email){
        console.log("fp set email 11111111 "+email);
        try{
            await AsyncStorage.setItem("fp_email",email);
            console.log("forgot password email saved");
        }catch(error){
            alert("fp email store error"+error);
        }

    }


    async setfp_State(state){
        console.log("fp set state 00000 "+state);
        try{
            await AsyncStorage.setItem("fp_state",state);
            console.log("forgot password state saved");
        }catch(error){
            alert("fp state store error"+error);
        }

    }


    async setCode(code){
        console.log("fp set code "+code);
        try{
            await AsyncStorage.setItem("fp_code",code);
            console.log("forgot password code saved");
        }catch(error){
            alert("fp code store error"+error);
        }

    }


    handleCloseNotification(){
        this.setState({ formValid: true})
    }
     render(){
         const { loadingVisible, formValid, validEmail }=this.state;
         const background=formValid ? colors.green01 : colors.darkOrange;
         const showNotification=formValid? false:true;

        return(
            <KeyboardAvoidingView 
                style={[{backgroundColor:background},styles.wrapper]}
                // behavior="padding"
            > 
                <View style={styles.NavBarButtonWrapper}>
                    <NavBarButton style={styles.NavBarButton}
                        // handleButtonPress={this.handleButtonPress}
                        handleButtonPress={() => this.props.navigation.navigate('Login')}
                        location="right"
                        color={colors.white}
                        text="Log In"
                    />
                </View>
                <View style={styles.scrollViewWrapper}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.forgotPasswordHeading}>
                            Forgot your password ?
                        </Text>
                        <Text style={styles.forgotPasswordSubheading}>
                            Enter your email to find your account
                        </Text>

                        <InputField 
                            labelText="EMAIL ADDRESS"
                            customStyle={{marginBottom:30}}
                            textColor={colors.white}
                            labelTextSize={14}
                            labelColor={colors.white}
                            borderBottomColor={colors.white}
                            inputType="email"
                            onChangeText={this.handleEmailChange}
                            showCheckmark={validEmail}
                        />
                    </ScrollView>
                

                    <View>
                        <NextArrorButton 
                            handleNextButton={this.goToNextStep}
                            // disabled={!validEmail}
                        />
                    </View>

                    <View style={styles.notificationWrapper}>
                        <Notification 
                            showNotification={showNotification}
                            handleCloseNotification={this.handleCloseNotification}
                            type="Error"
                            firstLine="No account exists for the requested"
                            secondLine="email address"
                        />
                    </View>
                </View>

                <Loader 
                    modalVisible={loadingVisible}
                    animationType="fade"
                />
             </KeyboardAvoidingView>
         )
     }
}
 
export default ForgotPassword;


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