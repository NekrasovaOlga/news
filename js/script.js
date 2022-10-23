import fetchRequest from "./module/fetchRequest.js";
import freshNew from "./module/freshNew.js";

const newsList = document.querySelector('.fresh-news');
const newsAll = document.querySelector('.news-list__all');
const formSearch = document.querySelector('.form-search');
const titleSearch = document.querySelector('.title');
const searchBlock = document.querySelector('.search__block');


const initNews = async (lengthNews) => {
    const news = await fetchRequest('top-headlines?country=ru', lengthNews, {
        callback: freshNew,
    });
    newsList.innerHTML = '';
    newsList.append(news.template);
}

const searchNews = async (search) => {
    const news = await fetchRequest(`everything?q=${search}`, 8, {
        callback: freshNew,
    });
    newsAll.innerHTML = '';

    titleSearch.textContent = `По вашему запросу “${formSearch.search.value}” найдено ${news.length} результатов`;

    newsAll.append(news.template);
}

formSearch.addEventListener('submit', async (e) => {
    e.preventDefault();

    await searchNews(formSearch.search.value)
    await initNews(4)

    

    searchBlock.style.display = 'block';
})

initNews(8)