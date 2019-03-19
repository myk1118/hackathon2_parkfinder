function initMap(){

    var yosemite = {lat: 37.8651, lng: -119.5383};
    var yellowstone = {lat: 44.4280, lng: -110.5885};
    var zion = {lat: 37.2982, lng: -113.0263};
    var acadia = {lat: 44.3386, lng: -68.2733};
    var samoa = {lat: -14.2583, lng: -170.6833};
    var arches = {lat: 38.7331, lng: -109.5925};

    var map = new google.maps.Map(document.getElementById("map_container"), {zoom: 4, center: yosemite});

    var markerYosemite = new google.maps.Marker({position: yosemite, map: map});
    var markerYellowstone = new google.maps.Marker({position: yellowstone, map: map});
    var markerZion = new google.maps.Marker({position: zion, map: map});
    var markerAcadia = new google.maps.Marker({position: acadia, map: map});
    var markerSamoa = new google.maps.Marker({position: samoa, map: map});
    var markerArches = new google.maps.Marker({position: arches, map: map});

}









