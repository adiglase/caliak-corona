const getCountries = async () => {
  return await axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      const countries = response.data;

      renderDropDown(countries);
    });
};

getCountries();

const getData = async countryCode => {
  let dataApi;
  if (!countryCode || countryCode === 'worldwide') {
    dataApi = axios.get(`https://covid19.mathdro.id/api/`);
  } else if (countryCode === 'ID') {
    dataApi = axios.get('https://indonesia-covid-19.mathdro.id/api');
  } else {
    dataApi = axios.get(
      `https://covid19.mathdro.id/api/countries/${countryCode}`
    );
  }

  return await dataApi
    .then(response => {
      const data = response.data;
      if (countryCode === 'ID') {
        renderIndo(data);
      } else {
        renderData(data);
      }
    })
    .catch(error => {
      renderLoader('error', confirmed, recovered, death);
    });
};

getData();

const dropdown = document.querySelector('#dropdown');

dropdown.addEventListener('change', e => {
  renderLoader('succes', confirmed, recovered, death);
  getData(e.target.value);
});
