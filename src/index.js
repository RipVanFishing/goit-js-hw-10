import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    cardMarkup: document.querySelector('.country-list')
}

refs.input.addEventListener('input', onSearchInput)

function onSearchInput() {

}

fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages').then(response => {
    return response.json()
}).then(data => console.log(data));