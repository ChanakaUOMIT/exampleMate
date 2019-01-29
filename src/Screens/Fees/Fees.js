 
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
import CustomHeader from '../../components/Header/CustomHeader';
import FeesDetails from '../../components/FeesDetails/FeesDetails';

class Fees extends Component{
    render() {
        return (
            <View>
            <CustomHeader 
            title="Fees"
            openDrawer={() => this.props.navigation.openDrawer()}
            iconName="md-checkmark-circle"
        />
            <Text>Fees</Text>
            <FeesDetails />
            </View>
        );
      }

}
export default Fees;