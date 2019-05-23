class News {
    constructor(keyword) {
        this.keyword = keyword;
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
                // currentArticleStorage.author = currentArticle.author;
                currentArticleStorage.title = currentArticle.title;
                // currentArticleStorage.description = currentArticle.description;
                currentArticleStorage.url = currentArticle.url;
                currentArticleStorage.urlToImage = currentArticle.urlToImage;
                currentArticleStorage.publishedAt = currentArticle.publishedAt;
                // currentArticleStorage.content = currentArticle.content;
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
            var newsContainer = $('<div>', {
                class: 'item',
                css: {
                    'background-image': 'url(' + this.news[newsIndex].urlToImage,
                    'background-size': 'contain',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center top'
                }
            });

            var captionContainer = $('<div>', {
                class: 'carousel-caption',
            });

            var link = $('<a>', {
                href: this.news[newsIndex].url,
                text: this.news[newsIndex].title
            })

            var dateWithoutTime = this.news[newsIndex].publishedAt.slice(0, 10);
            var date = $('<p>', {
                text: dateWithoutTime
            })

            var source = $('<p>', {
                text: this.news[newsIndex].source
            })

            captionContainer.append(link, date, source);
            newsContainer.append(captionContainer);

            var indicator = $('<li>', {
                'data-target': '#myCarousel',
                'data-slide-to': newsIndex
            });

            $('.carousel-inner').append(newsContainer);
            $('.carousel-indicators').append(indicator);
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

        // $(".newsContainer").empty();
        // var newsContainer = $("<div>").attr("id", "newsModalContent");
        // for (var i = 0; i < this.news.length; i++) {
        //     var picture = $("<img>",
        //         {
        //             src: this.news[i].urlToImage,
        //             width: '100%'
        //         });
        //     var source = $("<div>").addClass("source").text(this.news[i].source);
        //     var link = $("<a>").attr("href", this.news[i].url).text(this.news[i].title);
        //     link.attr("target", "_blank");
        //     var title = $("<div>").addClass("title").append(link);
        //     var dateWithoutTime = this.news[i].publishedAt.slice(0, 10);
        //     var date = $("<div>").addClass("date").text(dateWithoutTime);
        //     var articleContainer = $("<div>").addClass("articleContainer").append(picture, source, title, date);
        //     newsContainer.append(articleContainer);
        //     // $('body').append(newsContainer);
        // }
        // var newsModal = new Modal(newsContainer);
        // newsModal.createModal();
    }
}

// var newsAPI = new News();
// newsAPI.getDataFromServer();