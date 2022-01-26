const URL = 'https://restcountries.com/v3.1';

function fetchCountry(name) {
  return fetch(`${URL}/name/${name}?fields=name,capital,population,flags,languages`).then(
    respose => respose.json(),
  );
}

export default { fetchCountry };


