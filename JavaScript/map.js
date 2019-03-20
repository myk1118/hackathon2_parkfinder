var yosemite = {lat: 37.8651, lng: -119.5383};

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
    }
    addMarkers(){
        new google.maps.Marker({position: yosemite, map: this.map});
    }
}


