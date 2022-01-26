import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import allCardTemplate from './templates/all-card-template.hbs';
import cardTemplate from './templates/card-template.hbs';
import API from './API/fetch-country';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    allCardTemplate: document.querySelector('.country-list'),
    cardTemplate: document.querySelector('.country-info')
}



refs.input.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY))

function onSearchInput(e) {
    const searchQuery = e.target.value.trim();
    
    clearSearch();
    if (searchQuery === '') {
        return;
    }


    API.fetchCountry(searchQuery).then(renderMarkupCard).catch(error => {
        console.log(error);
    })
}

function renderMarkupCard(country) {
    if (country.status === 404) {
        return Notify.failure(`Oops, there is no country with that name`);
    } else if (country.length === 1) {
        country.map(({ name, flags, capital, population, languages }) => {
            refs.allCardTemplate.innerHTML = '';
            refs.cardTemplate.insertAdjacentHTML('beforeend', cardTemplate({ name, flags, capital, population, languages }));
        });
    } else if (country.length <= 10) {
        country.map(({ name, flags, capital, population, languages }) => {
            refs.cardTemplate.innerHTML = '';
            refs.allCardTemplate.insertAdjacentHTML('beforeend', allCardTemplate({ name, flags, capital, population, languages }),
            );
        });
    } else if (country.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
    }
}


function clearSearch() {
    refs.allCardTemplate.innerHTML = '';
    refs.cardTemplate.innerHTML = '';
}