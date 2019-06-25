class News {
    constructor(keyword, resetModal, handleError) {
        this.keyword = keyword;
        this.resetModal = resetModal;
        this.handleError = handleError;
        this.news = [];
        this.numberOfArticlesLoaded = 0;
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.displayNews = this.displayNews.bind(this);
        this.loadImage = this.loadImage.bind(this);
    }

    getDataFromServer() {
        var getServerData = {
            url: 'https://newsapi.org/v2/everything?apiKey=d8a638ecf0534516ad34b799192ee8b8&language=en&pageSize=5&q="' + this.keyword + '"',
            method: 'get',
            data: {
                'apiKey': 'd8a638ecf0534516ad34b799192ee8b8',
                // 'q': 'yosemite',
                'language': 'en',
                'sortBy': 'relevancy',
                'pageSize': 2
            },
            dataType: 'json',
            success: this.handleSuccess,
            error: this.handleError,
            timeout: 10000
        };
        $.ajax(getServerData);
        $('#loading').css('display', 'block');
    }

    handleSuccess(response) { //status either 'ok' or 'error'
        if (response.status === 'ok') { //status 'ok'
            // $('#loading').css('display', 'none');
            for (var i = 0; i < response.articles.length; i++) {
                var currentArticle = response.articles[i];
                var currentArticleStorage = {};
                currentArticleStorage.source = currentArticle.source.name;
                currentArticleStorage.title = currentArticle.title;
                currentArticleStorage.url = currentArticle.url;
                currentArticleStorage.urlToImage = currentArticle.urlToImage;
                if (currentArticleStorage.urlToImage === null) {
                    currentArticleStorage.urlToImage = 'images/imageNotFound.png';
                }
                currentArticleStorage.publishedAt = currentArticle.publishedAt;
                this.news.push(currentArticleStorage);
            }
        } else { //status 'error'
            var errorMessage = response.message; //["user-requested request failure"]
            console.log(errorMessage);
        }
        this.displayNews();
    }

    displayNews() {
        if (this.news.length === 0) {
            var noArticles = $('<p>')
                .addClass('noArticles')
                .text("It looks like there aren't any articles available for this park."
                );
            var noArticlesButton = $('<div>')
                .addClass('noArticlesButton')
                .text('Back')
                .on('click', () => {
                    this.resetModal();
                }
                );

            $('.carousel-inner').append(noArticles, noArticlesButton);
        } else {
            for (var newsIndex = 0; newsIndex < this.news.length; newsIndex++) {
                var newsImageContainer = $('<div>', {
                    class: 'newsImageContainer',
                    // css: {
                    //     'background-image': 'url(' + this.news[newsIndex].urlToImage,
                    //     'background-size': 'cover',
                    //     'background-repeat': 'no-repeat',
                    //     'background-position': 'center center'
                    // }
                });

                var newsImage = $('<img>', {
                    class: 'newsImage',
                    src: this.news[newsIndex].urlToImage
                });

                newsImageContainer.append(newsImage);

                var newsTitle = $('<a>', {
                    href: this.news[newsIndex].url,
                    text: this.news[newsIndex].title,
                    target: '_blank',
                    class: 'newsTitle'
                })

                var dateWithoutTime = this.news[newsIndex].publishedAt.slice(0, 10);
                var newsDate = $('<p>', {
                    text: dateWithoutTime,
                    class: 'newsDate'
                })

                var newsSource = $('<p>', {
                    text: this.news[newsIndex].source,
                    class: 'newsSource'
                })

                var captionContainer = $("<div>").addClass("captionContainer").append(newsTitle, newsDate, newsSource);
                var newsFlexContainer = $("<div>").addClass("newsFlexContainer").append(newsImageContainer, captionContainer);
                var newsContainer = $("<div>").addClass("newsContainer item").append(newsFlexContainer);

                var indicator = $('<li>', {
                    'data-target': '#carousel-outer',
                    'data-slide-to': newsIndex
                });
    
                $('.carousel-inner').append(newsContainer);
                $('.carousel-indicators').append(indicator);
            }
        }

        var closeButton = $('<button id="modalClose"><i class="fas fa-times"></i></button>').on('click', () => {
            this.resetModal();
        });

        $('#carouselModal').append(closeButton);

        $('.item').first().addClass('active');
        $('.carousel-indicators > li').first().addClass('active');

        $('.newsImage').on('load', this.loadImage);

        $('#carouselModalContainer').show();
        $('#carousel-outer').carousel({
            interval: false
        });

        setTimeout(() => {
            if ($('#loading').css('display') === 'block') {
                this.handleError();
                this.resetModal();
            }
        }, 10000);
    }

    loadImage() {
        this.numberOfArticlesLoaded++;
        if (this.numberOfArticlesLoaded === this.news.length) {
            $('#loading').css('display', 'none');
        }
    }
}
