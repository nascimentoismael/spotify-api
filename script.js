const APIController = (() => {

  const clientId = '53ad034b5b774c1c855590c28570f1ce';
  const clientSecret = 'fee6147c8c5847888060db527a978ea8';

  const _getToken = async () => {

      const result = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
              'Content-Type' : 'application/x-www-form-urlencoded',
              'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
          },
          body: 'grant_type=client_credentials'
      });

      const data = await result.json();
      return data.access_token;
  }

  const _getGenres = async (token) => {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=pt_US`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data.categories.items;
  }


  return {
      getToken() {
          return _getToken();
      },
      getGenres(token) {
        return _getGenres(token);
    }
  }
})();


const showToken = async () => {
  const token = await APIController.getToken();
  console.log(token);
}

const loadGenres = async () => {
  //pegando o token
  const token = await APIController.getToken();
  //pegando os generos
  const genres = await APIController.getGenres(token);
  console.log(genres);
}


