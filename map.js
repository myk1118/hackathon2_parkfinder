/**global variable holding park coordinates and a tag to use in our imgur api calls */
var parksList = {
    "mountains": {
        "kingsCanyon": {
            coordinates: {
                lat: 36.8879,
                lng: -118.5551
            },
            imgurTag: "kings_canyon",
            displayName: "Kings Canyon"
        },
        "lassen": {
            coordinates: {
                lat: 40.4977,
                lng: -121.4207},
            imgurTag: "lassen",
            displayName: "Lassen"
        },
        "yosemite": {
            coordinates: {
                lat: 37.8651,
                lng: -119.5383},
            imgurTag: "yosemite",
            displayName: "Yosemite"
        },
        "pinnacles": {
            coordinates: {
                lat: 36.4906,
                lng: -121.1825},
            imgurTag: "pinnacles",
            displayName: "Pinnacles"
        }
    },
    "forests": {
        "redwoods": {
            coordinates: {
                lat: 41.2132,
                lng: -124.0046},
            imgurTag: "redwoods",
            displayName: "Redwoods"
        },
        "sequoia": {
            coordinates: {
                lat: 36.4864,
                lng: -118.5658},
            imgurTag: "sequoia_national_park",
            displayName: "Sequoia"
        },
        "yosemite": {
            coordinates: {
                lat: 37.8651,
                lng: -119.5383},
            imgurTag: "yosemite",
            displayName: "Yosemite"
        },
        "lassen": {
            coordinates: {
                lat: 40.4977,
                lng: -121.4207},
            imgurTag: "lassen",
            displayName: "Lassen"
        }
    },
    "oceans": {
        "channelIslands": {
            coordinates: {
                lat: 33.9961,
                lng: -119.7692},
            imgurTag: "channel_islands",
            displayName: "Channel Islands"
        }
    },
    "deserts": {
        "deathValley": {
            coordinates: {
                lat: 36.5054,
                lng: -117.0794},
            imgurTag: "death_valley",
            displayName: "Death Valley"
        },
        "joshuaTree": {
            coordinates: {
                lat: 33.8734,
                lng: -115.9010},
            imgurTag: "joshua_tree",
            displayName: "Joshua Tree"
        }
    }
}

class ParkMap {
    constructor(userPreference){ /**constructor takes in the user's choice of park/geography type */
        /**store user's preference as a property of the map object */
        this.preference = userPreference;

        /**create new google map, add it to the dom element with id map_container */
        this.map = new google.maps.Map(document.getElementById("map_container"), {
            center: parksList.mountains["yosemite"].coordinates,
            zoom: 5.8,
            minZoom: 5.8, 
            maxZoom: 5.8
        });

        /**declare variables to later be assigned the map markers at various parks */
        this.markers = {}; 

        /**do all necessary binding of functions */
        this.addMarkers = this.addMarkers.bind(this);
        this.displayInfoBox = this.displayInfoBox.bind(this);
        this.addInfoClickHandlers = this.addInfoClickHandlers.bind(this);
    }

    addMarkers(){
        /**adds appropriate markers based on user preference */
        var parkName;
        for (parkName in parksList[this.preference]) {
            this.markers[parkName] = new google.maps.Marker({position: parksList[this.preference][parkName].coordinates, map: this.map});
            switch (parkName) {
                case 'kingsCanyon':
                    this.markers[parkName].addListener("click", () => {
                        this.displayInfoBox('kingsCanyon');
                    });
                    break;
                case 'lassen':
                    this.markers[parkName].addListener("click", () => {
                        this.displayInfoBox('lassen');
                    });
                    break;
                case 'yosemite':
                    this.markers[parkName].addListener("click", () => {
                        this.displayInfoBox('yosemite');
                    });
                    break;
                case 'pinnacles':
                    this.markers[parkName].addListener("click", () => {
                        this.displayInfoBox('pinnacles');
                    });
                    break;
                case 'redwoods':
                    this.markers[parkName].addListener("click", () => {
                        this.displayInfoBox('redwoods');
                    });
                    break;
                case 'sequoia':
                    this.markers[parkName].addListener("click", () => {
                        this.displayInfoBox('sequoia');
                    });
                    break;
                case 'channelIslands':
                    this.markers[parkName].addListener("click", () => {
                        this.displayInfoBox('channelIslands');
                    });
                    break;
                case 'deathValley':
                    this.markers[parkName].addListener("click", () => {
                        this.displayInfoBox('deathValley');
                    });
                    break;
                case 'joshuaTree':
                    this.markers[parkName].addListener("click", () => {
                        this.displayInfoBox('joshuaTree');
                    });
                    break;
            }
        }
    }

    displayInfoBox(park){
        var infoBox = new google.maps.InfoWindow({
            content: `<div class='infoHeader'>${parksList[this.preference][park].displayName} National Park</div>`+
                `<img src='images/${park}InfoBox.jpg' class='infoImage'>`+
                `<div class='${park} weather infoLinks'>Weather Information</div>`+
                `<div class='${park} news infoLinks'>Local News</div>`+
                `<div class='${park} images infoLinks'>Recent Posts on Imgur</div>`,
            position: parksList[this.preference][park].coordinates
        });
        infoBox.addListener('domready', this.addInfoClickHandlers);
        infoBox.open(this.map);
    }

    addInfoClickHandlers(){
        /**add click handlers to the divs in the info box, which call handleInfoClicks in main.js */
        $(".infoLinks").on("click", handleInfoClicks); 
    }
}
