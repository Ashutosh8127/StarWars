import React, { Component } from 'react';
import {
    View,
    StatusBar,
} from 'react-native';
import StarWarBackGround from '../Helper/StarWarBackGround';
import Starwar from '../../images/Star.jpg'
import Loader from '../Helper/Loader';
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {
  componentDidMount() {
    this.check();
  }

  check = async () => {
    const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
    setTimeout(() => {
      this.props.navigation.navigate(isAuthenticated ? 'App' : 'Auth');
    }, 2000)
  };
  renderSplashScrennView() {
    return(
      <View style={{flex:1, justifyContent: 'center', justifyContent: 'center'}}>
        <Loader isLoading={true} color={'red'}/>
      </View>
    )
  }
  render() {
    return(
      <React.Fragment>
        <StatusBar backgroundColor="#20222A" barStyle="light-content" />
        <StarWarBackGround 
        imagename={Starwar}
        content={this.renderSplashScrennView()}
        >
          
        </StarWarBackGround>
      </React.Fragment>
    )
  }
}