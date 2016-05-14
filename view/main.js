/**
 * main of GENE
 */
'use strict'

import React, { Component } from 'react';
import {
  AlertIOS,
  Image,
  Modal,
  NavigatorIOS,
  RefreshControl,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Util from './utils';
import {
  getTheme,
  setTheme,
  MKColor,
  MKCheckbox,
  MKButton,
  mdl,
} from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Item from './item';

const theme = getTheme();

setTheme({checkboxStyle: {
  fillColor: MKColor.LightGreen,
  borderOnColor: MKColor.LightGreen,
  borderOffColor: MKColor.LightGreen,
  rippleColor: 'rgba(139,195,74,.15)',
}});

class UserInfo extends Component{
	constructor(props){
		super(props);
		this.state = {
			username: this.props.username,
		};
	}

	render() {
		return(
			<View style={styles.card}>
				<View style={theme.cardStyle}>
				  <Image source={{uri:'card'}} style={theme.cardImageStyle}/>
				  <Text style={theme.cardActionStyle}>My Modules (6)</Text>
				  <View style={styles.icon}>
         		<Text style={styles.iconText}>{this.state.username.charAt(0).toUpperCase()}</Text>
        	</View>
        	<View style={styles.usernameContainer}>
        		<Text style={styles.username}>{this.state.username}</Text>
        		<Text style={styles.email}>fangwei716@gmail.com</Text>
        	</View>
				</View>
			</View>
		)
	}
}

class List extends Component{
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        index:0,
        title:'Some name for the task',
        created: '2016.05.12 16:18',
        completed: 10,
        link: 'http://www.google.com',
        component:'module3',
      },{
        index:1,
        title:'My fifth task',
        created: '2016.05.12 14:28',
        completed: 30,
        link: 'http://www.google.com',
        component:'module4',
      },{
        index:2,
        title:'A task for analyzing something',
        created: '2016.05.12 11:56',
        completed: 60,
        link: 'http://www.google.com',
        component:'module2',
      },{
        index:3,
        title:'My third task',
        created: '2016.05.12 08:52',
        completed: 80,
        link: 'http://www.google.com',
        component:'module1, module2',
      },{
        index:4,
        title:'Another task of mine',
        created: '2016.05.02 16:39',
        completed: 100,
        link: 'http://www.google.com',
        component:'module4',
      },{
        index:5,
        title:'My first task',
        created: '2016.04.18 17:39',
        completed: 100,
        link: 'http://www.google.com',
        component:'module3',
      }],
      isRefreshing: false,
      refreshTitle: "pull down to update"
    }
  }

  componentWillMount() {
    // fetch
    // Util.post("http://dnafw.com:8100/iosapp/all_orders/",{uid:this.props.uid},(resData) => {
    //     if (resData.error!=="true") {
    //       console.log(resData);
    //       this.setState({
    //         rowData: resData,
    //       });
    //     }
    // });
  }

  _deleteTask(index) {
    const {data} = this.state;
    for (var i = 0; i < data.length; i++) {
      if(data[i].index === index){
        data.splice(i,1)
      }
    }
    this.setState({
      data
    })
    //fetch 
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      refreshTitle: "updating"
    });

    // fetch
    // Util.post("http://dnafw.com:8100/iosapp/all_orders/",{uid:this.props.uid},(resData) => {
    //     if (resData.error!=="true") {
    //       this.setState({
    //         isRefreshing: false,
    //         data: resData,
    //         refreshTitle: "更新完毕",
    //       });
    //     }else{
    //       this.setState({
    //         isRefreshing: false,
    //         refreshTitle: "更新失败",
    //       });
    //     }
    //     setTimeout(() => {
    //       this.setState({
    //         refreshTitle: "下拉更新"
    //       });
    //     }, 1000);
    // });
  }

  render() {
    const items = this.state.data.map((elem, index) => {
      return (
        <Item deleteTask={(i) => this._deleteTask(i)}key={'item'+index} data={elem} navigator={this.props.navigator}/>
      );
    })

    return(
      <ScrollView 
        style={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            title={this.state.refreshTitle}
            onRefresh={() => this._onRefresh()}
            tintColor="#ddd"
          />
        }
      >
        <View style={styles.list}>
          {items}
        </View>
      </ScrollView>
    )
  }
}

class MainView extends Component{
	constructor(props) {
		super(props);
    this.state = {
      showModal: false,
      modalTitle: '',
    }
	}

	componentDidMount() {
		StatusBar.setBarStyle(1);
	}

	render() {
		return(
			<View style={styles.container}>
				<UserInfo username="Wei" uid={this.props.uid}/>
        <List navigator={this.props.navigator}/>
        <Modal
          animated={true}
          transparent={false}
          visible={this.state.showModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalNav}>
              <TouchableHighlight underlayColor="#fff" onPress={() => this._closeModal()}><Text style={[styles.btnText,{width:80,textAlign:"left"}]}>Cancle</Text></TouchableHighlight>
              <Text style={styles.navTitle}>{this.state.modalTitle}</Text>
              <TouchableHighlight underlayColor="#fff" onPress={() => this._setTime()}><Text style={[styles.btnText,,{width:80,textAlign:"right"}]}>Continue</Text></TouchableHighlight>
            </View>
            <ScrollView style={styles.modalContent}>
              <View style={styles.module}>
                <Text style={styles.moduleText}>Module 1</Text>
                <MKCheckbox style={styles.checkBox} checked={true}/>
              </View>
              <View style={styles.module}>
                <Text style={styles.moduleText}>Module 2</Text>
                <MKCheckbox style={styles.checkBox} checked={true}/>
              </View>
              <View style={styles.module}>
                <Text style={styles.moduleText}>Module 3</Text>
                <MKCheckbox style={styles.checkBox} checked={true}/>
              </View>
              <View style={styles.module}>
                <Text style={styles.moduleText}>Module 4</Text>
                <MKCheckbox style={styles.checkBox} checked={true}/>
              </View>
              <View style={styles.module}>
                <Text style={styles.moduleText}>Module 5</Text>
                <MKCheckbox style={styles.checkBox} checked={true}/>
              </View>
            </ScrollView>
          </View>
        </Modal>
				<View style={styles.col,styles.addBtn}>
					<MKButton
					  backgroundColor={MKColor.LightGreen}
					  shadowRadius={2}
					  shadowOffset={{width:0, height:2}}
					  shadowOpacity={.7}
					  shadowColor="black"
					  style={styles.action}
					  onPress={() => {
					    AlertIOS.prompt(
                'Add Task',
                'Please enter the name for your task.',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: (title) => {
                    this.setState({showModal:true,modalTitle:title})
                  }},
                ],
                'plain-text',
                'New task'
              );
					  }}
					  >
					  <Icon style={styles.actionIcon} name="add" size={30} color="#fff"/>
					</MKButton>
				</View>
			</View>
		)
	}
}

export default class extends Component{
  render() {
    return(
      <NavigatorIOS
        ref='nav'
        style={styles.container}
        initialRoute={{
          title:'main',
          component: MainView,
          navigationBarHidden: true,
          backButtonTitle: 'back',
          shadowHidden: true,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: Util.size.width,
    height: Util.size.height,
  },
  card:{
  	width:Util.size.width,
  	alignItems: 'stretch',
  	height:150,
    padding:0,
  },
  icon:{
    height:50,
    width:50,
    borderRadius:25,
    marginTop: 20,
    marginBottom:10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    position:'absolute',
    left:15,
    top:15,
  },
  iconText:{
    fontSize:30,
    color:'#fff',
    backgroundColor:'transparent',
  },
  usernameContainer:{
  	position:'absolute',
    left:80,
    top:60,
    backgroundColor:'transparent',
    flexDirection:'row',
  },
  username:{
    fontSize:16,
    fontWeight:'500',
  },
  email:{
  	fontSize:12,
  	fontWeight:'400',
  	paddingLeft:10,
  	paddingTop:4,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 7, marginRight: 7,
  },
  addBtn:{
  	position:'absolute',
  	right:25,
  	bottom:25,
  },
  action:{
  	width:50,
  	height:50,
  	borderRadius:25,
  	alignItems:'center',
    justifyContent:'center',
  },
  actionIcon:{
  	backgroundColor:'transparent',
  },
  listContainer:{
    width: Util.size.width,
    height: Util.size.height - 150,
    backgroundColor:'#e9e9e9',
  },
  list:{
    paddingLeft:10,
    paddingTop:0,
    paddingBottom:70,
  },
  btnText:{
    color:"#f5f5f5",
    fontSize:16,
    paddingTop:10,
  },
  modalContainer:{
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor:"#f1f1f1"
  },
  modalNav:{
    position:"absolute",
    height:60,
    width:Util.size.width,
    backgroundColor:MKColor.LightGreen,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingTop:20,
    paddingLeft:15,
    paddingRight:15
  },
  modalContent:{
    width:Util.size.width,
    height:Util.size.height-60,
    marginTop:60
  },
  navTitle:{
    paddingTop:8,
    fontWeight:"500",
    color:"#fff",
    fontSize:18
  },
  module:{
    padding: 15,
    paddingLeft:25,
    height:50,
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ddd',
    flexDirection:'row',
  },
  moduleText:{
    color: '#222',
    fontWeight: '500',
    fontSize:16,
    width: Util.size.width - 100,
  },
  checkBox:{
    position:'absolute',
    top:0,
    right:0,
  }
})