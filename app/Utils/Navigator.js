import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from '../Components/Screen/SplashScreen';
import LoginScreen from '../Components/Screen/LoginScreen';
import SearchScreen from '../Components/Screen/SearchScreen';

const LoginStack = createStackNavigator({
    LoginScreen: { screen : LoginScreen }
})

const SearchStack = createStackNavigator({
    SearchScreen: { screen: SearchScreen }
})
export default createAppContainer(
    createSwitchNavigator({
        AuthLoading: Splash,
        Auth: LoginStack,
        App: SearchStack,
    },
    {
        initialRouteName: 'AuthLoading',
    })
)