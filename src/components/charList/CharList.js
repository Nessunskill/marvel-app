import {useState, useEffect, useRef} from 'react';

import React from 'react';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {
    const {loading, error, getCharactersByOffset} = useMarvelServices();

    const [characters, setCharacters] = useState([]);
    const [offset, setOffset] = useState(210);

    useEffect(() => {
        getCharacters(offset);
        setOffset(offset => offset + 9);
    }, []);

    // Load more characters
    const onLoadMoreCharacters = () => {

        getCharactersByOffset(offset)
            .then((charactersResponse) => {
                setCharacters([...characters, ...charactersResponse]);
            });

            setOffset(offset => offset + 9);
    }

    // Loading characters
    const onCharactersLoaded = (charactersResponse) => {
        setCharacters(charactersResponse);
    }

    // Getting characters
    const getCharacters = (offset) => {
        getCharactersByOffset(offset)
            .then(onCharactersLoaded);
    }

    // Refs
    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItems = (characters) => {
        return characters.map((item, i) => {
            let objectFitClass = null;
            item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? objectFitClass = 'contain' : objectFitClass = 'cover';
    
            return (
                <li 
                    onKeyPress={(e) => {
                        e.preventDefault();
                        if (e.key === ' ' | e.key === "Enter") {
                            props.onCharacterSelect(item.id);
                            focusOnItem(i);
                        }
                    }}
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    className="char__item"
                    key={i}
                    onClick={(e) => {props.onCharacterSelect(item.id); focusOnItem(i)}}>
                    <img src={item.thumbnail} alt={item.name} style={{objectFit: objectFitClass}}/>
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
    }
    //1430
    const content = renderItems(characters);

    return (
        <div className="char__list">
            <ul className="char__grid">

                {content}

                {loading && !error ? <div style={{display: 'flex', width: '324%', justifyContent: 'center'}}><Spinner/></div> : null}
                {error && !loading ? <div style={{display: 'flex', width: '324%', justifyContent: 'center'}}><ErrorMessage/></div> : null}

            </ul>
            <button 
                    onClick={onLoadMoreCharacters}
                    style={error ? {display: 'none'} : {display: 'block'}}
                    className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

export default CharList;
