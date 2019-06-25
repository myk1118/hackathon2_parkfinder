/**Object constructor for imgur AJAX call*/
class ParkImages {

    constructor(tagName, resetModal, handleError) {
        /**this.park is the current national park, needed for the AJAX call*/
        this.park = tagName;
        this.resetModal = resetModal;
        this.handleError = handleError;
        this.displayedImages = [];
        this.numberOfImagesLoaded = 0;
        this.imageLoadTime = null;
        this.handleSuccess = this.handleSuccess.bind(this);
        this.loadImage = this.loadImage.bind(this);
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
        // $('#loading').css('display', 'none');
        $('#loading').append('<button id="modalClose" onclick="closeLoading()"><i class="fas fa-times"></i></button>');
        var potentialImages = response.data.items;
        var indicatorNum = 0;
        for (var imageIndex = 0; this.displayedImages.length < 5; imageIndex++) {
            if (!potentialImages[imageIndex]) {
                break;
            } else {
                var currentImage = potentialImages[imageIndex];

                if (potentialImages[imageIndex].images) {
                    currentImage = potentialImages[imageIndex].images[0];
                }

                if (currentImage.type === 'image/jpeg') {
                    var imageContainer = $('<img>', {
                        class: 'item',
                        src: currentImage.link
                    });

                    var indicator = $('<li>', {
                        'data-target': '#carousel-outer',
                        'data-slide-to': indicatorNum,
                    });

                    $('.carousel-inner').append(imageContainer);
                    $('.carousel-indicators').append(indicator);
                    indicatorNum++;
                    this.displayedImages.push(currentImage.link);
                }
            }
        }

        var closeButton = $('<button id="modalClose"><i class="fas fa-times"></i></button>').on('click', () => {
            this.resetModal();
        });

        $('#carouselModal').append(closeButton);

        $('.item').first().addClass('active');
        $('.carousel-indicators > li').first().addClass('active');

        $('.item').on('load', this.loadImage);
        
        $('#carouselModalContainer').show();
        $('#carousel-outer').carousel({
            interval: false
        });

        this.imageLoadTime = setTimeout(() => {
            if ($('#loading').css('display') === 'block') {
                this.handleError();
            }
        }, 15000);
    }

    loadImage() {
        console.log('image loaded');
        this.numberOfImagesLoaded++;
        if (this.numberOfImagesLoaded === this.displayedImages.length) {
            $('#loading').css('display', 'none');
            clearTimeout(this.imageLoadTime);
            $('#loading #modalClose').remove();
        }
    }
}
