//==============================================================================
// weather.js - 2019.May.15 - use darksky API instead of openweathermap API
// purpose: handle all tasks related to weather, including
//  (1) define weather class object
//  (2) setup and make API call to access weather data
//  (3) process data returned from API call
//  (4) prepare and display weather data for presentation
//==============================================================================

class WeatherHandler {
    constructor(lat, lng, resetModal, closeLoading) {
        this.lat = lat;
        this.lng = lng;
        this.resetModal = resetModal;
        this.closeLoading = closeLoading;
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
        displayCurrentWeatherData(this.w_data);
        displayForecast(this.w_data);
    }
    //in case of error, display an error message
    handleError() {
        console.log("DarkSky - API data request failed");
        this.closeLoading();
        $('#errorModal').css('display', 'block');
    }
}

//prepare the data retrieved from API call to display on screen
function displayCurrentWeatherData(w_data) {
    var fullDate = new Date();
    var date = $('<div>').addClass('date').text(fullDate.toDateString());

    var sunrise = new Date(parseInt(w_data.daily.data[0].sunriseTime * 1000));
    var sunset = new Date(parseInt(w_data.daily.data[0].sunsetTime * 1000));
    sunrise = sunrise.toLocaleTimeString('en-US');
    sunset = sunset.toLocaleTimeString('en-US');

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

    var weatherIcon = $(`<i class="wi wi-${icon}">`);
    var currentTemp = $('<div>').addClass('currentTemp').text((w_data.currently.temperature).toFixed(0) + '°F');
    var condition = $('<div>').addClass('condition').text(w_data.daily.data[0].summary);

    var currentTempAndCondition = $('<div>').addClass('currentTempAndCondition').append(currentTemp, condition);

    var weatherMiddle = $('<div>').addClass('weatherMiddle jumbotron').append(weatherIcon, currentTempAndCondition);

    var leftWeather = $('<div>').addClass('leftContainer');
    var lowHeader = $('<div>').addClass('header').text('Low');
    var lowTemp = $('<div>').addClass('weatherData').text((w_data.daily.data[0].apparentTemperatureMin).toFixed(0) + '°F');
    var lowContainer = $('<div>').addClass('weatherDataContainer').append(lowHeader, lowTemp);
    var humidityHeader = $('<div>').addClass('header').text('Humidity');
    var humidity = $('<div>').addClass('weatherData').text((w_data.currently.humidity * 100).toFixed(0) + '%');
    var humidityContainer = $('<div>').addClass('weatherDataContainer').append(humidityHeader, humidity);
    var sunriseHeader = $('<div>').addClass('header').text('Sunrise');
    var sunriseTime = $('<div>').addClass('weatherData').text(sunrise);
    var sunriseContainer = $('<div>').addClass('weatherDataContainer').append(sunriseHeader, sunriseTime);
    leftWeather.append(lowContainer, humidityContainer, sunriseContainer);

    var rightWeather = $('<div>').addClass('rightContainer');
    var highHeader = $('<div>').addClass('header').text('High');
    var highTemp = $('<div>').addClass('weatherData').text((w_data.daily.data[0].apparentTemperatureMax).toFixed(0) + '°F');
    var highContainer = $('<div>').addClass('weatherDataContainer').append(highHeader, highTemp);
    var windSpeedHeader = $('<div>').addClass('header').text('Wind Speed');
    var windSpeed = $('<div>').addClass('weatherData').text((w_data.currently.windSpeed).toFixed(0) + ' mph');
    var windSpeedContainer = $('<div>').addClass('weatherDataContainer').append(windSpeedHeader, windSpeed);
    var sunsetHeader = $('<div>').addClass('header').text('Sunset');
    var sunsetTime = $('<div>').addClass('weatherData').text(sunset);
    var sunsetContainer = $('<div>').addClass('weatherDataContainer').append(sunsetHeader, sunsetTime);
    rightWeather.append(highContainer, windSpeedContainer, sunsetContainer);

    var weatherBottom = $('<div>').addClass('weatherBottom').append(leftWeather, rightWeather);

    var weatherFlexContainer = $('<div>').addClass('weatherFlexContainer').append(date, weatherMiddle, weatherBottom);

    var weatherContainer = $('<div>').addClass('weatherContainer item active').append(weatherFlexContainer);

    var indicator = $('<li>', {
        'data-target': '#carousel-outer',
        'data-slide-to': 0,
        class: 'active'
    });

    $('.carousel-inner').append(weatherContainer);
    $('.carousel-indicators').append(indicator);

    var closeButton = $('<button id="modalClose"><i class="fas fa-times"></i></button>').on('click', () => {
        this.resetModal();
    });

    $('#carouselModal').append(closeButton);
}

function displayForecast(w_data) {
    var dailyData = w_data.daily.data;
    for (var dateIndex = 1; dateIndex < dailyData.length; dateIndex++) {
        var fullDate = new Date(dailyData[dateIndex].time * 1000);
        var date = $('<div>').addClass('date').text(fullDate.toDateString());

        var sunrise = new Date(parseInt(dailyData[dateIndex].sunriseTime * 1000));
        var sunset = new Date(parseInt(dailyData[dateIndex].sunsetTime * 1000));
        sunrise = sunrise.toLocaleTimeString('en-US');
        sunset = sunset.toLocaleTimeString('en-US');

        var icon = dailyData[dateIndex].icon;
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

        var weatherIcon = $(`<i class="wi wi-${icon}">`);
        var condition = $('<div>').addClass('condition').text(dailyData[dateIndex].summary);
        var currentTempAndCondition = $('<div>').addClass('currentTempAndCondition').append(condition);
        var weatherMiddle = $('<div>').addClass('weatherMiddle jumbotron').append(weatherIcon, currentTempAndCondition);

        var leftWeather = $('<div>').addClass('leftContainer');
        var lowHeader = $('<div>').addClass('header').text('Low');
        var lowTemp = $('<div>').addClass('weatherData').text((dailyData[dateIndex].apparentTemperatureMin).toFixed(0) + '°F');
        var lowContainer = $('<div>').addClass('weatherDataContainer').append(lowHeader, lowTemp);
        var humidityHeader = $('<div>').addClass('header').text('Humidity');
        var humidity = $('<div>').addClass('weatherData').text((dailyData[dateIndex].humidity * 100).toFixed(0) + '%');
        var humidityContainer = $('<div>').addClass('weatherDataContainer').append(humidityHeader, humidity);
        var sunriseHeader = $('<div>').addClass('header').text('Sunrise');
        var sunriseTime = $('<div>').addClass('weatherData').text(sunrise);
        var sunriseContainer = $('<div>').addClass('weatherDataContainer').append(sunriseHeader, sunriseTime);
        leftWeather.append(lowContainer, humidityContainer, sunriseContainer);

        var rightWeather = $('<div>').addClass('rightContainer');
        var highHeader = $('<div>').addClass('header').text('High');
        var highTemp = $('<div>').addClass('weatherData').text((dailyData[dateIndex].apparentTemperatureMax).toFixed(0) + '°F');
        var highContainer = $('<div>').addClass('weatherDataContainer').append(highHeader, highTemp);
        var windSpeedHeader = $('<div>').addClass('header').text('Wind Speed');
        var windSpeed = $('<div>').addClass('weatherData').text((dailyData[dateIndex].windSpeed).toFixed(0) + ' mph');
        var windSpeedContainer = $('<div>').addClass('weatherDataContainer').append(windSpeedHeader, windSpeed);
        var sunsetHeader = $('<div>').addClass('header').text('Sunset');
        var sunsetTime = $('<div>').addClass('weatherData').text(sunset);
        var sunsetContainer = $('<div>').addClass('weatherDataContainer').append(sunsetHeader, sunsetTime);
        rightWeather.append(highContainer, windSpeedContainer, sunsetContainer);

        var weatherBottom = $('<div>').addClass('weatherBottom').append(leftWeather, rightWeather);

        var weatherFlexContainer = $('<div>').addClass('weatherFlexContainer').append(date, weatherMiddle, weatherBottom);

        var weatherContainer = $('<div>').addClass('weatherContainer item').append(weatherFlexContainer);

        var indicator = $('<li>', {
            'data-target': '#carousel-outer',
            'data-slide-to': dateIndex
        });

        $('.carousel-inner').append(weatherContainer);
        $('.carousel-indicators').append(indicator);

        $('#carouselModalContainer').show();
        $('#carousel-outer').carousel({
            interval: false
        });
    }
}
