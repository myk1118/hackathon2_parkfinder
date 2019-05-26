//==============================================================================
// weather.js - 2019.May.15 - use darksky API instead of openweathermap API
// purpose: handle all tasks related to weather, including
//  (1) define weather class object
//  (2) setup and make API call to access weather data
//  (3) process data returned from API call
//  (4) prepare and display weather data for presentation
//==============================================================================

class WeatherHandler {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
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
            error: this.handleError
        })
    }

    //retrieve the data returned from the API call
    processWeatherData(data) {
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
    var sunrise = new Date(parseInt(w_data.daily.data[0].sunriseTime * 1000));
    var sunset = new Date(parseInt(w_data.daily.data[0].sunsetTime * 1000));
    sunrise = sunrise.toLocaleTimeString('en-US');
    sunset = sunset.toLocaleTimeString('en-US');
    
    var date = $('<div>').addClass('date').text(fullDate.toDateString());
    //Still need to add icon
    var iconAndTemp = $('<div>').addClass('iconAndTemp').text((w_data.currently.temperature).toFixed(0) + '°');
    var condition = $('<div>').addClass('condition').text(w_data.daily.data[0].summary);

    var leftWeather = $('<div>').addClass('leftContainer');
    var lowHeader = $('<p>').addClass('header').text('Low');
    var lowTemp = $('<p>').text((w_data.daily.data[0].apparentTemperatureMin).toFixed(0));
    var humidityHeader = $('<p>').addClass('header').text('Humidity');
    var humidity = $('<p>').text((w_data.currently.humidity * 100).toFixed(0) + '%');
    var sunriseHeader = $('<p>').addClass('header').text('Sunrise');
    var sunriseTime = $('<p>').text(sunrise);
    leftWeather.append(lowHeader, lowTemp, humidityHeader, humidity, sunriseHeader, sunriseTime);

    var rightWeather = $('<div>').addClass('rightContainer');
    var highHeader = $('<p>').addClass('header').text('High');
    var highTemp = $('<p>').text((w_data.daily.data[0].apparentTemperatureMax).toFixed(0));
    var windSpeedHeader = $('<p>').addClass('header').text('Wind Speed');
    var windSpeed = $('<p>').text((w_data.currently.windSpeed).toFixed(0) + ' mph');
    var sunsetHeader = $('<p>').addClass('header').text('Sunset');
    var sunsetTime = $('<p>').text(sunset);
    rightWeather.append(highHeader, highTemp, windSpeedHeader, windSpeed, sunsetHeader, sunsetTime);
    
    $('.carousel-inner').append(date, iconAndTemp, condition, leftWeather, rightWeather);
    $('#carouselModalContainer').show();
        $('#myCarousel').carousel({
            interval: false
        });

    $('#description').text('Condition: ' + description);
    $('#curr_temp').text('Current Temp: ' + curr_temp + ' F');
    $('#max_temp').text('High: ' + max_temp + ' F');
    $('#min_temp').text('Low: ' + min_temp + ' F');
    $('#humidity').text(humidity);
    $('#sunrise').text(sunrise);
    $('#sunset').text(sunset);
    $('#wind_speed').text(wind_speed);
}