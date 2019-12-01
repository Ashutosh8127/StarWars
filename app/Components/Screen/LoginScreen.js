import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Platform
} from 'react-native';
import StarWarBackGround from '../Helper/StarWarBackGround';
import Starwar from '../../images/orion-nebula-11107_640.jpg'
import Loader from '../Helper/Loader';
import ToolBar from '../Helper/Toolbar';
import Error from '../Helper/Error';
import MyStatusBar from '../Helper/Toolbar';
import styled from 'styled-components';
import { api } from '../../Utils/api';
import AsyncStorage from '@react-native-community/async-storage';


export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      username: '',
      password: '',
      error: ''
    }
  }
  storeData = async (heroname, isAuthenticated) => {
    if(isAuthenticated) {
      await AsyncStorage.setItem('isAuthenticated', isAuthenticated.toString());
      await AsyncStorage.setItem('username', JSON.stringify(heroname));
      this.props.navigation.navigate('App');
      this.setState({
        username: '',
        password: '',
        isLoading: false
      });
    } else {
      this.setState({
        username: '',
        password: '',
        isLoading: false,
        error: 'Please enter your username & password'
      });
    }
  }
  submitLogin = () => {
    let { username, password } = this.state;
    var isAuthenticated = false;
    Keyboard.dismiss();
    this.setState({
      isLoading: true,
      error: ''
    });
    if (username.trim() && password.trim()) {
      api.authUser(username)
      .then((authData) => {
        let heroname = authData.results[0].name;
        let bornYear = authData.results[0].birth_year;
        isAuthenticated = username.toLowerCase() === heroname.toLowerCase() && password === bornYear;
        this.storeData(heroname, isAuthenticated)
      })
      .catch((e) => {
        this.setState({
          isLoading: false,
          error: e
        });
      });
    } else {
      this.setState({
        isLoading: false,
        error: 'Please enter your username & password'
      });
    }
  }
  renderLoginScrennView() {
    return(
      <React.Fragment>
      {Platform.OS==='ios'? <MyStatusBar backgroundColor={'#3f0070'} /> : null}  
      <ToolBar backgroundColor={'#370061'} headingText={'Welcome To Star War'} isLogout={false}/>
      <View style={{flex:1, justifyContent: 'center', justifyContent: 'center'}}>
        <UserNameInput 
        placeholder="Enter Username"
        value={this.state.username}
        placeholder='Username'
        placeholderTextColor='gray'
        onChangeText={(text) => this.setState({ username: text })}
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='next'
        keyboardAppearance='light'
        enablesReturnKeyAutomatically={true}
        />
        <Seprator />
        <UserNameInput 
        value={this.state.password}
        placeholder='Password'
        placeholderTextColor='gray'
        onChangeText={(text) => this.setState({ password: text })}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
        returnKeyType='go'
        keyboardAppearance='light'
        enablesReturnKeyAutomatically={true}
        blurOnSubmit={true}
        onSubmitEditing={this.handleSubmit}
        />
        <LoginButton onPress={this.submitLogin}> 
          <LoginButtonView>
            <LoginText>Sign In</LoginText>
          </LoginButtonView>
        </LoginButton>
        <Loader isLoading={this.state.isLoading} color={'blue'}/>
        {this.state.error ? <Error error={this.state.error} /> : null}
      </View>
      </React.Fragment>
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
    background-color: #370061;
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