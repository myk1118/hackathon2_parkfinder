class Modal {
    constructor(type, domDisplay) {
        this.type = type;  //should be 'news', 'weather', or 'images'
        this.domDisplay = domDisplay;
    }

    createModal() {
        switch (this.type) {
            case 'news':
                this.newsModal();
                break;
            case 'weather':
                this.weatherModal();
                break;
            case 'images':
                this.imageModal();
                break;
        }
    }

    deleteModal() {
        var modal = $(this).parent().parent();
        modal.remove();
    }

    newsModal() {
        var newsModal = $('<div>', {
            id: 'newsModal',
        });

        var modalClose = $('<button id="modalClose">&times;</button>').on('click', this.deleteModal);

        $('body').append(newsModal);
        newsModal.append(this.domDisplay);
        this.domDisplay.append(modalClose);
    }

    weatherModal() {
        var weatherModal = $('<div>',{
            id: 'weatherModal',
        })

        var modalClose = $('<button id="modalClose">&times;</button>').on('click', this.deleteModal);

        $('body').append(weatherModal);
        weatherModal.append(this.domDisplay);
        this.domDisplay.append(modalClose);
    }

    imageModal() {
        
        var imageModal = $('<div>',{
            id: 'imageModal',
        });

        var modalClose = $('<button id="modalClose">&times;</button>').on('click', this.deleteModal);

        $('body').append(imageModal);
        imageModal.append(this.domDisplay);
        this.domDisplay.append(modalClose);
    }
}
