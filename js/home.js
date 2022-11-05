let app = document.getElementById('app');
let temp = document.querySelector('.temp');
let cityName = document.querySelector('.name');
let search = document.getElementById('search');
let input = '';
let find = document.getElementById('find');
let helpText = document.getElementById('helpText');
let conditionImg = document.getElementById('conditionImg');
let conditionText = document.getElementById('conditionText');
let windSpeed = document.getElementById('windSpeed');
let windeg = document.getElementById('windeg');
let winDir = document.getElementById('winDir');
let time = document.getElementById('time');
let citiyeslist = document.getElementById('citiyeslist');

const citiyeslistName = x => {
  input = x;
  getData();
};

const getSearch = async () => {
  if (search.value === '') {
    helpText.hidden = false;
    helpText.innerText = 'please Enter city name';
  } else {
    helpText.hidden = true;
    input = search.value;
    search.value = '';
    citiyeslist.innerHTML = '';

    await fetch(
      `https://api.weatherapi.com/v1/search.json?key=7f6f7f23bb6840e0ac1220902220511&q=${
        input ? input : 'egypt'
      }`
    )
      .then(res => res.json())
      .then(res =>
        res.map(x => {
          let listNameCitye = document.createElement('li');
          listNameCitye.innerText = x.name;
          listNameCitye.addEventListener('click', function () {
            citiyeslistName(x.name);
          });
          citiyeslist.appendChild(listNameCitye);
        })
      );

    getData();
  }
};
find.addEventListener('click', getSearch);

const getData = async () => {
  await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=7f6f7f23bb6840e0ac1220902220511&q=${
      input ? input : 'alex'
    } &days=3&aqi=no&alerts=no`
  )
    .then(res => res.json())
    .then(res => {
      cityName.innerHTML = res.location.name;
      temp.innerHTML = `${res.current.temp_c} &#176; - ${res.forecast.forecastday[0].day.mintemp_c} &#176`;
      conditionText.innerText = res.current.condition.text;
      conditionImg.src = res.current.condition.icon;
      windSpeed.innerText = res.current.wind_mph;
      windeg.innerText = res.current.wind_degree;
      winDir.innerText = res.current.wind_dir;
      time.innerText = res.location.localtime;
      if (res.current.condition.text === 'Partly cloudy') {
        app.style.backgroundImage = 'url(/img/cloudy.gif)';
        app.style.color = '#ccc';
      }
      if (res.current.condition.text === 'Sunny') {
        app.style.backgroundImage = 'url(/img/mornig.avif)';
        app.style.color = '#000';
      }
      if (res.current.condition.text === 'Clear') {
        app.style.backgroundImage = 'url(/img/night-3.avif)';
        app.style.color = '#ccc';
      }
      if (res.current.condition.text === 'Light rain shower') {
        app.style.backgroundImage = 'url(/img/night-ring.avif)';
        app.style.color = '#ccc';
      }
      if (res.current.condition.text === 'Overcast') {
        app.style.backgroundImage = 'url(/img/night-clear.avif)';
        app.style.color = '#ccc';
      }
      if (res.current.condition.text === 'Patchy rain possible') {
        app.style.backgroundImage = 'url(/img/ring.avif)';
        app.style.color = '#ccc';
      }
    });
};
getData();
