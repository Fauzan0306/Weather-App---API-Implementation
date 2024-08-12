const apiKey = '051bdcf94175460aa0040151231005';

const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const weatherContainer = document.querySelector('#weather-container');
const forecastContainer = document.querySelector('#forecast-container');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;
  searchWeather(searchTerm);
});

function searchWeather(searchTerm) {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchTerm}&days=3`)
    .then(response => response.json())  
    .then(data => {
        const location = data.location;
        const current = data.current;
        const forecast = data.forecast;
        const weatherCard = `
          <div class="weather-card">
            <h2>${location.name}, ${location.region}</h2>
            <img src="${current.condition.icon}">
            <p>${current.temp_c}°C / ${current.temp_f}°F</p>
            <p>${current.condition.text}</p>
          </div>
        `;
        weatherContainer.innerHTML = weatherCard;

        const forecastCards = forecast.forecastday.map(day => `  
          <div class="forecast-card">
            <h2>${day.date}</h2>
            <img src="${day.day.condition.icon}">
            <p>${day.day.maxtemp_c}°C / ${day.day.maxtemp_f}°F</p>
            <p>${day.day.mintemp_c}°C / ${day.day.mintemp_f}°F</p>
            <p>${day.day.condition.text}</p>
          </div>
        `).join('');
        
        forecastContainer.innerHTML = forecastCards;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

    var map = L.map('map').setView([-2.5489, 118.0149], 5);

    // Tambahkan layer tile peta OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(map);

    
    // Daftar wilayah yang ingin ditampilkan
    var locations = [
      { name: 'Banda Aceh', lat: 5.5483, lon: 95.3237 },
      { name: 'Medan', lat: 3.5952, lon: 98.6722 },
      { name: 'Padang', lat: -0.9516, lon: 100.3542 },
      { name: 'Palembang', lat: -2.9909, lon: 104.7568 },
      { name: 'Bengkulu', lat: -3.8004, lon: 102.2560 },
      { name: 'Bandar Lampung', lat: -5.4254, lon: 105.2553 },
      { name: 'Pangkal Pinang', lat: -2.1291, lon: 106.1093 },
      { name: 'Jakarta', lat: -6.2088, lon: 106.8456 },
      { name: 'Bandung', lat: -6.9175, lon: 107.6191 },
      { name: 'Semarang', lat: -6.9667, lon: 110.4167 },
      { name: 'Yogyakarta', lat: -7.7971, lon: 110.3686 },
      { name: 'Surabaya', lat: -7.2575, lon: 112.7521 },
      { name: 'Denpasar', lat: -8.6705, lon: 115.2126 },
      { name: 'Mataram', lat: -8.5833, lon: 116.1167 },
      { name: 'Kupang', lat: -10.1765, lon: 123.5770 },
      { name: 'Pontianak', lat: -0.0264, lon: 109.3425 },
      { name: 'Palangkaraya', lat: -2.2086, lon: 113.9213 },
      { name: 'Samarinda', lat: -0.5024, lon: 117.1534 },
      { name: 'Banjarmasin', lat: -3.3194, lon: 114.5901 },
      { name: 'Manado', lat: 1.4916, lon: 124.8451 },
      { name: 'Gorontalo', lat: 0.5440, lon: 123.0568 },
      { name: 'Makassar', lat: -5.1477, lon: 119.4327 },
      { name: 'Palu', lat: -0.8917, lon: 119.8707 },
      { name: 'Kendari', lat: -3.9879, lon: 122.5136 },
      { name: 'Manokwari', lat: -0.8613, lon: 134.0620 },
      { name: 'Jayapura', lat: -2.5489, lon: 140.7185 }
    ];
    
    // Ambil data cuaca untuk setiap wilayah
    locations.forEach(function(location) {
      fetch('https://api.weatherapi.com/v1/current.json?key=051bdcf94175460aa0040151231005&q=' + location.lat + ',' + location.lon)
        .then(response => response.json())
        .then(data => {
          var peta = L.marker([data.location.lat, data.location.lon]).addTo(map);
          peta.bindPopup( location.name + ' ' + data.current.temp_c + '°C');
        })
        .catch(error => {
          console.log('Error:', error);
        });
    });
    

  function ubahTeks() {
    document.getElementById("demo").innerHTML = "Kondisi Cuaca Hari Ini";
    document.getElementById("demo1").innerHTML = "Perkiraan Kondisi Cuaca 3 Hari Kedapan";
  }