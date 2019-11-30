import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import StarWarBackGround from '../Helper/StarWarBackGround';
import Starwar from '../../images/Star.jpg'
import Loader from '../Helper/Loader';
import styled from 'styled-components';


export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }
  submitLogin = () => {
    this.props.navigation.navigate('SearchScreen')
  }
  renderLoginScrennView() {
    return(
      <View style={{flex:1, justifyContent: 'center', justifyContent: 'center'}}>
        <UserNameInput placeholder="Enter Username"/>
        <Seprator />
        <UserNameInput placeholder="Enter password"/>
        <LoginButton onPress={this.submitLogin}> 
          <LoginButtonView>
            <LoginText>Sign In</LoginText>
          </LoginButtonView>
        </LoginButton>
        <Loader isLoading={true} color={'blue'}/>
      </View>
    )
  }
  render() {
    return(
      <React.Fragment>
        <StarWarBackGround 
        imagename={Starwar}
        content={this.renderLoginScrennView()}
        >
          
        </StarWarBackGround>
      </React.Fragment>
    )
  }
  }

  const UserNameInput = styled.TextInput`
    margin-left: 25;
    margin-right: 25;
    background-color: #ffffff;
    height: 50;
    border-radius: 5;
  `
  const Seprator = styled.View`
    margin-left: 30;
    margin-right: 30;
    margin-top: 15;
    margin-bottom: 15;
    height: 0.5;
    background-color: #ffffff;
  `

  const LoginButton = styled.TouchableOpacity`
    margin-left: 30;
    margin-right: 30;
    margin-top: 15;
    height: 50;
    border-radius: 15;
  `

  const LoginButtonView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center
  `

  const LoginText = styled.Text`
    text-align: center;
    font-size: 18;
    font-weight: bold;
    color: #ffffff
  `