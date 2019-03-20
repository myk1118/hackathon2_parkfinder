var parksList = {
    "Channel Islands": {lat: 33.9961, lng: -119.7692, imgurTag: ""},
    "Death Valley": {lat: 36.5054, lng: -117.0794, imgurTag: ""},
    "Joshua Tree": {lat: 33.8734, lng: -115.9010, imgurTag: ""},
    "Redwoods": {lat: 41.2132, lng: -124.0046, imgurTag: ""},
    "Kings Canyon": {lat: 36.8879, lng: -118.5551, imgurTag: ""},
    "Lassen": {lat: 40.4977, lng: -121.4207, imgurTag: ""}, 
    "Pinnacles": {lat: 36.4906, lng: -121.1825, imgurTag: ""},
    "Sequoia": {lat: 36.4864, lng: -118.5658, imgurTag: ""},
    "Yosemite": {lat: 37.8651, lng: -119.5383, imgurTag: ""}
};

var yosemiteContent = "<img src='images/yosemiteInfoBox.jpg'>";

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
            center: yosemite,
            zoom: 5.8
        });
        this.yosemiteMarker = null;
        this.displayInfoBox = this.displayInfoBox.bind(this);
    }

    addMarkers(){
        

        this.yosemiteMarker = new google.maps.Marker({position: yosemite, map: this.map});
        this.yosemiteMarker.addListener("click", this.displayInfoBox);
    }

    displayInfoBox(){
        var yosemiteInfoBox = new google.maps.InfoWindow({
            content: yosemiteContent,
            position: yosemite
        });
        yosemiteInfoBox.open(this.map);
    }
}

