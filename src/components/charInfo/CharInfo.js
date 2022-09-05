import {useState, useEffect} from 'react';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
    const [skeleton, setSkeleton] = useState(true);
    const [character, setCharacters] = useState(null);

    const {loading, error, getCharacterById} = useMarvelServices();

    // Getting character
    const getCharacter = (id) => {
        if (!error) {
            setSkeleton(false);
        }
        
        getCharacterById(id)
            .then((character) => {
                setCharacters(character);
            });
    }

    useEffect(() => {
        if (props.selectedCharacter) {
            getCharacter(props.selectedCharacter);
        }
    }, [props.selectedCharacter]);
 
    const renderCharacterInfo = character => {
        const {thumbnail, name, homepage, wiki, description, comics} = character;

        let objectFitClass = null;
        thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? objectFitClass = 'contain' : objectFitClass = 'cover';
       
        return <>
            <div className="char__basics">
            <img src={thumbnail} alt={name} style={{objectFit: objectFitClass}}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">{comics.length > 0 ? "Comics:" : "No comics found for this character"}</div>
        </>
    }

    return (
        <div className="char__info">
            {skeleton ? <Skeleton/> : null}
            {loading ? <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}><Spinner/></div> : null}
        
            {
                 !skeleton && !loading && character ? renderCharacterInfo(character) : null
            } 
            <ul className="char__comics-list">
                {
                    !loading && !skeleton && character ?
                        character.comics.map((item, index) => {
                            if (index > 9) return;

                            return(
                                <li 
                                    key={index}
                                    className="char__comics-item">
                                    {item.name}
                                </li>                                    
                            );
                        }) 
                    : null
                }
            </ul>
        </div>
    );
}

export default CharInfo;