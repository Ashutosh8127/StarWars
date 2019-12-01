
const domain = "https://swapi.co/api/";


export const api = {
  authUser(username) {
    return fetch(`${domain}people/?search=${username}`).then(response => {
      return response.json();
    }).then(res => {
      return res;
    }).catch(error => {
      return error;
    })
  },
  serarchStarWar(planet) {
    return fetch(`${domain}planets/?search=${planet}`).then(response => {
      return response.json();
    }).then(responseJson => {
      return responseJson
    }).catch(error => 
      console.log('Error fetching data:', error)
    );
  }
}