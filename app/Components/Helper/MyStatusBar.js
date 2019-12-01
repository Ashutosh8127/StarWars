import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import styled from 'styled-components';

const MyStatusBar = (props) => {
  const Container = styled.View`
    height: ${STATUSBAR_HEIGHT};
    backgroundColor: ${props.backgroundColor}
  `
  return (
    <Container>
      <StatusBar translucent backgroundColor={props.backgroundColor} barStyle="light-content"/>
    </Container>
  )
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 10 : StatusBar.currentHeight;

MyStatusBar.defaultProps = {
  backgroundColor: "#d3d3d3",
}
export default MyStatusBar;