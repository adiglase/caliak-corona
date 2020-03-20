let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: [],
    datasets: [
      {
        label: 'Positif',
        fill: false,
        borderColor: '#f7b84b',
        data: [],
        borderWidth: 2,
        pointBorderWidth: 5,
        pointStyle: 'rectRot',
        radius: 3
      },
      {
        label: 'Meninggal',
        fill: false,
        borderColor: '#f1515d',
        data: [],
        borderWidth: 2,
        pointBorderWidth: 5,
        pointStyle: 'rectRot',
        radius: 3
      },
      {
        label: 'Sembuh',
        fill: false,
        borderColor: '#00b19d',
        data: [],
        borderWidth: 2,
        pointBorderWidth: 5,
        pointStyle: 'rectRot',
        radius: 3
      }
    ]
  },

  // Configuration options go here
  options: {
    title: {
      display: true,
      text: 'Perkembangan Kasus Di Indonesia',
      fontSize: 16
    },
    elements: {
      line: {
        tension: 0
      }
    },
    responsiveAnimationDuration: 1000,
    aspectRatio: 1,
    maintainAspectRatio: false
  }
});
Chart.defaults.global.defaultFontColor = '#ced4da';
