import { useState, useEffect } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);

    const {loading, error, getComicsByOffset} = useMarvelServices();

    useEffect(() => {
        loadComics();
    }, []);

    const loadComics = () => {
        getComicsByOffset(offset)
            .then((comicsResponse) => setComicsList([...comicsList, ...comicsResponse]));
        
        setOffset(offset => offset + 8);
    }

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {
                 comicsList.map((item, i) => {
                    const image = item.thumbnail.path + "." + item.thumbnail.extension;

                    return(
                        <li 
                            key={i}
                            className="comics__item">
                            <a href={item.urls[0].url}>
                                <img src={image} alt="x-men" className="comics__item-img"/>
                                <div className="comics__item-name">{item.title}</div>
                                <div className="comics__item-price">{item.prices[0].price > 0 ? item.prices[0].price + "$" : "NOT AVAILABLE"}</div>
                            </a>
                        </li>
                    )
                 })
                 
                }
                {loading ? <div style={{display: 'flex', width: '1100px', justifyContent: 'center'}}><Spinner/></div> : null}
                {error ? <div style={{display: 'flex', width: '1100px', justifyContent: 'center'}}><ErrorMessage/></div> : null}
            </ul>
            <button
                onClick={loadComics} 
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;