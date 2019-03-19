
var settings = {
    "async": true,
    "crossDomain": true,
    //"url": "https://api.imgur.com/3/gallery/t/yosemite/{{sort}}/{{window}}/{{page}}",
    "url": "http://localhost/c219_hackathon2/api/imgurproxy.php",
    "method": "POST",
    "dataType": 'JSON',
    "data":{
        'refresh_token': 'refresh_token',
        'client_id': '96d895f68c7df46',
        'client_secret': '7797522e4aef6c58c534220df74b589a90794cac',
        'grant_type': 'refresh_token',
    }
    // "headers": {
    //     "Authorization": "Client-ID {{clientId}}",
    //     "cache-control": "no-cache",
    //     "Postman-Token": "588d1377-9763-44ac-8fa2-7bc5686bfe48"
    // }
}
  
$.ajax(settings).done(function (response) {
    var imageArray = response.data.items;
    for (var imageIndex = 0; imageIndex < 5; imageIndex++) {
        var imageLink = imageArray[imageIndex].images[0].link;
        var newImage = $('<img>',{
            src: imageLink,
            width: '20%',
        });
        $('body').append(newImage);
    }
});
