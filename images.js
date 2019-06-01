/**Object constructor for imgur AJAX call*/
class ParkImages {

    constructor(tagName, resetModal) {
        /**this.park is the current national park, needed for the AJAX call*/
        this.park = tagName;
        this.resetModal = resetModal;
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    /**Initiates the AJAX call and retrieves the images/indicators to the carousel*/
    retrieveImages() {
        var settings = {
            async: true,
            crossDomain: true,
            url: "api/imgurproxy.php?tagName=" + this.park,
            method: "POST",
            dataType: 'JSON',
            data: {
                'refresh_token': 'refresh_token',
                'client_id': '96d895f68c7df46',
                'client_secret': '7797522e4aef6c58c534220df74b589a90794cac',
                'grant_type': 'refresh_token',
            },
            success: this.handleSuccess,
            error: this.handleError,
            timeout: 10000
        }
        $.ajax(settings);
        $('#loading').css('display', 'block');
    }

    /**Appends the images/indicators to the carousel*/
    handleSuccess(response) {
        $('#loading').css('display', 'none');
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
                            'background-size': 'cover',
                            'background-repeat': 'no-repeat',
                            'background-position': 'center'
                        }
                    });

                    var indicator = $('<li>', {
                        'data-target': '#carousel-outer',
                        'data-slide-to': indicatorNum,
                    });

                    $('.carousel-inner').append(imageContainer);
                    $('.carousel-indicators').append(indicator);
                    indicatorNum++;
                    displayedImages.push(currentImage.link);
                }
            }
        }

        var closeButton = $('<button id="modalClose"><i class="fas fa-times"></i></button>').on('click', () => {
            this.resetModal();
        });

        $('#carouselModal').append(closeButton);

        $('.item').first().addClass('active');
        $('.carousel-indicators > li').first().addClass('active');

        $('#carouselModalContainer').show();
        $('#carousel-outer').carousel({
            interval: false
        });
    }

    handleError() {
        console.log("Server Request Failure");
    }
}