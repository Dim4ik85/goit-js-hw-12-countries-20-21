import './styles.css';

import countryCardTpl from './templates/country.hbs';
import countryCardList from './templates/country-list.hbs';

import API from './js/api-service.js';

import getRefs from './js/get-refs.js';

import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
const { error, success } = require('@pnotify/core');

const debounce = require('lodash.debounce');

const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, 500));

function renderCountryCards(country) {
    const markup = countryCardTpl(country);
    console.log(markup);
    refs.description.innerHTML = markup;
}

function renderCountryCardsList(country) {
    const markup = countryCardList(country);
    console.log(markup);
    refs.description.innerHTML = markup;
}
 

function onSearch(e){
    //e.preventDefault();

    const searchQuery = e.target.value.trim();
        if(searchQuery.length === 0)
             return cleanMarkup();
    console.log(searchQuery);

    API.fetchCountryByName(searchQuery)
        .then(evt => {
            if (evt.length >= 2 && evt.length <= 10) { 
                renderCountryCardsList(evt);
                }
                else if (evt.length === 1){
                    renderCountryCards(evt);
                    success ({
                        title: 'Success!',
                        text: 'That thing that you were trying to do worked.'
                        });
                    }
                    else  {
                            error({
                                    title: 'Oh No!',  
                                    text: 'Too many matches found. Please enter a more specific query!',
                                });
                         }
         })
         .catch(onFetchError)
         
}

function cleanMarkup() {
    refs.description.innerHTML = '';  
}

function onFetchError(error) {
    alert('Упс, что-то пошло не так и мы не нашли вашего покемона!');
  }
