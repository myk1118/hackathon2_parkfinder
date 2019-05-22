/**Object constructor for imgur AJAX call*/
class ParkImages {

    constructor(tagName) {
        /**this.park is the current national park, needed for the AJAX call*/
        this.park = tagName;
    }

    /**retrieveImages initiates the AJAX call and appends the images/indicators to the carousel*/
    retrieveImages() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "api/imgurproxy.php?tagName=" + this.park,
            "method": "POST",
            "dataType": 'JSON',
            "data": {
                'refresh_token': 'refresh_token',
                'client_id': '96d895f68c7df46',
                'client_secret': '7797522e4aef6c58c534220df74b589a90794cac',
                'grant_type': 'refresh_token',
            }
        }

        /**When the AJAX call finishes, up to 3 images are added*/
        $.ajax(settings).done(function (response) {
            var potentialImages = response.data.items;
            var displayedImages = [];
            var indicatorNum = 0;
            for (var imageIndex = 0; displayedImages.length < 5; imageIndex++) {
                if (!potentialImages[imageIndex]) {
                    break;
                } else {
                    var currentImage = potentialImages[imageIndex];
                    
                    if (potentialImages[imageIndex].images) {
                        currentImage = potentialImages[imageIndex].images[0];
                    }

                    if (currentImage.type === 'image/jpeg') {
                        var imageContainer = $('<div>', {
                            class: 'item',
                            css: {
                                'background-image': 'url(' + currentImage.link + ')',
                                'background-size': 'contain',
                                'background-repeat': 'no-repeat',
                                'background-position': 'center'
                            }
                        });

                        var indicator = $('<li>', {
                            'data-target': '#myCarousel',
                            'data-slide-to': indicatorNum,
                        });

                        $('.carousel-inner').append(imageContainer);
                        $('.carousel-indicators').append(indicator);
                        indicatorNum++;
                        displayedImages.push(currentImage.link);
                    }
                }
            }

            var closeButton = $('<button id="modalClose">&times;</button>').on('click', function() {
                $('#modalClose').remove();
                $('.carousel-indicators').empty();
                $('.carousel-inner').empty();
                $('#carouselModalContainer').hide();
            });
            $('#carouselModal').append(closeButton);

            $('.item').first().addClass('active');
            $('.carousel-indicators > li').first().addClass('active');
            
            $('#carouselModalContainer').show();
            $('#myCarousel').carousel({
                interval: false
            });
        });

        /**urlForMore links to the search results on imgur (where the images were pulled from)*/
        // var urlForMore = `https://imgur.com/t/${this.park}`;

        // /**moreButton allows users to see more images from the park on imgur's website*/
        // var moreButton = $('<button>', {
        //     id: 'moreButton',
        //     text: 'Click Here for More!',
        //     on: {
        //         'click': function () {
        //             window.open(urlForMore);
        //         }
        //     }
        // })

        /**moreButton is appended to imageModalContent, and a new Modal object is instantiated*/
        // imageModalContent.append(moreButton);
        // var imageModal = new Modal(imageModalContent);
        // imageModal.createModal(this.park);
        
        // var imageModal = new Modal(carousel);
        // imageModal.createModal(this.park);
    }
}