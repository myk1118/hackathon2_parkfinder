function initMap(){

    var yosemite = {lat: 37.8651, lng: -119.5383};
    var yosemiteInfo = "<div id='yosemiteHeading'>Yosemite National Park</div>"+
                        "<img src='infoViewImages/yosemite.jpg' class='infoBoxImages'>"+
                        "<div id='yosemiteLinkDiv'>Click <a href='https://en.wikipedia.org/wiki/Yosemite_National_Park' target='_blank'>here</a> to learn more</div>";

    var map = new google.maps.Map(document.getElementById("map_container"), {
        zoom: 5, 
        center: yosemite,
        gestureHandling: "cooperative"
    });
    var markerYosemite = new google.maps.Marker({
        position: yosemite, 
        map: map, 
        animation: google.maps.Animation.DROP
    });
    var yosemiteInfoWindow = new google.maps.InfoWindow({
        content: yosemiteInfo
    });
    markerYosemite.addListener("click", function(){
        yosemiteInfoWindow.open(map, markerYosemite);
    });
}










