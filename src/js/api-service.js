

const BASE_URL = 'https://restcountries.eu/rest/v2/name';

function  fetchCountryByName(searchQuery) {
    const url = `${BASE_URL}/${searchQuery}`;
    
    return fetch(url)
        .then(response => {
            return response.json();
            },
        );
       
} 
//console.log(fetchCountryByName(searchQuery)); 
export default {fetchCountryByName}
