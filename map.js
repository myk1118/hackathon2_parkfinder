var parksList = {
    "Channel Islands": {coordinates: {lat: 33.9961, lng: -119.7692}, imgurTag: ""},
    "Death Valley": {lat: 36.5054, lng: -117.0794, imgurTag: ""},
    "Joshua Tree": {lat: 33.8734, lng: -115.9010, imgurTag: ""},
    "Redwoods": {lat: 41.2132, lng: -124.0046, imgurTag: ""},
    "Kings Canyon": {lat: 36.8879, lng: -118.5551, imgurTag: ""},
    "Lassen": {lat: 40.4977, lng: -121.4207, imgurTag: ""}, 
    "Pinnacles": {lat: 36.4906, lng: -121.1825, imgurTag: ""},
    "Sequoia": {lat: 36.4864, lng: -118.5658, imgurTag: ""},
    "Yosemite": {coordinates: {lat: 37.8651, lng: -119.5383}, imgurTag: ""}
};

var yosemiteContent = "<img src='images/yosemiteInfoBox.jpg'>";
var channelIslandsContent; 
var deathValleyContent;
var joshuaTreeContent;
var redwoodsContent;
var kingsCanyonContent;
var lassenContent;
var pinnaclesContent;
var sequoiaContent;

class Park_map {
    constructor(region){
        this.userRegion = null;
        if (region==="NW"){
            this.userRegion = "NorthWest";
        } else if (region==="SW"){
            this.userRegion = "SouthWest";
        } else if (region==="NE"){
            this.userRegion = "NorthEast";
        } else {
            this.userRegion = "SouthEast";
        }
        this.map = new google.maps.Map(document.getElementById("map_container"), {
            center: parksList["Yosemite"].coordinates,
            zoom: 5.8
        });
        this.markers = {
            yosemiteMarker: null, 
            channelIslandsMarker: null, 
            deathValleyMarker: null, 
            joshuaTreeMarker: null, 
            redwoodsMarker: null,
            kingsCanyonMarker: null, 
            lassenMarker: null, 
            pinnaclesMarker: null, 
            sequoiaMarker: null
        }; 
        this.addMarkers = this.addMarkers.bind(this);
        this.displayInfoBox = this.displayInfoBox.bind(this);
    }

    addMarkers(){
        this.markers.channelIslandsMarker = new google.maps.Marker({position: parksList["Channel Islands"].coordinates, map: this.map});
        this.markers.channelIslandsMarker.addListener("click", this.displayInfoBox("channelIslands"));

        this.markers.yosemiteMarker = new google.maps.Marker({position: parksList["Yosemite"].coordinates, map: this.map});
        this.markers.yosemiteMarker.addListener("click", this.displayInfoBox("yosemite"));
    }

    displayInfoBox(park){
        if (park==="yosemite"){
            var yosemiteInfoBox = new google.maps.InfoWindow({
                content: yosemiteContent,
                position: parksList["Yosemite"].coordinates
            });
            yosemiteInfoBox.open(this.map);
        } else if (park==="channelIslands"){
            var channelIslandsInfoBox = new google.maps.InfoWindow({
                content: channelIslandsContent, 
                position: parksList["Channel Islands"].coordinates
            });
            channelIslandsInfoBox.open(this.map);
        }
    }
}

