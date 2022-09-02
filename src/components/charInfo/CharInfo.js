import {useState, useEffect} from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
    const [skeleton, setSkeleton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [wiki, setWiki] = useState(null);
    const [homepage, setHomepage] = useState(null);
    const [comics, setComics] = useState(null);
    const [error, setError] = useState(false);
    const marvelServices = new MarvelServices();

    // Component hooks


    // Getting character
    const getCharacter = (id) => {
        if (!error) {
            setLoading(true);
            setSkeleton(false);
        }
        
        marvelServices
            .getCharacterById(id)
            .then((character) => {
                setName(character.name);
                setDescription(character.description);
                setThumbnail(character.thumbnail);
                setWiki(character.wiki);
                setHomepage(character.homepage);
                setComics(character.comics);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
            });
    }

    useEffect(() => {
        if (props.selectedCharacter) {
            getCharacter(props.selectedCharacter);
        }
    }, [props.selectedCharacter]);

    let objectFitClass = null;
    thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? objectFitClass = 'contain' : objectFitClass = 'cover';
    
    return (
        <div className="char__info">
            {skeleton ? <Skeleton/> : null}
            {loading ? <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}><Spinner/></div> : null}

            {
                !skeleton && !loading ?
                    <>
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
                    </> : null
            }
            <ul className="char__comics-list">
                {
                    !loading && !skeleton && !error ?
                        comics.map((item, index) => {
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