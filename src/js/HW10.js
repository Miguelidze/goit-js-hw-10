
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import {
  fetchCountries
} from './fetchCountries';

import listCountriesHbs from '../handleBars/listCountries.hbs';
import oneCountryHbs from '../handleBars/oneCountry.hbs';
import {
  DEBOUNCE_DELAY
} from '../index.js'
//Initilize
const refs = {
  searchBox: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
}
// Processing
// More than 10 elements
const moreThenTen = () => {
    clearList();
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}
// Less /igualar than 10 elements
const lessThenTen = arrayCountry => {
  clearList();
  refs.countryInfo.insertAdjacentHTML('beforeend', listCountriesHbs(arrayCountry));
}
// One element
const oneCountry = arrayCountry => {
  clearList();
  arrayCountry[0].languages = Object.values(arrayCountry[0].languages).join(', ');
  refs.countryInfo.insertAdjacentHTML('beforeend', oneCountryHbs(arrayCountry));
}
// Cleaning
const clearList = () => {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
// Сreate results
const createListCountry = function (arrayCountry) {
  // More than 10
  if (arrayCountry.length > 10) {
    moreThenTen();
    return
  };
  // One result
  if (arrayCountry.length === 1) {
    oneCountry(arrayCountry);
    return;
  };
  // More than 1
  lessThenTen(arrayCountry);
};

const errorCountryName = error => {

  clearList();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

// Pdocessing
const onInputField = (e) => {
  if (e.target.value.trim() !== "") {
    fetchCountries(e.target.value)
      .then(createListCountry)
      .catch(errorCountryName);
  }
};
// Listener
refs.searchBox.addEventListener('input', debounce(onInputField, DEBOUNCE_DELAY));