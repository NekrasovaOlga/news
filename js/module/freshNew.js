const freshNew = (err, data) => {
    
    if(err) {
        console.warn(err);
        return;
    }

    const template = document.createElement('ul');
    template.className = 'news-list';

    const news = item => {
        return new Promise((resolve) => {
        
        const block = document.createElement('li');
        const title = document.createElement('h3');
        const description = document.createElement('p');
        const footer =  document.createElement('div');
        const datetime =  document.createElement('time');
        const autor =  document.createElement('p');

        
        const itemImg = new Image();

        itemImg.src = item.urlToImage;
        itemImg.alt = item.title;
        
        itemImg.onerror = function(){
            itemImg.src = 'img/none__img.jpg'
        }

        block.className = 'news-item';
        title.className = 'news-title';
        description.className = 'news-description';
        footer.className = 'news-footer';
        datetime.className = 'news-datetime';
        autor.className = 'news-autor';

        const publishedAt = new Date(item.publishedAt)

        title.innerHTML = `<a href="${item.url}" class="news-link" target="_blank">${item.title}</a>`
        description.textContent = item.description;
        datetime.dataTime = item.publishedAt;
        autor.textContent = item.author;

        datetime.innerHTML = `<span class="news-date">${publishedAt.getDate()}/${publishedAt.getMonth()}/${publishedAt.getFullYear()}</span> ${publishedAt.getHours()}:${publishedAt.getMinutes()}`;
        
        footer.append(datetime, autor);

        block.append(itemImg, title, description, footer);

        return resolve(block);
        })
    }
    
    const loadNews = async () => Promise.all(data.map(news))
    

    loadNews().then( data => {
        
        return template.append(...data)
    })

    
    return {
        template,
        length: data.length,
    };
};


export default freshNew;