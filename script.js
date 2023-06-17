let img = document.querySelector(".img");
let type = document.querySelector(".name");
let city = document.querySelector(".major h1");
let tempiratura = document.querySelector(".temp");
let pressure = document.querySelector(".pressValue");
let humidility = document.querySelector(".humValue");
let wind = document.querySelector(".windValue");
let inputs = document.querySelector(".input");
let major = document.querySelector(".major");

inputs.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        let input = document.querySelector(".input").value;
        getWeather(input);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    getWeather("Kyiv");
});

function getWeather(input) {
    let apiKey = 'bf35cac91880cb98375230fb443a116f&units';
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&appid=' + apiKey;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                let weatherType = data.weather[0].main;
                let name = data.name;
                let temp = Math.floor(data.main.temp);
                temp = temp.toString().slice(0, -1);
                let pressureValue = data.main.pressure;
                let humidityValue = `${data.main.humidity}%`;
                let windValue = `${data.wind.speed}km/h`;

                let iconPath;
                if (weatherType === 'Clear') {
                    iconPath = 'img/sun.png';
                    major.classList.remove('cloud', 'rain');
                    major.classList.add('sun');
                } else if (weatherType === 'Rain') {
                    iconPath = 'img/rain.png';
                    major.classList.remove('cloud', 'sun');
                    major.classList.add('rain');
                } else if (weatherType === 'Clouds') {
                    iconPath = 'img/cloud.png';
                    major.classList.remove('sun', 'rain');
                    major.classList.add('cloud');
                }

                img.setAttribute('src', iconPath);
                img.classList.add("img");
                type.innerHTML = weatherType;
                city.textContent = name;
                tempiratura.textContent = `${temp}°`;
                pressure.textContent = pressureValue;
                humidility.textContent = humidityValue;
                wind.textContent = windValue;
            } else {
                alert('Ошибка: Город не найден');
            }
        })
        .catch(error => {
            console.log('Ошибка:', error);
        });
}
