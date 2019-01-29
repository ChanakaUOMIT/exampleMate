
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,AsyncStorage} from 'react-native';
import CustomHeader from '../../components/Header/CustomHeader';
import MarksList from '../../components/marks/MarksList';

class Marks extends Component{
    constructor(props){
        super(props);
    // this.subjectHandler=this.subjectHandler.bind(this);

    this.state={
        clz_Id:"",
        isLoading:true,
    }


    }

    // componentDidMount(){
    //     this.getClz_Id();
    // }

    // async getClz_Id(){ 
    //     console.log("getClz_Id in ResetCode");
    //     try{
    //         let clz_Id=await AsyncStorage.getItem("clz_Id");
    //         console.log("%%%%%%%%%%%%%%%%%%%%%"+clz_Id+"%%%%%%%%%%%%%%%%%%%%%");
    //         this.setClz_Id(clz_Id);
    //     }
    //     catch(error){
    //         alert('getCode error'+error);

    //     }
    // }

    // setClz_Id(clz_Id){
    //     this.setState({
    //         clz_Id:clz_Id
    //     })

    //     console.log("$$$$$$$$$$$$$$$$$$$$$$$ marks  $$$$$$$$$$$$$$$$$$$$$$$$$$"+this.state.clz_Id);
    // }



    render() {
        return (
            <View>
            <CustomHeader 
            title="Marks"
            openDrawer={() => this.props.navigation.openDrawer()}
            iconName="md-checkmark-circle"
        />
            <Text>marks</Text>
            <MarksList />
            </View>
        );
      }

}
export default Marks;