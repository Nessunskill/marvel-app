import { Component } from 'react/cjs/react.production.min';
import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        character: {},
        loading: false,
        error: false
    }

    marvelServices = new MarvelServices();

    // Component Hooks
    componentDidMount = () => {
        this.getCharacter(1011937);
    }

    // Error
    onError = () => {
        this.setState({error: true, loading: false});
    }

    // Loading character
    onCharacterLoad = (character) => {
        this.setState(() => {
            return {
                character: character,
                loading: false,
                error: false
            }
        });
    }

    // Getting character
    getCharacter = (id) => {
        this.setState({loading: !this.state.loading})
        this.marvelServices
            .getCharacterById(id)
            .then(this.onCharacterLoad)
            .catch(this.onError);
    }

    // Getting another character
    onAnotherCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        //const id = 1011000;
        this.getCharacter(id);
    }

    render() {
        const {character, loading, error} = this.state;

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
                            onClick={this.onAnotherCharacter} 
                            className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
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