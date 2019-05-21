//==============================================================================
// weather.js - 2019.May.15 - use darksky API instead of openweathermap API
// purpose: handle all tasks related to weather, including
//  (1) define weather class object
//  (2) setup and make API call to access weather data
//  (3) process data returned from API call
//  (4) prepare and display weather data for presentation
//==============================================================================

class WeatherHandler{

    constructor(lat, lng, callback){

        this.lat = lat;
        this.lng = lng;
        this.w_data = {};
        this.apiUrl = 'https://api.darksky.net/forecast/eb1017e0f2a52f8a5709fd37bf8452af/';
        this.baseUrl = 'https://cors-anywhere.herokuapp.com/' + this.apiUrl;
        this.callback = this.processWeatherData.bind(this);
        this.getWeatherData = this.getWeatherData.bind(this);
        this.handleError = this.handleError.bind(this);

    }
    //make API call to weather data website using AJAX
    getWeatherData(){

            $.ajax({
                url: this.baseUrl + this.lat + ',' + this.lng,
                //success: data=>{this.callback(data);
                success: this.callback,
                error: this.handleError
            })
    }

    //retrieve the data returned from the API call
    processWeatherData (data){
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
    // to convert from kelvin to farenheit - subtract 273.15, multiply by 9/5, and add 32
    //var place = w_data.alerts[0].regions[0];
    var wind_speed = (w_data.currently.windSpeed).toFixed(0)  + ' mph';
    var curr_temp = (w_data.currently.temperature).toFixed(0);
    var humidity = (w_data.currently.humidity * 100).toFixed(0) + '%';
    var description = w_data.daily.data[0].summary;

    var min_temp = (w_data.daily.data[0].apparentTemperatureMin).toFixed(0);
    var max_temp = (w_data.daily.data[0].apparentTemperatureMax).toFixed(0);
    var sunrise = new Date(parseInt(w_data.daily.data[0].sunriseTime * 1000));
    var sunset = new Date(parseInt(w_data.daily.data[0].sunsetTime * 1000));
    sunrise = sunrise.toLocaleTimeString('en-US');
    sunset = sunset.toLocaleTimeString('en-US');


    $('#description').text('Condition: ' + description);
    $('#curr_temp').text('Current Temp: ' + curr_temp + ' F');
    $('#max_temp').text('High: ' + max_temp + ' F');
    $('#min_temp').text('Low: ' + min_temp + ' F');
    $('#humidity').text(humidity);
    $('#sunrise').text(sunrise);
    $('#sunset').text(sunset);

    //$('#place').text(place);
    $('#wind_speed').text(wind_speed);
}