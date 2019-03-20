var mapObj = null;
var userPreference = null;

$(document).ready(initializeApp);
function initializeApp(){
    $("button").click(handleSubmit);
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
    if (classes[1] === 'images') {
        var parkName = classes[0];
        var imageGallery = new ParkImages(parksList[parkName].imgurTag)
        imageGallery.retrieveImages();
    }
}
