class News {
    constructor(){
        this.news = [];
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    getDataFromServer() {
        var getServerData = {
            url: 'https://newsapi.org/v2/everything?q=yosemite&apiKey=d8a638ecf0534516ad34b799192ee8b8&language=en&pageSize=4',
            method: 'get',
            data: {
                'apiKey': 'd8a638ecf0534516ad34b799192ee8b8',
                'q': 'yosemite',
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
        displayNews();
    }

    handleError() {
        console.log("Server Request Failure");
    }
}

var news1 = new News();

news1.getDataFromServer();

function displayNews(){
    // console.log(news1.news[0].source);
    // $(".newsContainer").empty();
    for (var i = 0; i < news1.news.length; i++) {
        var picture = $("<img>",
            {
                src: news1.news[i].urlToImage,
                width: '40%'
            });
        var source = $("<div>").addClass("source").text(news1.news[i].source);
        var link = $("<a>").attr("href", news1.news[i].url).text(news1.news[i].title);
        link.attr("target", "_blank");
        var title = $("<div>").addClass("title").append(link);
        var date = $("<div>").addClass("date").text(news1.news[i].publishedAt);
        // var url = news1.news[i].url;
        var articleContainer = $("<div>").append(picture, source, title, date);
        articleContainer.addClass("articleDetails");
        $(".newsContainer").append(articleContainer);
    }
}