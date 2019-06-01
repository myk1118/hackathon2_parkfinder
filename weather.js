//==============================================================================
// weather.js - 2019.May.15 - use darksky API instead of openweathermap API
// purpose: handle all tasks related to weather, including
//  (1) define weather class object
//  (2) setup and make API call to access weather data
//  (3) process data returned from API call
//  (4) prepare and display weather data for presentation
//==============================================================================

class WeatherHandler {
    constructor(lat, lng, resetModal) {
        this.lat = lat;
        this.lng = lng;
        this.resetModal = resetModal;
        this.w_data = {};
        this.apiUrl = 'https://api.darksky.net/forecast/eb1017e0f2a52f8a5709fd37bf8452af/';
        this.baseUrl = 'https://cors-anywhere.herokuapp.com/' + this.apiUrl;
        this.processWeatherData = this.processWeatherData.bind(this);
        this.getWeatherData = this.getWeatherData.bind(this);
        this.handleError = this.handleError.bind(this);
    }
    //make API call to weather data website using AJAX

    getWeatherData() {
        $.ajax({
            url: this.baseUrl + this.lat + ',' + this.lng,
            success: this.processWeatherData,
            error: this.handleError,
            timeout: 10000
        });
        $('#loading').css('display', 'block');
    }

    //retrieve the data returned from the API call
    processWeatherData(data) {
        $('#loading').css('display', 'none');
        this.w_data = data;
        displayWeatherData(this.w_data);
    }
    //in case of error, display an error message
    handleError() {
        console.log("DarkSky - API data request failed");
    }
}

//prepare the data retrieved from API call to display on screen
function displayWeatherData(w_data) {
    var fullDate = new Date();
    var icon = w_data.currently.icon;
    switch (icon) {
        case 'clear-day':
            icon = 'day-sunny';
            break;
        case 'clear-night':
            icon = 'night-clear';
            break;
        case 'wind':
            icon = 'strong-wind';
            break;
        case 'partly-cloudy-day':
            icon = 'day-cloudy';
            break;
        case 'partly-cloudy-night':
            icon = 'night-alt-cloudy';
            break;
    }
    var sunrise = new Date(parseInt(w_data.daily.data[0].sunriseTime * 1000));
    var sunset = new Date(parseInt(w_data.daily.data[0].sunsetTime * 1000));
    sunrise = sunrise.toLocaleTimeString('en-US');
    sunset = sunset.toLocaleTimeString('en-US');

    var date = $('<div>').addClass('date').text(fullDate.toDateString());

    // var iconAndTemp = $(`<div class="iconAndTemp">${(w_data.currently.temperature).toFixed(0) + '°F'}<i class="wi wi-${icon}">`);

    var weatherIcon = $(`<i class="wi wi-${icon}">`);
    var currentTemp = $('<div>').addClass('currentTemp').text((w_data.currently.temperature).toFixed(0) + '°F');
    var condition = $('<div>').addClass('condition').text(w_data.daily.data[0].summary);

    var currentTempAndCondition = $('<div>').addClass('currentTempAndCondition').append(currentTemp, condition);

    var weatherMiddle = $('<div>').addClass('weatherMiddle jumbotron').append(weatherIcon, currentTempAndCondition);

    var leftWeather = $('<div>').addClass('leftContainer');
    var lowHeader = $('<div>').addClass('header').text('Low');
    var lowTemp = $('<div>').addClass('weatherData').text((w_data.daily.data[0].apparentTemperatureMin).toFixed(0) + '°F');
    var humidityHeader = $('<div>').addClass('header').text('Humidity');
    var humidity = $('<div>').addClass('weatherData').text((w_data.currently.humidity * 100).toFixed(0) + '%');
    var sunriseHeader = $('<div>').addClass('header').text('Sunrise');
    var sunriseTime = $('<div>').addClass('weatherData').text(sunrise);
    leftWeather.append(lowHeader, lowTemp, humidityHeader, humidity, sunriseHeader, sunriseTime);

    var rightWeather = $('<div>').addClass('rightContainer');
    var highHeader = $('<div>').addClass('header').text('High');
    var highTemp = $('<div>').addClass('weatherData').text((w_data.daily.data[0].apparentTemperatureMax).toFixed(0) + '°F');
    var windSpeedHeader = $('<div>').addClass('header').text('Wind Speed');
    var windSpeed = $('<div>').addClass('weatherData').text((w_data.currently.windSpeed).toFixed(0) + ' mph');
    var sunsetHeader = $('<div>').addClass('header').text('Sunset');
    var sunsetTime = $('<div>').addClass('weatherData').text(sunset);
    rightWeather.append(highHeader, highTemp, windSpeedHeader, windSpeed, sunsetHeader, sunsetTime);

    var weatherBottom = $('<div>').addClass('weatherBottom').append(leftWeather, rightWeather);

    var weatherContainer = $('<div>').addClass('weatherContainer').append(date, weatherMiddle, weatherBottom);

    $('.carousel-inner').append(weatherContainer);
    $('#carouselModalContainer').show();
    $('#carousel-outer').carousel({
        interval: false
    });

    var closeButton = $('<button id="modalClose"><i class="fas fa-times"></i></button>').on('click', () => {
        this.resetModal();
    });

    $('#carouselModal').append(closeButton);
}