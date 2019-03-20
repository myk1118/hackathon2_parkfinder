class News {
    constructor(keyword){
        this.keyword = keyword;
        this.news = [];
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
        this.displayNews = this.displayNews.bind(this);
    }

    getDataFromServer() {
        var getServerData = {
            url: 'https://newsapi.org/v2/everything?apiKey=d8a638ecf0534516ad34b799192ee8b8&language=en&pageSize=4&q=' + this.keyword,
            method: 'get',
            data: {
                'apiKey': 'd8a638ecf0534516ad34b799192ee8b8',
                // 'q': 'yosemite',
                'language': 'en',
                'sortBy': 'relevancy',
                'pageSize': 4
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



    displayNews(){
        // console.log(newsAPI.news[0].source);
        // $(".newsContainer").empty();
        for (var i = 0; i < newsAPI.news.length; i++) {
            var picture = $("<img>",
                {
                    src: newsAPI.news[i].urlToImage,
                    width: '40%'
                });
            var source = $("<div>").addClass("source").text(newsAPI.news[i].source);
            var link = $("<a>").attr("href", newsAPI.news[i].url).text(newsAPI.news[i].title);
            link.attr("target", "_blank");
            var title = $("<div>").addClass("title").append(link);
            var date = $("<div>").addClass("date").text(newsAPI.news[i].publishedAt);
            var articleContainer = $("<div>").addClass("articleDetails").append(picture, source, title, date);
            var newsContainer = $("<div>").addClass("newsContainer").append(articleContainer);
            // $('body').append(newsContainer);
        }
        var newsModal = new Modal('news', newsContainer);
        newsModal.createModal(this.keyword);
    }
}

// var newsAPI = new News();
// newsAPI.getDataFromServer();