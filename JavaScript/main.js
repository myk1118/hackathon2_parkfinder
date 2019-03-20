var mapObj = null;
var region = null;

$(document).ready(initializeApp);
function initializeApp(){
    $("button").click(handleSubmit);
}

function handleSubmit(){
        region = $(".region_form").val();
        var mapObj = new Park_map(region);
        mapObj.addMarkers();
        $(".title_logo").css("display", "none");
        $(".forms_container").css("display", "none");
        $("#map_container").css("display", "block");
    }






