var mapObj = null;
var userPreference = null;

$(document).ready(initializeApp);
function initializeApp(){
    $("button").click(handleSubmit);
}

function handleSubmit(){
    userPreference = $(".preference_form").val();
    $(".title_logo").css("display", "none");
    $(".forms_container").css("display", "none");
    $("#map_container").css("display", "block");
    var mapObj = new Park_map(userPreference);
    mapObj.addMarkers();
}

function handleInfoClicks(){
    console.log("we got here");
}
