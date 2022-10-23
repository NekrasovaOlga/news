const URL = 'https://newsapi.org/v2/';

const fetchRequest = async (postfix, lengthNews, {
    method = 'get',
    callback,
    body, 
    headers = {
        'X-Api-Key' : '96ea1175fc3543f98b70929c729aa6b2'
    },
}) => {
    try {
        const option = {
            method,
        }; 
        
        if(body) option.body = JSON.stringify(body);
        if(headers) option.headers = headers;

        const response = await fetch(`${URL}${postfix}`, option);

        if(response.ok) {
            const data = await response.json();
            data.articles.length = (data.articles.length > 0) ? lengthNews : 0;
            console.log(data)
            if(callback) return callback(null, data.articles);
            return;
        }

        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    } catch (err) {
        return callback(err);
    }
};

export default fetchRequest;