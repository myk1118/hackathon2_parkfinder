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

var yosemiteContent = "<div class='infoHeader'>Yosemite National Park</div>"+
                        "<img src='images/yosemiteInfoBox.jpg' class='infoImage'>"+
                        "<div class='yosemite weather infoLinks'>Weather information</div>"+
                        "<div class='yosemite news infoLinks'>Local News</div>"+
                        "<div class='yosemite images infoLinks'>Recent posts on Imgur</div>";

var channelIslandsContent = "<div class='infoHeader'>Channel Islands National Park</div>"+
                            "<img src='images/channelIslandsInfoBox.jpg' class='infoImage'>"+
                            "<div class='channelIslands weather infoLinks'>Weather Information</div>"+
                            "<div class='channelIslands news infoLinks'>Local News</div>"+
                            "<div class='channelIslands images infoLinks'>Recent Posts on Imgur</div>";

var deathValleyContent = "<div class='infoHeader'>Death Valley National Park</div>"+
                            "<img src='images/deathValleyInfoBox.jpg' class='infoImage'>"+
                            "<div class='deathValley weather infoLinks'>Weather Information</div>"+
                            "<div class='deathValley news infoLinks'>Local News</div>"+
                            "<div class='deathValley images infoLinks'>Recent Posts on Imgur</div>";

var joshuaTreeContent = "<div class='infoHeader'>Joshua Tree National Park</div>"+
                        "<img src='images/joshuaTreeInfoBox.jpg' class='infoImage'>"+
                        "<div class='joshuaTree weather infoLinks'>Weather Information</div>"+
                        "<div class='joshuaTree news infoLinks'>Local News</div>"+
                        "<div class='joshuaTree images infoLinks'>Recent Posts on Imgur</div>";

var redwoodsContent = "<div class='infoHeader'>Redwoods National Park</div>"+
                        "<img src='images/redwoodsInfoBox.jpg' class='infoImage'>"+
                        "<div class='redwoods weather infoLinks'>Weather Information</div>"+
                        "<div class='redwoods news infoLinks'>Local News</div>"+
                        "<div class='redwoods images infoLinks'>Recent Posts on Imgur</div>";

var kingsCanyonContent = "<div class='infoHeader'>Kings Canyon National Park</div>"+
                            "<img src='images/kingsCanyonInfoBox.jpg' class='infoImage'>"+
                            "<div class='kingsCanyon weather infoLinks'>Weather Information</div>"+
                            "<div class='kingsCanyon news infoLinks'>Local News</div>"+
                            "<div class='kingsCanyon images infoLinks'>Recent Posts on Imgur</div>";

var lassenContent = "<div class='infoHeader'>Lassen Volcanic National Park</div>"+
                    "<img src='images/lassenInfoBox.jpg' class='infoImage'>"+
                    "<div class='lassen weather infoLinks'>Weather Information</div>"+
                    "<div class='lassen news infoLinks'>Local News</div>"+
                    "<div class='lassen images infoLinks'>Recent Posts on Imgur</div>";

var pinnaclesContent = "<div class='infoHeader'>Pinnacles National Park</div>"+
                        "<img src='images/pinnaclesInfoBox.jpg' class='infoImage'>"+
                        "<div class='pinnacles weather infoLinks'>Weather Information</div>"+
                        "<div class='pinnacles news infoLinks'>Local News</div>"+
                        "<div class='pinnacles images infoLinks'>Recent Posts on Imgur</div>";

var sequoiaContent = "<div class='infoHeader'>Sequoia National Park</div>"+
                        "<img src='images/sequoiaInfoBox.jpg' class='infoImage'>"+
                        "<div class='sequoia weather infoLinks'>Weather Information</div>"+
                        "<div class='sequoia news infoLinks'>Local News</div>"+
                        "<div class='sequoia images infoLinks'>Recent Posts on Imgur</div>";

class Park_map {
    constructor(userPreference){
        this.preference = userPreference;
        this.map = new google.maps.Map(document.getElementById("map_container"), {
            center: parksList["yosemite"].coordinates,
            zoom: 5.8,
            minZoom: 5.8, 
            maxZoom: 5.8
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
        } else if (this.preference==="oceans"){
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
        channelIslandsInfoBox.addListener('domready', this.addInfoClickHandlers);
        channelIslandsInfoBox.open(this.map);
    }

    displayDeathValleyInfoBox(){
        var deathValleyInfoBox = new google.maps.InfoWindow({
            content: deathValleyContent,
            position: parksList["deathValley"].coordinates
        });
        deathValleyInfoBox.addListener('domready', this.addInfoClickHandlers);
        deathValleyInfoBox.open(this.map);
    }

    displayJoshuaTreeInfoBox(){
        var joshuaTreeInfoBox = new google.maps.InfoWindow({
            content: joshuaTreeContent, 
            position: parksList["joshuaTree"].coordinates
        });
        joshuaTreeInfoBox.addListener('domready', this.addInfoClickHandlers);
        joshuaTreeInfoBox.open(this.map);
    }

    displayKingsCanyonInfoBox(){
        var kingsCanyonInfoBox = new google.maps.InfoWindow({
            content: kingsCanyonContent, 
            position: parksList["kingsCanyon"].coordinates
        });
        kingsCanyonInfoBox.addListener('domready', this.addInfoClickHandlers);
        kingsCanyonInfoBox.open(this.map);
    }

    displayLassenInfoBox(){
        var lassenInfoBox = new google.maps.InfoWindow({
            content: lassenContent, 
            position: parksList["lassen"].coordinates
        });
        lassenInfoBox.addListener('domready', this.addInfoClickHandlers);
        lassenInfoBox.open(this.map);
    }

    displayPinnaclesInfoBox(){
        var pinnaclesInfoBox = new google.maps.InfoWindow({
            content: pinnaclesContent, 
            position: parksList["pinnacles"].coordinates
        });
        pinnaclesInfoBox.addListener('domready', this.addInfoClickHandlers);
        pinnaclesInfoBox.open(this.map);
    }

    displayRedwoodsInfoBox(){
        var redwoodsInfoBox = new google.maps.InfoWindow({
            content: redwoodsContent, 
            position: parksList["redwoods"].coordinates
        });
        redwoodsInfoBox.addListener('domready', this.addInfoClickHandlers);
        redwoodsInfoBox.open(this.map);
    }

    displaySequoiaInfoBox(){
        var sequoiaInfoBox = new google.maps.InfoWindow({
            content: sequoiaContent, 
            position: parksList["sequoia"].coordinates
        });
        sequoiaInfoBox.addListener('domready', this.addInfoClickHandlers);
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


