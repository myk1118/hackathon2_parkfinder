/**Declare global variables relating to the map and user choice on landing page */
var mapObj = null;
var userPreference = null;
var tutorialOpen = true;

/**attach event handler initializeApp to the event of the document being fully loaded */
$(document).ready(initializeApp);

/**add click handlers to now existing dom elements */
function initializeApp() {
    $("#submit_button").click(handleSubmit);
    $("#map_container").hide();
    $(".buttonsContainer").hide();
    $(".goBackButton").click(handleGoBack);
}

/**function called in the event of the submit button being clicked */
function handleSubmit() {
    userPreference = $(".preference_form").val(); /**stores user's choice in a global variable */

    /**clear the screen of existing dom elements, then make the map visible */
    $(".landingPage").hide();
    $("#map_container").show();
    $(".buttonsContainer").show();

    /**instantiate a new map object, add it to the dom, then create the markers */
    var mapObj = new ParkMap(userPreference);
    mapObj.addMarkers();
}

function handleGoBack() {
    $(".landingPage").show();
    $("#map_container").hide();
    $(".buttonsContainer").hide();
    resetModal();
}

/**function called in the event of one of our 'images', 'weather', or 'news' buttons being clicked */
function handleInfoClicks() {
    var classes = this.className.split(' '); /**split the class string up by spaces, effectively retrieving its individual classes */
    var parkName = classes[0];

    /**switch statement checking which button was clicked based on the second class of the clicked div */
    switch (classes[1]) {
        case 'images':
            /**create image modal in the event the user clicked the 'images' button */
            var imageGallery = new ParkImages(parksList[userPreference].parks[parkName].imgurTag, resetModal);
            imageGallery.retrieveImages();
            break;
        case 'weather':
            /**create weather modal in the event the user clicked the 'weather' button */
            var lat = parksList[userPreference].parks[parkName].coordinates.lat;
            var lng = parksList[userPreference].parks[parkName].coordinates.lng;
            var weatherAPI = new WeatherHandler(lat, lng, resetModal);
            weatherAPI.getWeatherData();
            break;
        case 'news':
            /**create news modal in the event the user clicked the 'news' button */
            var newsAPI = new News(parksList[userPreference].parks[parkName].displayName, resetModal);
            newsAPI.getDataFromServer();
            break;
    }

    window.onclick = function(event) {
        if ($(event.target).attr('id') === 'carouselModalContainer') {
            resetModal();
        }
    }
}

function resetModal() {
    $('#carouselModal>modalClose').remove();
    $('.carousel-indicators').empty();
    $('.carousel-inner').empty();
    $('#carouselModalContainer').hide();
}

function closeLoading() {
    $('#loading').css('display', 'none');
}
