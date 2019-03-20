//$('button').click(getWeatherData);

var yosemite = {lat: 37.8651, lng: -119.5383};

// api.openweathermap.org/data/2.5/weather?lat=37.8651&lon=-119.5383&APPID=de0df42deb8634d9a313c41fc3ae96b7

class WeatherHandler{

    constructor(callback){

        this.w_data = {};

        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
        this.callback = this.processWeatherData.bind(this);
        this.getWeatherData = this.getWeatherData.bind(this);

    }

    getWeatherData(lat, lon){
        $.ajax({
            url: this.baseUrl + 'lat=' + lat + '&lon=' + lon + '&APPID=de0df42deb8634d9a313c41fc3ae96b7',
            //success: data=>{this.callback(data);
            success: this.callback
        })
    }

    processWeatherData (data){
        this.w_data = data;
        console.log('inside getWeatherData...', this.w_data);
        displayWeatherData(this.w_data);
    }

}

//var weatherAPI = new WeatherHandler(getWeatherData);
var weatherAPI = new WeatherHandler();

weatherAPI.getWeatherData(yosemite.lat, yosemite.lng);

function displayWeatherData(w_data) {
//subtract 273.15, multiply by 9/5, and add 32
    var place = w_data.name;
    var wind_speed = w_data.wind.speed;
    var curr_temp = ((w_data.main.temp - 273.15) * 9 / 5 + 32).toFixed(0);
    var min_temp = ((w_data.main.temp_min - 273.15) * 9 / 5 + 32).toFixed(0);
    var max_temp = ((w_data.main.temp_max - 273.15) * 9 / 5 + 32).toFixed(0);
    var humidity = w_data.main.humidity + '%';
    var description = w_data.weather[0].description;

    var sunrise = w_data.sys.sunrise;
    var sunset = w_data.sys.sunset;

    $('#description').text('Condition: ' + description);
    $('#curr_temp').text('Current Temp: ' + curr_temp + ' F');
    $('#max_temp').text('High: ' + max_temp + ' F');
    $('#min_temp').text('Low: ' + min_temp + ' F');
    $('#humidity').text(humidity);

    //var s = new Date(1504095567183).toLocaleTimeString("en-US")
    //date.toLocaleTimeString('en-US',{timeZone:'America/Adak'})
    // expected output "3:19:27 PM"`
    // $('#sunrise').text(Date(sunrise).toLocaleTimeString("en-US"));
    // $('#sunset').text(Date(sunset).toLocaleTimeString("en-US"));

    // sunrise = sunrise.toLocaleTimeString('en-US'); //,{timeZone:'America/Adak'});
    // sunset = sunset.toLocaleTimeString('en-US'); //,{timeZone:'America/Adak'});

    $('#sunrise').text(sunrise);
    $('#sunset').text(sunset);

    $('#place').text(place);
    $('#wind_speed').text(wind_speed);


}

