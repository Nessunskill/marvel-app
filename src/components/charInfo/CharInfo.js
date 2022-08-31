import { Component } from 'react/cjs/react.production.min';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        skeleton: true,
        loading: false
    }

    marvelServices = new MarvelServices();

    // Component hooks
    componentDidUpdate = (prevProps) => {
        if (prevProps.selectedCharacter !== this.props.selectedCharacter) {
            this.getCharacter(this.props.selectedCharacter);
        }
    }

    // Getting character
    getCharacter = (id) => {
        this.setState({loading: true, skeleton: false});
        
        this.marvelServices
            .getCharacterById(id)
            .then((character) => {
                this.setState(() => {                  
                    return {
                        name: character.name,
                        description: character.description,
                        thumbnail: character.thumbnail,
                        wiki: character.wiki,
                        homepage: character.homepage,
                        comics: character.comics,
                        loading: false
                    }
                });
            });
    }

    render() {
        const {name, description, wiki, homepage, thumbnail, comics, skeleton, loading} = this.state;

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
                        !loading && !skeleton ?
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
}

export default CharInfo;