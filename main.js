var mapObj = null;
var userPreference = null;

$(document).ready(initializeApp);
function initializeApp(){
    $("#submit_button").click(handleSubmit);
}

function handleSubmit(){
    userPreference = $(".preference_form").val();
    $(".logo").css("display", "none");
    $(".forms_container").css("display", "none");
    $("#map_container").css("display", "block");
    var mapObj = new Park_map(userPreference);
    mapObj.addMarkers();
}

function handleInfoClicks(){
    var classes = this.className.split(' ');
    var parkName = classes[0];
    // if (classes[1] === 'images') {
    //     var parkName = classes[0];
    //     var imageGallery = new ParkImages(parksList[parkName].imgurTag)
    //     imageGallery.retrieveImages();
    // }
    switch (classes[1]){
        case 'images':
            var imageGallery = new ParkImages(parksList[parkName].imgurTag)
            imageGallery.retrieveImages();
            break;
        case 'weather':
            //debugger;
            //modal.style.display = "block";
            $(".modal").show();
            var lat = parksList[parkName].coordinates.lat;
            var lng = parksList[parkName].coordinates.lng;
            var weatherAPI = new WeatherHandler(lat, lng);
            weatherAPI.getWeatherData();
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event){
                if ($(event.target).hasClass('modal')) {
                    //modal.style.display = "none";
                    $(".modal").hide();
                } else if ($(event.target).hasClass('close_wModal')){
                    $(".modal").hide();
                }

            }
            break;
        case 'news':
            console.log('news is work-in-progress');
            var newsAPI = new News(parkName);
            newsAPI.getDataFromServer();
            break;
    }


}
