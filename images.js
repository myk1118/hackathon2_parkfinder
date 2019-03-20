
class ParkImages {

    constructor(tagName) {
        this.park = tagName;
    }

    retrieveImages() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost/c219_hackathon2/api/imgurproxy.php?tagName=" + this.park,
            "method": "POST",
            "dataType": 'JSON',
            "data": {
                'refresh_token': 'refresh_token',
                'client_id': '96d895f68c7df46',
                'client_secret': '7797522e4aef6c58c534220df74b589a90794cac',
                'grant_type': 'refresh_token',
            }
        }
        
        var modalContent = $('<div>',{
            id: 'modalContent',
        })
        
        $.ajax(settings).done(function (response) {
            var potentialImages = response.data.items;
            var displayedImages = [];
            for (var imageIndex = 0; displayedImages.length < 3; imageIndex++) {
                if (potentialImages[imageIndex].images) {
                    var currentImage = potentialImages[imageIndex].images[0];
                    if (currentImage.type === 'image/jpeg') {
                        var imageLink = potentialImages[imageIndex].images[0].link;
                        var imageContainer = $('<div>',{
                            class: 'imageContainer',
                            css: {
                                'background-image': `url(${imageLink})`,
                            }
                        })
                        displayedImages.push(imageContainer);
                        $(modalContent).append(imageContainer);
                    }
                }
            }
        });
        var urlForMore = `https://imgur.com/t/${this.park}`;
        var moreButton = $('<button>',{
            id: 'moreButton',
            text: 'Click Here for More!',
            on: {'click': function() {
                window.open(urlForMore);
            }}
        })
        modalContent.append(moreButton);
        var imageModal = new Modal('images', modalContent);
        imageModal.createModal(this.park);
    }
}
