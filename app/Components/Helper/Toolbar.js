import React,{Component} from 'react'; 
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import styled from 'styled-components';

const ToolBar = (props) => {
  const Navbar = styled.View`
    height: 50;
    background-color: ${props.backgroundColor};
  `
  const Container = styled.View`
    flex: 1;
    flex-direction: row;
  `
  const HeadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-self: center;
  `
  const HeadingText = styled.Text`
    font-size: 18;
    color: #fff;
    text-align: center;
  `
  const LogoutContainer = styled.TouchableOpacity`
    position: absolute;
    right: 10;
    top: 14;
  `
  const LogoutTextContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-self: center;
  `

  const LogoutText = styled.Text`
    text-align: center;
    font-size: 16;
    color: #fff;
    font-weight: bold;
  `
  
  return (
    <Navbar>
      <Container>
      <HeadingContainer>
        <HeadingText>{props.headingText}</HeadingText>
      </HeadingContainer>
      {
        props.isLogout ?
        <LogoutContainer onPress={props.logoutUser}>
          <LogoutTextContainer>
            <LogoutText>Logout</LogoutText>
          </LogoutTextContainer>
        </LogoutContainer>
      : null
      }
      </Container>
    </Navbar>
  )
    
}



export default ToolBar;