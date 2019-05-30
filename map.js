/**global variable holding park coordinates and a tag to use in our imgur api calls */
var parksList = {
    "mountains": {
        "icon": "images/mountains.png",
        "parks": {
            "kingsCanyon": {
                coordinates: {
                    lat: 36.8879,
                    lng: -118.5551
                },
                imgurTag: "kings_canyon",
                displayName: "Kings Canyon National Park"
            },
            "lassen": {
                coordinates: {
                    lat: 40.4977,
                    lng: -121.4207
                },
                imgurTag: "lassen",
                displayName: "Lassen Volcanic National Park"
            },
            "yosemite": {
                coordinates: {
                    lat: 37.8651,
                    lng: -119.5383
                },
                imgurTag: "yosemite",
                displayName: "Yosemite National Park"
            },
            "pinnacles": {
                coordinates: {
                    lat: 36.4906,
                    lng: -121.1825
                },
                imgurTag: "pinnacles",
                displayName: "Pinnacles National Park"
            }
        }
    },
    "forests": {
        "icon": "images/forests.png",
        "parks": {
            "redwoods": {
                coordinates: {
                    lat: 41.2132,
                    lng: -124.0046
                },
                imgurTag: "redwoods",
                displayName: "Redwood National Park"
            },
            "sequoia": {
                coordinates: {
                    lat: 36.4864,
                    lng: -118.5658
                },
                imgurTag: "sequoia_national_park",
                displayName: "Sequoia National Park"
            },
            "yosemite": {
                coordinates: {
                    lat: 37.8651,
                    lng: -119.5383
                },
                imgurTag: "yosemite",
                displayName: "Yosemite National Park"
            },
            "lassen": {
                coordinates: {
                    lat: 40.4977,
                    lng: -121.4207
                },
                imgurTag: "lassen",
                displayName: "Lassen Volcanic National Park"
            }
        }
    },
    "oceans": {
        "icon": "images/oceans.png",
        "parks": {
            "channelIslands": {
                coordinates: {
                    lat: 33.9961,
                    lng: -119.7692
                },
                imgurTag: "channel_islands",
                displayName: "Channel Islands National Park"
            }
        }
    },
    "deserts": {
        "icon": "images/deserts.png",
        "parks": {
            "deathValley": {
                coordinates: {
                    lat: 36.5054,
                    lng: -117.0794
                },
                imgurTag: "death_valley",
                displayName: "Death Valley National Park"
            },
            "joshuaTree": {
                coordinates: {
                    lat: 33.8734,
                    lng: -115.9010
                },
                imgurTag: "joshua_tree",
                displayName: "Joshua Tree National Park"
            }
        }
    }
}

class ParkMap {
    constructor(userPreference) { /**constructor takes in the user's choice of park/geography type */
        /**store user's preference as a property of the map object */
        this.preference = userPreference;

        /**create new google map, add it to the dom element with id map_container */
        this.map = new google.maps.Map(document.getElementById("map_container"), {
            center: parksList.mountains.parks["yosemite"].coordinates,
            //zoom needs to be dependent on screen size, 5.3 is good for mobile
            zoom: 5.3,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        });

        /**declare variables to later be assigned the map markers at various parks */
        this.markers = {};

        /**do all necessary binding of functions */
        this.addMarkers = this.addMarkers.bind(this);
        this.displayInfoBox = this.displayInfoBox.bind(this);
        this.addInfoClickHandlers = this.addInfoClickHandlers.bind(this);
    }

    centerMap() {
        let bounds = new google.maps.LatLngBounds();
        for (let key in this.markers) {
            const coords = this.markers[key].getPosition();
            bounds.extend(coords);
        }
        this.map.fitBounds(bounds);
    }

    addMarkers() {
        /**adds appropriate markers based on user preference */
        for (const parkName in parksList[this.preference].parks) {
            this.markers[parkName] = new google.maps.Marker({
                position: parksList[this.preference].parks[parkName].coordinates,
                map: this.map,
                icon: parksList[this.preference].icon
            });
            this.markers[parkName].addListener('click', () => {
                this.displayInfoBox(parkName)
            })
        }
        // this.centerMap();
    }

    displayInfoBox(park) {
        var infoBox = new google.maps.InfoWindow({
            content: `<div class='infoHeader'>${parksList[this.preference].parks[park].displayName}</div>` +
                `<img src='images/${park}InfoBox.jpg' class='infoImage'>` +
                `<div class='infoLinksContainer'>
                <div class='${park} weather infoLinks'>Weather</div>` +
                `<div class='${park} news infoLinks'>News</div>` +
                `<div class='${park} images infoLinks'>Images</div>
                </div>`,
            position: parksList[this.preference].parks[park].coordinates
        });
        infoBox.addListener('domready', this.addInfoClickHandlers);
        infoBox.open(this.map);
        google.maps.event.addListener(infoBox, 'closeclick', () => {
            this.map.panTo(parksList.mountains.parks["yosemite"].coordinates);
        });
    }

    addInfoClickHandlers() {
        /**add click handlers to the divs in the info box, which call handleInfoClicks in main.js */
        $(".infoLinks").on("click", handleInfoClicks);
    }
}
