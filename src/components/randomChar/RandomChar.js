import {useState, useEffect} from 'react';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [character, setCharacters] = useState({});

    const {loading, error, getCharacterById} = useMarvelServices();

    // Component Hooks
    useEffect(() => {
        getCharacter(1011937);
    }, []);

    // Loading character
    const onCharacterLoad = (character) => {
        setCharacters(character);
    }

    // Getting character
    const getCharacter = (id) => {
          getCharacterById(id)
            .then(onCharacterLoad);
    }

    // Getting another character
    const onAnotherCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id);
    }

    return (
        <div className="randomchar">
            {loading && !error ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner/></div> : null}
            {error && !loading ? <ErrorMessage/> : null}
            {!loading && !error ? <CharacterBlock character={character}/> : null}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button 
                        onClick={onAnotherCharacter} 
                        className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const CharacterBlock = (character) => {
    const {character: {name, description, thumbnail, wiki, homepage}} = character;

    let objectFitClass = null;
    thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? objectFitClass = 'contain' : objectFitClass = 'cover';

    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={{objectFit: objectFitClass}}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;