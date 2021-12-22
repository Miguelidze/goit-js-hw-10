async function fetchCountries(name) {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name.trim()}?fields=languages,flags,population,capital,name`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  ;
  return await response.json();
}

export {
  fetchCountries
};