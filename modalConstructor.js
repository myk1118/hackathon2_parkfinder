class Modal {
    constructor(type) {
        this.type = type;  //should be 'news', 'weather', or 'images'
    }

    createModal(parkName) {
        switch (this.type) {
            // case 'news':
            //     newsModal();
            //     break;
            // case 'weather':
            //     weatherModal();
            //     break;
            case 'images':
                this.imageModal(parkName);
                break;
        }
    }

    imageModal(tagName) { //tagName = park name; ex: 'zion_national_park'
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost/c219_hackathon2/api/imgurproxy.php?tagName=" + tagName,
            "method": "POST",
            "dataType": 'JSON',
            "data": {
                'refresh_token': 'refresh_token',
                'client_id': '96d895f68c7df46',
                'client_secret': '7797522e4aef6c58c534220df74b589a90794cac',
                'grant_type': 'refresh_token',
            }
        }

        var newModal = $('<div>',{
            id: 'imageModal',
        })

        $('body').append(newModal);

        $.ajax(settings).done(function (response) {
            var potentialImages = response.data.items;
            var displayedImages = [];
            for (var imageIndex = 0; displayedImages.length < 8; imageIndex++) {
                if (potentialImages[imageIndex].images) {
                    var currentImage = potentialImages[imageIndex].images[0];
                    if (currentImage.type === 'image/jpeg') {
                        var imageLink = potentialImages[imageIndex].images[0].link;
                        var newImage = $('<img>',{
                            src: imageLink,
                            width: '25%',
                        });
                        displayedImages.push(newImage);
                        $(newModal).append(newImage);
                    }
                }
            }
        });
    }
}
