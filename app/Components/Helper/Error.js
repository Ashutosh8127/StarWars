import React,{Component} from 'react';
import {
    View,
    Text
} from 'react-native';
import styled from 'styled-components';

const Error = (props) => {
  const ErrorContainer = styled.View`
  justify-content: center;
  align-items: center;
  `
  const ErrorText = styled.Text`
    font-size: 15;
    font-weight: bold;
    color: red;
  `
  return(
    <ErrorContainer>
      <ErrorText>{props.error}</ErrorText>
    </ErrorContainer>
  )
}

export default Error;