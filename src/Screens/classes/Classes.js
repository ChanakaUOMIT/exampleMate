import React, { Component } from 'react';
import {View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import ClassList from '../../components/classList/ClassList';
import { Card, ListItem, Button, Header } from 'react-native-elements'
 
 
class Classes extends Component{
constructor(props){
    super(props);
 
} 


     render(){
        return(
            <ScrollView>
                <View> 
                    <Header
                    //leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'My Classes', style: { color: '#fff' } }}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                    />
                 <ClassList/>
                 <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate("StudentDrawerNavigation")}
                >
                </TouchableOpacity>
                </View>
            </ScrollView>
            
         )
     }
}
 



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        },
});
export default Classes;

 