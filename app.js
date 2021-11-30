(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}` , {headers:{Authorization:'Client-ID eVzqrpq4LULubjYG9wW_DMa1l-MTIq6pqwQNmE8jwLI'}})
        .then(response => response.json())
        .then(addImage)
        .catch(error => requestError(error, 'image'));
        function addImage(data) {
            let htmlContent = '';
            const firstImage= data.results[0];
            if(firstImage){
                htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`;
            } else {
                htmlContent = 'Unfortunately, no image was returned for your search.'
            }
            responseContainer.insertAdjacentHTML('afterbegin' , htmlContent)
        }
        function requestError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }
        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=UyA7AxkkXMnHtU1FtBxHC6XuluQG0Xkv`)
        .then(response => response.json())
        .then(addIArticle)
        .catch(e => requestError(e, 'articles'));
        function addIArticle(data) {
            let htmlContent = '';
            if(data.response && data.response.docs && data.response.docs.length > 1 ){
                htmlContent = '<ul>' + data.response.docs.map(article => `<li class= "article">
                    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                </li>`
                ).join('') + '</ul>'
            } else {
                htmlContent = '<div class="erorr-no-articles" >No Articles Available </div>'
            }
            responseContainer.insertAdjacentHTML('beforeend' , htmlContent)
            
        }
    });
})();
