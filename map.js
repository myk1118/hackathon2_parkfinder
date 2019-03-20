var parksList = {

    "channelIslands": {
        coordinates: {
            lat: 33.9961,
            lng: -119.7692},
        imgurTag: "channel_islands"
    },
    "deathValley": {
        coordinates: {
            lat: 36.5054,
            lng: -117.0794},
        imgurTag: "death_valley"
    },
    "joshuaTree": {
        coordinates: {
            lat: 33.8734,
            lng: -115.9010},
        imgurTag: "joshua_tree"
    },
    "redwoods": {
        coordinates: {
            lat: 41.2132,
            lng: -124.0046},
        imgurTag: "redwoods"
    },
    "kingsCanyon": {
        coordinates: {
            lat: 36.8879,
            lng: -118.5551},
        imgurTag: "kings_canyon"
    },
    "lassen": {
        coordinates: {
            lat: 40.4977,
            lng: -121.4207},
        imgurTag: "lassen"
    },
    "pinnacles": {
        coordinates: {
            lat: 36.4906,
            lng: -121.1825},
        imgurTag: "pinnacles"
    },
    "sequoia": {
        coordinates: {
            lat: 36.4864,
            lng: -118.5658},
        imgurTag: "sequoia_national_park"
    },
    "yosemite": {
        coordinates: {
            lat: 37.8651,
            lng: -119.5383},
        imgurTag: "yosemite"
    }
};

var yosemiteContent = "<div class='yosemiteHeader'>Yosemite National Park</div>"+
                        "<img src='images/yosemiteInfoBox.jpg' class='yosemiteInfoImage'>"+
                        "<div class='yosemite weather infoLinks'>Weather information</div>"+
                        "<div class='yosemite news infoLinks'>Local News</div>"+
                        "<div class='yosemite images infoLinks'>Recent posts on Imgur</div>";

var channelIslandsContent = "<div>Channel Islands clicked</div>";
var deathValleyContent = "<div>Death Valley clicked</div>";
var joshuaTreeContent = "<div>Joshua Tree clicked</div>";
var redwoodsContent = "<div>Redwoods clicked</div>";
var kingsCanyonContent = "<div>Kings Canyon clicked</div>";
var lassenContent = "<div>Lassen clicked</div>";
var pinnaclesContent = "<div>Pinnacles clicked</div>";
var sequoiaContent = "<div>Sequoia clicked</div>";

class Park_map {
    constructor(userPreference){
        this.preference = userPreference;
        this.map = new google.maps.Map(document.getElementById("map_container"), {
            center: parksList["yosemite"].coordinates,
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
        this.displayChannelIslandsInfoBox = this.displayChannelIslandsInfoBox.bind(this);
        this.displayDeathValleyInfoBox = this.displayDeathValleyInfoBox.bind(this);
        this.displayJoshuaTreeInfoBox = this.displayJoshuaTreeInfoBox.bind(this);
        this.displayRedwoodsInfoBox = this.displayRedwoodsInfoBox.bind(this);
        this.displayKingsCanyonInfoBox = this.displayKingsCanyonInfoBox.bind(this);
        this.displayLassenInfoBox = this.displayLassenInfoBox.bind(this);
        this.displayPinnaclesInfoBox = this.displayPinnaclesInfoBox.bind(this);
        this.displaySequoiaInfoBox = this.displaySequoiaInfoBox.bind(this);
        this.displayYosemiteInfoBox = this.displayYosemiteInfoBox.bind(this);
        this.addInfoClickHandlers = this.addInfoClickHandlers.bind(this);
    }

    addMarkers(){
        if (this.preference==="mountains"){
            this.markers.kingsCanyonMarker = new google.maps.Marker({position: parksList["kingsCanyon"].coordinates, map: this.map});
            this.markers.kingsCanyonMarker.addListener("click", this.displayKingsCanyonInfoBox);

            this.markers.lassenMarker = new google.maps.Marker({position: parksList["lassen"].coordinates, map: this.map});
            this.markers.lassenMarker.addListener("click", this.displayLassenInfoBox);

            this.markers.yosemiteMarker = new google.maps.Marker({position: parksList["yosemite"].coordinates, map: this.map});
            this.markers.yosemiteMarker.addListener("click", this.displayYosemiteInfoBox);

            this.markers.pinnaclesMarker = new google.maps.Marker({position: parksList["pinnacles"].coordinates, map: this.map});
            this.markers.pinnaclesMarker.addListener("click", this.displayPinnaclesInfoBox);
        } else if (this.preference==="forests"){
            this.markers.redwoodsMarker = new google.maps.Marker({position: parksList["redwoods"].coordinates, map: this.map});
            this.markers.redwoodsMarker.addListener("click", this.displayRedwoodsInfoBox);

            this.markers.sequoiaMarker = new google.maps.Marker({position: parksList["sequoia"].coordinates, map: this.map});
            this.markers.sequoiaMarker.addListener("click", this.displaySequoiaInfoBox);

            this.markers.yosemiteMarker = new google.maps.Marker({position: parksList["yosemite"].coordinates, map: this.map});
            this.markers.yosemiteMarker.addListener("click", this.displayYosemiteInfoBox);

            this.markers.lassenMarker = new google.maps.Marker({position: parksList["lassen"].coordinates, map: this.map});
            this.markers.lassenMarker.addListener("click", this.displayLassenInfoBox);
        } else if (this.preference==="beaches"){
            this.markers.channelIslandsMarker = new google.maps.Marker({position: parksList["channelIslands"].coordinates, map: this.map});
            this.markers.channelIslandsMarker.addListener("click", this.displayChannelIslandsInfoBox);
        } else if (this.preference==="deserts"){
            this.markers.deathValleyMarker = new google.maps.Marker({position: parksList["deathValley"].coordinates, map: this.map});
            this.markers.deathValleyMarker.addListener("click", this.displayDeathValleyInfoBox);

            this.markers.joshuaTreeMarker = new google.maps.Marker({position: parksList["joshuaTree"].coordinates, map: this.map});
            this.markers.joshuaTreeMarker.addListener("click", this.displayJoshuaTreeInfoBox);
        }
    }

    displayChannelIslandsInfoBox(){
        var channelIslandsInfoBox = new google.maps.InfoWindow({
            content: channelIslandsContent, 
            position: parksList["channelIslands"].coordinates
        });
        channelIslandsInfoBox.open(this.map);
    }

    displayDeathValleyInfoBox(){
        var deathValleyInfoBox = new google.maps.InfoWindow({
            content: deathValleyContent,
            position: parksList["deathValley"].coordinates
        });
        deathValleyInfoBox.open(this.map);
    }

    displayJoshuaTreeInfoBox(){
        var joshuaTreeInfoBox = new google.maps.InfoWindow({
            content: joshuaTreeContent, 
            position: parksList["joshuaTree"].coordinates
        });
        joshuaTreeInfoBox.open(this.map);
    }

    displayKingsCanyonInfoBox(){
        var kingsCanyonInfoBox = new google.maps.InfoWindow({
            content: kingsCanyonContent, 
            position: parksList["kingsCanyon"].coordinates
        });
        kingsCanyonInfoBox.open(this.map);
    }

    displayLassenInfoBox(){
        var lassenInfoBox = new google.maps.InfoWindow({
            content: lassenContent, 
            position: parksList["lassen"].coordinates
        });
        lassenInfoBox.open(this.map);
    }

    displayPinnaclesInfoBox(){
        var pinnaclesInfoBox = new google.maps.InfoWindow({
            content: pinnaclesContent, 
            position: parksList["pinnacles"].coordinates
        });
        pinnaclesInfoBox.open(this.map);
    }

    displayRedwoodsInfoBox(){
        var redwoodsInfoBox = new google.maps.InfoWindow({
            content: redwoodsContent, 
            position: parksList["redwoods"].coordinates
        });
        redwoodsInfoBox.open(this.map);
    }

    displaySequoiaInfoBox(){
        var sequoiaInfoBox = new google.maps.InfoWindow({
            content: sequoiaContent, 
            position: parksList["sequoia"].coordinates
        });
        sequoiaInfoBox.open(this.map);
    }

    displayYosemiteInfoBox(){
        var yosemiteInfoBox = new google.maps.InfoWindow({
            content: yosemiteContent,
            position: parksList["yosemite"].coordinates
        });
        yosemiteInfoBox.addListener('domready', this.addInfoClickHandlers);
        yosemiteInfoBox.open(this.map);
    }

    addInfoClickHandlers(){
        $(".infoLinks").on("click", handleInfoClicks);
    }
}


