class News {
    constructor(){
        this.news = [];
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    getDataFromServer() {
        var getServerData = {
            url: 'https://newsapi.org/v2/everything?q=yosemite&apiKey=d8a638ecf0534516ad34b799192ee8b8&language=en&pageSize=5',
            method: 'get',
            data: {
                'apiKey': 'd8a638ecf0534516ad34b799192ee8b8',
                'q': 'yosemite',
                'language': 'en',
                'sortBy': 'relevancy',
                'pageSize': 5
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
                currentArticleStorage.author = currentArticle.author;
                currentArticleStorage.title = currentArticle.title;
                currentArticleStorage.description = currentArticle.description;
                currentArticleStorage.url = currentArticle.url;
                currentArticleStorage.urlToImage = currentArticle.urlToImage;
                currentArticleStorage.publishedAt = currentArticle.publishedAt;
                currentArticleStorage.content = currentArticle.content;
                this.news.push(currentArticleStorage);
            }
        } else { //status 'error'
            var errorMessage = response.message; //["user-requested request failure"]
            console.log(errorMessage);
        }
    }

    handleError() {
        console.log("Server Request Failure");
    }
}

var news1 = new News();
news1.getDataFromServer();