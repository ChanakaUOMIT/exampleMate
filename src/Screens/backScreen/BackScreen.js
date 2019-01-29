 

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
// import { NavigationActions } from 'react-navigation';
import { NavigationActions, StackActions } from 'react-navigation';
 
class Settings extends Component {
    constructor(props){
        super(props);
        // this.getToken();
        // this.getDecision();
        // this.reset();
      }

    componentDidMount(){
        // this.__callBack();
        this.reset();
    } 

    // __callBack(){
    //     // console.log("Call back ");

    //     const resetAction = StackActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({ routeName: 'MainActivity' })],
    //     });
    //     this.props.navigation.dispatch(resetAction);
    // }

    reset() {
        console.log("Call back ((((((((((((((((((((((((((())))))))))))))))))))))))))) ");

        const resetAction = StackActions.reset({ 
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'TabNavigation' })],
        });
        this.props.navigation.dispatch(resetAction);

        this.__callBack();

        // const { navigate } = this.props.navigation
        // const resetAction = NavigationActions.reset({
        //   index: 0,
        //   actions: [
        //     NavigationActions.navigate({ routeName: 'Login'})
        //   ],
        //   key: null // THIS LINE
        // })
        // this.props.navigation.dispatch(resetAction)
      }
    __callBack(){
        console.log("I am go back Function **************");
        // this.props.navigation.navigate.goBack();
        // this.props.navigation.goBack();
        this.props.navigation.pop();
    }

    

  render() {
    return (
      <View>

      </View>
    );
  }
}

export default Settings;