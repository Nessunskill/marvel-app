class MarvelServices {
    _apiKey = "apikey=9205f98dfd44cad09017673377d0493d";
    _apiBaseUrl = "https://gateway.marvel.com:443/v1/public/";
    _defaultOffset = 210;

    _filterData = (data) => {
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

    getCharactersByOffset = async (offset = this._defaultOffset) => {
        const result = await this.getData(`${this._apiBaseUrl}characters?limit=9&offset=${offset}&${this._apiKey}`);

        return this._filterData(result);
    }

    getCharacterById = async (id) => {
        const result = await this.getData(`${this._apiBaseUrl}characters/${id}?${this._apiKey}`);

        return this._filterData(result);
    }

    getData = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Error when fetch... Status: ${result.status}`);
        }

        return await result.json();
    }
}

export default MarvelServices;
