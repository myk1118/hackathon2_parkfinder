
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.imgur.com/3/gallery/search/{{sort}}/{{window}}/{{page}}?q=yosemite",
    "method": "GET",
    "headers": {
        "Authorization": "Client-ID 96d895f68c7df46",
        "cache-control": "no-cache",
        "Postman-Token": "f713ef44-d51f-4bd1-b690-c13fe1577ce3"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});