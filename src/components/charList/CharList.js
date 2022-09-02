import {useState, useEffect, useRef} from 'react';

import React from 'react';
import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {
    //characterRef = React.createRef();

    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(210);
    const [loadingMore, setLoadingMore] = useState(false);

    const marvelServices = new MarvelServices();

    useEffect(() => {
        getCharacters(offset);
        setOffset(offset => offset + 9);
    }, []);

    // Error
    const onError = () => {
        setError(true);
        setLoading(false);
        setLoadingMore(false);
    }

    // Load more characters
    const onLoadMoreCharacters = () => {
        setLoadingMore(true);

        marvelServices
            .getCharactersByOffset(offset)
            .then((charactersResponse) => {
                setCharacters([...characters, ...charactersResponse]);
                setLoadingMore(false);
            })
            .catch(onError);
            setOffset(offset => offset + 9);
    }

    // Loading characters
    const onCharactersLoaded = (charactersResponse) => {
        setCharacters(charactersResponse);
        setLoading(false);
        setError(false);
    }

    // Getting characters
    const getCharacters = (offset) => {
        setLoading(true);
    
        marvelServices
            .getCharactersByOffset(offset)
            .then(onCharactersLoaded)
            .catch(onError);
    }

    // Focus character
    // const onFocusCharacter = (i) => {
        // this.setState(({characters}) => {
        //     const newCharacters = characters.map((item, index) => {
        //         if (index !== i) {
        //             item.focused = false;
        //             return item;
        //         };

        //         item.focused = true;
        //         return item;
        //     });

        //     return {
        //         characters: newCharacters
        //     }
        // });
    // }

    // Refs
    const itemRefs = [];

    const setRef = (ref) => {
        itemRefs.push(ref);
    }

    const focusOnItem = (id) => {
        itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs[id].classList.add('char__item_selected');
        itemRefs[id].focus();
    }

    return (
        <div className="char__list">
            <ul className="char__grid">

                {loading && !error ? <div style={{display: 'flex', width: '324%', justifyContent: 'center'}}><Spinner/></div> : null}
                {error && !loading ? <div style={{display: 'flex', width: '324%', justifyContent: 'center'}}><ErrorMessage/></div> : null}

                {
                    !loading && !error ?
                    characters.map((item, i) => {
                        let objectFitClass = null;
                        item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? objectFitClass = 'contain' : objectFitClass = 'cover';
                
                        return (
                            <li 
                                // onKeyPress={(e) => {
                                //     if (e.key === ' ' | e.key === "Enter") {
                                //         this.props.onCharacterSelect(item.id);
                                //         this.focusOnItem(i);
                                //     }
                                // }}
                                tabIndex={0}
                                //className="char__item_selected"
                                 ref={setRef}
                                className={item.focused ? "char__item char__item_selected" : "char__item"}
                                key={i}
                                // onClick={() => {this.props.onCharacterSelect(item.id); this.onFocusCharacter(i); this.focusOnItem(i)}}>
                                onClick={() => {props.onCharacterSelect(item.id); focusOnItem(i)}}>
                                {/* <img ref={this.characterRef} src={item.thumbnail} alt="abyss" style={{objectFit: objectFitClass}}/> */}
                                <img src={item.thumbnail} alt="abyss" style={{objectFit: objectFitClass}}/>
                                <div className="char__name">{item.name}</div>
                            </li>
                        );
                    }) : null
                }

                {
                    loadingMore ? <div style={{display: 'flex', width: '324%', justifyContent: 'center'}}><Spinner/></div> : null
                }
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
