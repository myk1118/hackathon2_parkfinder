//==============================================================================
// weather.js
// purpose: handle all tasks related to weather, including
//  (1) define weather class object
//  (2) setup and make API call to OpenWeatherMap to access weather data
//  (3) process data returned from API call
//  (4) prepare and display weather data for presentation on webpage
//==============================================================================

//=========================== code used for testing purpose only ===========================================
// $('button').click(getWeatherData);
// var yosemite = {lat: 37.8651, lng: -119.5383};
// var lat = 37.8651;
// var lng = -119.5383;
// api.openweathermap.org/data/2.5/weather?lat=37.8651&lon=-119.5383&APPID=de0df42deb8634d9a313c41fc3ae96b7
//==========================================================================================================

class WeatherHandler{

    constructor(lat, lng, callback){

        this.lat = lat;
        this.lng = lng;
        this.w_data = {};
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
        this.callback = this.processWeatherData.bind(this);
        this.getWeatherData = this.getWeatherData.bind(this);
        this.handleError = this.handleError.bind(this);

    }
    //make API call to weather data website using AJAX
    getWeatherData(){
        $.ajax({
            url: this.baseUrl + 'lat=' + this.lat + '&lon=' + this.lng + '&APPID=de0df42deb8634d9a313c41fc3ae96b7',
            //success: data=>{this.callback(data);
            success: this.callback,
            error: this.handleError
        })
    }
    //retrieve the data returned from the API call
    processWeatherData (data){
        this.w_data = data;
        console.log('inside getWeatherData...', this.w_data);
        displayWeatherData(this.w_data);
    }
    //in case of error, display an error message
    handleError() {
        console.log("OpenWeatherMap - Server Data request Failed");
    }

}

// this will kick start the weather API handler to get weather data and format weather data display on webpage
// var weatherAPI = new WeatherHandler(lat, lng);
// weatherAPI.getWeatherData();

//prepare the data retrieved from API call fro presentation on web page
function displayWeatherData(w_data) {
    // extract data from w_data object and prep them to display on web page
    // to convert from kelvin to farenheit - subtract 273.15, multiply by 9/5, and add 32
    var place = w_data.name;
    var wind_speed = w_data.wind.speed  + ' mph';;
    var curr_temp = ((w_data.main.temp - 273.15) * 9 / 5 + 32).toFixed(0);
    var min_temp = ((w_data.main.temp_min - 273.15) * 9 / 5 + 32).toFixed(0);
    var max_temp = ((w_data.main.temp_max - 273.15) * 9 / 5 + 32).toFixed(0);
    var humidity = w_data.main.humidity + '%';
    var description = w_data.weather[0].description;
    var sunrise = new Date(parseInt(w_data.sys.sunrise));
    var sunset = new Date(parseInt(w_data.sys.sunset));
    // sunrise = sunrise.toLocaleTimeString('en-US',{timeZone:'America/Adak'});
    // sunset = sunset.toLocaleTimeString('en-US',{timeZone:'America/Adak'});
    sunrise = sunrise.toLocaleTimeString('en-US');
    sunset = sunset.toLocaleTimeString('en-US');

    $('#description').text('Condition: ' + description);
    $('#curr_temp').text('Current Temp: ' + curr_temp + ' F');
    $('#max_temp').text('High: ' + max_temp + ' F');
    $('#min_temp').text('Low: ' + min_temp + ' F');
    $('#humidity').text(humidity);
    $('#sunrise').text(sunrise);
    $('#sunset').text(sunset);

    $('#place').text(place);
    $('#wind_speed').text(wind_speed);
}