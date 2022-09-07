import { useHttp } from '../hooks/http.hook';

const useMarvelServices = () => {
    const {request, error, loading, clearError} = useHttp();


    const _apiKey = "apikey=18253dd91ed6341d7fdf1b734b043cc4";
    const _apiBaseUrl = "https://gateway.marvel.com:443/v1/public/";
    const _defaultOffset = 210;

    const _filterData = (data) => {
        const dataArray = data.data.results;
        
        if (dataArray.length === 1) {
            let desc = null;

            if (dataArray[0].description === "") {
                desc = "No description for this character found...";
            } else {
                desc = dataArray[0].description;
            }

            if (desc.length > 210) {
                desc = desc.slice(0, 210) + "...";
            }

            const character = {
                id: dataArray[0].id,
                name: dataArray[0].name,
                description: desc,
                thumbnail: dataArray[0].thumbnail.path + "." + dataArray[0].thumbnail.extension,
                wiki: dataArray[0].urls[1].url,
                homepage: dataArray[0].urls[0].url,
                comics: dataArray[0].comics.items
            }

            return character;
        }

        if (dataArray.length > 1) {
            const charactersCollection = [];

            dataArray.forEach(item => {
                let desc = null;

                if (item.description === "") {
                    desc = "No description for this character found...";
                } else {
                    desc = item.description;
                }
    
                if (desc.length > 210) {
                    desc = desc.slice(0, 210) + "...";
                }

                charactersCollection.push({
                    id: item.id,
                    name: item.name,
                    description: desc,
                    thumbnail: item.thumbnail.path + "." + item.thumbnail.extension,
                    wiki: item.urls[1].url,
                    homepage: item.urls[0].url
                });
            });

            return charactersCollection;
        }
    }

    const getComicsByOffset = async (offset = 0) => {
        const result = await request(`${_apiBaseUrl}comics?limit=8&offset=${offset}&${_apiKey}`);

        return await result.data.results;
    }

    const getCharactersByOffset = async (offset = _defaultOffset) => {
        const result = await request(`${_apiBaseUrl}characters?limit=9&offset=${offset}&${_apiKey}`);

        return _filterData(result);
    }

    const getCharacterById = async (id) => {
        const result = await request(`${_apiBaseUrl}characters/${id}?${_apiKey}`);

        return _filterData(result);
    }

    return {loading, error, getCharacterById, getCharactersByOffset, clearError, getComicsByOffset}
}

export default useMarvelServices;
