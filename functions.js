const renderDropDown = countries => {
  for (const country of countries) {
    const option = document.createElement('option');
    option.value = country.alpha2Code;
    option.text = `${country.name}`;
    dropdown.add(option);
  }
};

const confirmed = document.querySelector('#positive-value');
const recovered = document.querySelector('#recovered-value');
const death = document.querySelector('#death-value');

const recoveredPercentage = document.querySelector('#recovered-percentage');
const deathPercentage = document.querySelector('#death-percentage');

const renderData = data => {
  confirmed.textContent = data.confirmed.value;
  recovered.textContent = data.recovered.value;
  death.textContent = data.deaths.value;

  recoveredPercentage.textContent = `${Math.round(
    (data.recovered.value * 100) / data.confirmed.value
  )}%`;

  deathPercentage.textContent = `${Math.round(
    (data.deaths.value * 100) / data.confirmed.value
  )}%`;
};

const renderIndo = data => {
  confirmed.textContent = data.jumlahKasus;
  recovered.textContent = data.sembuh;
  death.textContent = data.meninggal;

  recoveredPercentage.textContent = `${Math.round(
    (data.sembuh * 100) / data.jumlahKasus
  )}%`;

  deathPercentage.textContent = `${Math.round(
    (data.meninggal * 100) / data.jumlahKasus
  )}%`;
};

const renderLoader = (status, confirmed, recovered, death) => {
  if (status === 'succes') {
    confirmed.innerHTML =
      '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
    recovered.innerHTML =
      '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
    death.innerHTML =
      '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
    recoveredPercentage.textContent = '-';
    deathPercentage.textContent = '-';
  } else {
    confirmed.textContent = 'Data tidak ada';
    recovered.textContent = 'Data tidak ada';
    death.textContent = 'Data tidak ada';

    recoveredPercentage.textContent = '-';
    deathPercentage.textContent = '-';
  }
};

const getDate = () => {
  const dateList = [];
  let dateStart = dayjs().subtract(7, 'd');
  let dateEnd = dayjs();
  while (dateStart.diff(dateEnd, 'd') < 0) {
    dateList.push(
      `${dateStart.format('M')}-${dateStart.format('D')}-${dateStart.format(
        'YYYY'
      )}`
    );
    dateStart = dateStart.add(1, 'd');
  }
  return dateList;
};

getChartData = async (countryName, date) => {
  try {
    const response = await axios.get(
      `https://covid19.mathdro.id/api/daily/${date}`
    );
    renderChart(response, countryName, date);
  } catch (error) {
    console.log(error);
  }
};

const renderChart = (data, countryName, date) => {
  let datas = data.data;

  const filteredCountry = datas.filter(data => {
    return data.countryRegion === countryName;
  });
  let dateItem = [];
  let confirmed = [];
  let recovered = [];
  let deaths = [];
  for (const data of filteredCountry) {
    dateItem.push(dayjs(data.lastUpdate).format('D/M/YY'));
    confirmed.push(data.confirmed);
    recovered.push(data.recovered);
    deaths.push(data.deaths);
  }

  chart.data.labels.push(dateItem);
  chart.data.datasets[0].data.push(parseInt(confirmed));
  chart.data.datasets[1].data.push(parseInt(deaths));
  chart.data.datasets[2].data.push(parseInt(recovered));
  chart.update();
};

async function doChart() {
  const dateList = getDate();

  for (const date of dateList) {
    const chartData = await getChartData('Indonesia', date);
  }
}
doChart();

const getLastUpdate = async () => {
  const response = await axios.get('https://covid19.mathdro.id/api/');
  const lastUpdate = document.querySelector('.last-update');
  lastUpdate.textContent = `Data per ${dayjs(response.data.lastUpdate).format(
    'DD MMM YYYY H:mm:ss'
  )}`;
};

getLastUpdate();
