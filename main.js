/**Declare global variables relating to the map and user choice on landing page */
var mapObj = null;
var userPreference = null;
var tutorialOpen = true;

/**attach event handler initializeApp to the event of the document being fully loaded */
$(document).ready(initializeApp);

/**add click handlers to now existing dom elements */
function initializeApp() {
    $("#submit_button").click(handleSubmit);
    $(".tutorial").hide();
    $(".tutorialButton").click(handleGoBack);
    $(".toggleTutorialButton").hide();
    $(".toggleTutorialButton").click(handleToggleTutorial);
}

/**function called in the event of the submit button being clicked */
function handleSubmit() {
    userPreference = $(".preference_form").val(); /**stores user's choice in a global variable */

    /**clear the screen of existing dom elements, then make the map visible */
    $(".landingPage").css("display", "none");
    $("#map_container").css("display", "block");
    $(".tutorial").show();
    $(".toggleTutorialButton").show();

    /**instantiate a new map object, add it to the dom, then create the markers */
    var mapObj = new ParkMap(userPreference);
    mapObj.addMarkers();
}

function handleGoBack() {
    $(".landingPage").show();
    $("#map_container").hide();
    $(".tutorial").hide();
    $(".toggleTutorialButton").hide();
}

function handleToggleTutorial() {
    if (tutorialOpen) {
        $("#map_container").css({ "width": "100%" });
        $(".tutorial").css({ "width": "0" });
        $(".toggleTutorialButton").text("Tutorial");
    } else {
        $("#map_container").css({ "width": "70%" });
        $(".tutorial").css({ "width": "30%" });
        $(".toggleTutorialButton").text("Hide Tutorial");
    }
    tutorialOpen = !tutorialOpen;
}

/**function called in the event of one of our 'images', 'weather', or 'news' divs being clicked */
function handleInfoClicks() {
    var classes = this.className.split(' '); /**split the class string up by spaces, effectively retrieving its individual classes */
    var parkName = classes[0];
    // if (classes[1] === 'images') {
    //     var parkName = classes[0];
    //     var imageGallery = new ParkImages(parksList[parkName].imgurTag)
    //     imageGallery.retrieveImages();
    // }

    /**switch statement checking which park was clicked based on the second class of the clicked div */
    switch (classes[1]) {
        case 'images':
            /**create an image modal in the event the user clicked the 'recent imgur posts' div */
            var imageGallery = new ParkImages(parksList[userPreference][parkName].imgurTag)
            imageGallery.retrieveImages();
            break;
        case 'weather':
            //modal.style.display = "block";
            $(".modal").show();
            var lat = parksList[userPreference][parkName].coordinates.lat;
            var lng = parksList[userPreference][parkName].coordinates.lng;
            var weatherAPI = new WeatherHandler(lat, lng);
            weatherAPI.getWeatherData();
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if ($(event.target).hasClass('modal')) {
                    //modal.style.display = "none";
                    $(".modal").hide();
                } else if ($(event.target).hasClass('close_wModal')) {
                    $(".modal").hide();
                }
            };
            break;
        case 'news':
            /**create news modal in the event the user clicked the 'local news' div */
            var newsAPI = new News(parkName);
            newsAPI.getDataFromServer();
            break;
    }
}
