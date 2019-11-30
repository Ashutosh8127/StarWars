import React,{ Component } from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';
import StarWarBackGround from '../Helper/StarWarBackGround';
import OrionNebula from '../../images/orion-nebula-11001_640.jpg'
import Loader from '../Helper/Loader';
import styled from 'styled-components';

export default class SearchScreen extends Component {
  static navigationOption = {
    header: null
  }
  renderSearchScreenView() {
    <MainContainer>
      <SearchContainer>
        <SearchInput>
        </SearchInput>
      </SearchContainer>
    </MainContainer>
  }
  render() {
    return(
      <React.Fragment>
        <StarWarBackGround
          imagename={OrionNebula}
          content={this.renderSearchScreenView()}
        />
      </React.Fragment>
    )
  }
}

const MainContainer = styled.View`
  flex: 1;
`
const SearchContainer = styled.View`
  flex-direction: row;
  justify-content: center,
  align-items: center,
  background-color: #fff,
`
const SearchInput = styled.TextInput`
  padding-top: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-left: 0;
  background-color: #fff;
  color: #424242;
`