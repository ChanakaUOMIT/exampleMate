
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,AsyncStorage,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import CustomHeader from '../../components/Header/CustomHeader';


const dummyData=[
    {
        marks:"79",
        paperName:"Paper Sample"
    },

    {
        marks:"79",
        paperName:"Paper Special"
    },

    {
        marks:"79",
        paperName:"Paper Final"    
    }
]


class Marks extends Component{
    constructor(props){
        super(props);
    // this.subjectHandler=this.subjectHandler.bind(this);

    this.state={
        user_id:"",
        clz_Id:'',
        isLoading:false,
    }

 
    } 
 
    componentDidMount(){
        this.getClz_Id();
    }

    async getClz_Id(){ 
        console.log("getClz_Id in ResetCode");
        try{
            let clz_Id=await AsyncStorage.getItem("clz_Id");
            let user_id=await AsyncStorage.getItem("user_Id");
            console.log("%%%%%%%%%%%%%%%%%%%%%"+clz_Id+"%%%%%%%%%%%%%%%%%%%%%");
            console.log("%%%%%%%%%%%%%%%%%%%%%"+user_id+"%%%%%%%%%%%%%%%%%%%%%");

            this.setClz_Id(clz_Id);
            this.setUserId(user_id);

        }
        catch(error){
            alert('getCode error'+error);

        }
    }

    setUserId(user_id){
        this.setState({
            user_id:user_id
        })

        console.log("$$$$$$$$$$$$$$$$$$$$$$$ user_id  $$$$$$$$$$$$$$$$$$$$$$$$$$"+this.state.user_id);

        // this.requestMarks();
    }

    setClz_Id(clz_Id){
        this.setState({
            clz_Id:clz_Id
        })

        console.log("$$$$$$$$$$$$$$$$$$$$$$$ marks  $$$$$$$$$$$$$$$$$$$$$$$$$$"+this.state.clz_Id);

        // this.requestMarks();
    }

    requestMarks(){
        console.log("requestMarks");
        var user_Id=this.state.user_id;
        var clz_Id=this.state.clz_Id;

        console.log(" requestMarks "+user_Id+" "+clz_Id);

        // https://clzmate.herokuapp.com/mark/getmarksOdStudent/:studentId/:clzId
        fetch(`https://clzmate.herokuapp.com/mark/getmarksOdStudent/${user_Id}+"/"+${clz_Id}`, {
        // fetch('https://clzmate.herokuapp.com/user/getClasses/5c49d507ef8c7a0022b4aa96', {
        // fetch('https://clzmate.herokuapp.com/user/getClasses/'+this.userId, {

            method:'GET',

        })
        // .then((response) => console.log(response)) 
        .then((response) => response.json())
        //.then((responseJson) => console.log(responseJson))  
        .then((responseJson) =>{
            this.dataHandler(responseJson)
        } ) 
        .done();
    }



    // render() {
    //     return (
    //         <View>
    //         <Text>marks list</Text>
    //         </View>
    //     );
    //   }

    render(){
        if(this.state.isLoading){
           return(
               <View style={styles.containerWait}>
                 <ActivityIndicator size="large" color="#fb8c00" />
                 
               </View>
             )
        }
        else{
            console.log("**************** subject marks is ready ***********", dummyData);
        //    let Subject_list = this.state.subject[0].subject.map((val, key) =>{
           let subject_marks = dummyData.map((val, key) =>{
               return (
                   <View key={key}>
                       <Text>{val.paperName}</Text>
                       <Text>{val.marks}</Text>
                   </View>
                //    <TouchableOpacity key={key} style={styles.item} 
                // //    onPress={()=>this.subjectHandler(val.id)}

                //    >
                       
                //            <Text>{val.marks}</Text>
                //            {/* <Text>{val.paperName}</Text> */}

                //            {/* <Text>{val.id + 1}</Text> */}
   
                //    </TouchableOpacity>
               )
             });
           
       return(
           <View > 
            <ScrollView>
                
                <TouchableOpacity
                    // style={[{opacity:opacityStyle},styles.button]}
                    onPress={()=>this.press()}
                    // disabled={disabled}
                    >
                    </TouchableOpacity>

                    {subject_marks}
                {/* <Icon 
                    name="angle-right"
                    color='#008388'
                    size={32}
                    style={styles.icon}
                /> */}
                {/* <Text>gfgf</Text> */}
                {/* </TouchableOpacity> */}
            </ScrollView>
               
            </View>
        )
    }
   }

}
export default Marks;
