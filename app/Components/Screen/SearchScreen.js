import React,{ Component } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import StarWarBackGround from '../Helper/StarWarBackGround';
import OrionNebula from '../../images/orion-nebula-11001_640.jpg'
import Loader from '../Helper/Loader';
import ToolBar from '../Helper/Toolbar';
import MyStatusBar from '../Helper/Toolbar';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { api } from '../../Utils/api';
import AsyncStorage from '@react-native-community/async-storage';

export default class SearchScreen extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      search: {
        isSearchBarEnabled: true,
        searchesPerMinute: 0
      },
      data: {
        planets: []
      },
      maxPopulation: 0,
      minPopulation: 0
    };
  }
  
  async componentDidMount() {
    let user = await AsyncStorage.getItem('username');
    alert(`welcome ${user}`)
    this.interval = setInterval(() => {
      const isSearchBarEnabled = this.state.search.isSearchBarEnabled;
      this.searchBarStatus(true, () => {
        if (!isSearchBarEnabled) {
          const message = 'You can make 15 consecutive searches in a minute.';
          alert(message);
        }
      });
    }, 60000)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  searchStarWarPlanet = async (StarSearchText) => {
    if (StarSearchText !== '') {
      let username = await AsyncStorage.getItem('username');
      if (JSON.parse(username.toLowerCase()) !== ('Luke Skywalker').toLowerCase()) {
        this.searchBarStatus(false, () => {
          if (this.state.search.isSearchBarEnabled===false) {
            const message = 'You have made 15 searches in less than a minute';
            alert(message);
            this.logoutUser();
          }
        });
      }
      this.setState({ isLoading: true })
      api.serarchStarWar(StarSearchText)
      .then(res => {
        this.updatePlanetsDetail(res, true)
        this.setState({isLoading: false})
      })
    }
  }
  
  updatePlanetsDetail(data, isWrite) {
    this.setState(prevState => {
      const url = data.next;
      const planets = data.results;
      const planetsPopulation = this.getPopulationOfPlanet(planets);
      return {
        data: {
          planets: planets
        },
        maxPopulation: planetsPopulation && planetsPopulation.length != 0 ? Math.max(...planetsPopulation) : 0,
        minPopulation: planetsPopulation && planetsPopulation.length != 0 ? Math.min(...planetsPopulation) : 0
      }
    })
  }
  getPopulationOfPlanet = (planets) => {
    let planet = planets && planets.map(no => no.population).filter((populatin) => populatin !== 'unknown').map((intPopulation) => parseInt(intPopulation));
    return planet;
  }
  searchBarStatus = (isWrite, callback) => {
    this.setState(prevState => {
      return {
        search: {
          isSearchBarEnabled: isWrite === false && prevState.search.searchesPerMinute + 1 === 15 ? false : true,
          searchesPerMinute: isWrite === false ? prevState.search.searchesPerMinute + 1 : 0
        }
      }
    }, () => callback())
  }
  planetFontSize = (population) => {
    const { maxPopulation, minPopulation } = this.state;
    const minFontSize = 14;
    const maxFontSize = 30;
    let fontSize = minFontSize;
    if(population !== 'unknown') {
      const numerator = (parseInt(population) - parseInt(this.state.minPopulation)) * (maxFontSize - minFontSize);
      const denominator = parseInt(this.state.maxPopulation) - parseInt(this.state.minPopulation);
      fontSize = Math.round(minFontSize + numerator / denominator);
    }
    return isNaN(fontSize) ? 16 : fontSize;
  }
  openPlanetsDetails(item) {
    alert(`Planet Name : ${item.name}`)
  }
  renderSearchedList({item}) {
    return(
      <SearchCard onPress={() => this.openPlanetsDetails(item)}>
        <CardView>
          <Text style={{fontSize: this.planetFontSize(item.population)}}>{item.name}</Text>
        </CardView>
      </SearchCard>
    )
  }
  searchedPlanetList() {
    const {isLoading, data} = this.state;
    return (
      <React.Fragment>
      {
        isLoading ?
        <Loader isLoading={true} color={'green'} />
        :
        <FlatList
          data={data.planets}
          renderItem={(item) => this.renderSearchedList(item)}
          keyExtractor={(item) => item.name}
        />
      }
      </React.Fragment>
    )
  }
  logoutUser() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
  renderSearchScreenView() {
    const isSearchBarEnabled = this.state.search.isSearchBarEnabled;
    const myIcon = (<Ionicons style={{ padding: 10 }} name="ios-search" size={20} color="#000000"/>)
    return(
      <MainContainer>
        <MyStatusBar backgroundColor={'#8d8d8d'} />
        <ToolBar backgroundColor={'gray'} headingText={'Search'} isLogout={true} logoutUser={this.logoutUser.bind(this)}/>
        <SearchContainer>
          {myIcon}
          <SearchInput
          placeholder="Search Planets"
          placeholderTextColor='gray'
          onChangeText={(text) => this.searchStarWarPlanet(text)}
          autoCapitalize='none'
          autoCorrect={false}
          editable={isSearchBarEnabled}
          >
          </SearchInput>
        </SearchContainer>
        <View style={{marginTop: 10, marginBottom: 20}}>
          {this.searchedPlanetList()}
        </View>
      </MainContainer>
    )
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
  margin-top: 20;
  margin-right: 10;
  margin-left: 10;
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  border-radius: 10;
`
const SearchInput = styled.TextInput`
  width: 200;
  color: #000000;
  margin-right: 10;
  align-self: stretch;
`

const SearchCard = styled.TouchableOpacity`
  background-color: #fff;
  margin-top: 20;
  margin-right: 10;
  margin-left: 10;
  align-items: center;
  border-radius: 10;
`
const CardView = styled.View`
  justify-content: space-around;
  padding-top: 10;
  padding-bottom: 10;
`