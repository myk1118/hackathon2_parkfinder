class News {
    constructor(keyword, resetModal) {
        this.keyword = keyword;
        this.resetModal = resetModal;
        this.news = [];
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
        this.displayNews = this.displayNews.bind(this);
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
            error: this.handleError
        };
        $.ajax(getServerData);
    }

    handleSuccess(response) { //status either 'ok' or 'error'
        if (response.status === 'ok') { //status 'ok'
            for (var i = 0; i < response.articles.length; i++) {
                var currentArticle = response.articles[i];
                var currentArticleStorage = {};
                currentArticleStorage.source = currentArticle.source.name;
                currentArticleStorage.title = currentArticle.title;
                currentArticleStorage.url = currentArticle.url;
                currentArticleStorage.urlToImage = currentArticle.urlToImage;
                currentArticleStorage.publishedAt = currentArticle.publishedAt;
                this.news.push(currentArticleStorage);
            }
        } else { //status 'error'
            var errorMessage = response.message; //["user-requested request failure"]
            console.log(errorMessage);
        }
        this.displayNews();
    }

    handleError() {
        console.log("Server Request Failure");
    }

    displayNews() {
        for (var newsIndex = 0; newsIndex < this.news.length; newsIndex++) {
            var newsImageContainer = $('<div>', {
                class: 'newsImageContainer',
                css: {
                    'background-image': 'url(' + this.news[newsIndex].urlToImage,
                    'background-size': 'cover',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center center'
                }
            });

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
            var newsContainer = $("<div>").addClass("item").append(newsImageContainer, captionContainer);

            var indicator = $('<li>', {
                'data-target': '#myCarousel',
                'data-slide-to': newsIndex
            });

            $('.carousel-inner').append(newsContainer);
            $('.carousel-indicators').append(indicator);
        }

        var closeButton = $('<button id="modalClose"><i class="fas fa-times"></i></button>').on('click', () => {
            this.resetModal();
        });

        $('#carouselModal').append(closeButton);

        $('.item').first().addClass('active');
        $('.carousel-indicators > li').first().addClass('active');

        $('#carouselModalContainer').show();
        $('#myCarousel').carousel({
            interval: false
        });
    }
}
