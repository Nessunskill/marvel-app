import { Component } from 'react/cjs/react.production.min';

import React from 'react';
import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {
    //characterRef = React.createRef();

    state = {
        characters: [],
        loading: true,
        error: false,
        offset: 210,
        loadingMore: false
    }

    marvelServices = new MarvelServices();

    // Component hooks
    componentDidMount() {
        this.getCharacters(this.setState.offset);
        this.setState({offset: this.state.offset + 9});
    }

    // Error
    onError = () => {
        this.setState({error: true, loading: false, loadingMore: false});
    }

    // Load more characters
    onLoadMoreCharacters = () => {
        this.setState({loadingMore: true});

        this.marvelServices
            .getCharactersByOffset(this.state.offset)
            .then((characters) => {
                this.setState(() => {
                    return {
                        characters: [...this.state.characters, ...characters],
                        loadingMore: false
                    } 
                });
            })
            .catch(this.onError);
            this.setState({offset: this.state.offset + 9});

    }

    // Loading characters
    onCharactersLoaded = (characters) => {
        this.setState(() => {
            return {
                characters: characters,
                loading: false,
                error: false
            }
        });
    }

    // Getting characters
    getCharacters = (offset) => {
        this.setState({loading: true});
    
        this.marvelServices
            .getCharactersByOffset(offset)
            .then(this.onCharactersLoaded)
            .catch(this.onError);
    }

    // Focus character
    onFocusCharacter = (i) => {
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
    }

    // Refs
    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();

        console.log(this.itemRefs[id]);
    }

    render() {
        const {characters, loading, error, loadingMore} = this.state;

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
                                    onKeyPress={(e) => {
                                        if (e.key === ' ' | e.key === "Enter") {
                                            this.props.onCharacterSelect(item.id);
                                            this.focusOnItem(i);
                                        }
                                    }}
                                    tabIndex={0}
                                    //className="char__item_selected"
                                    ref={this.setRef}
                                    className={item.focused ? "char__item char__item_selected" : "char__item"}
                                    key={i}
                                    onClick={() => {this.props.onCharacterSelect(item.id); this.onFocusCharacter(i); this.focusOnItem(i)}}>
                                    <img ref={this.characterRef} src={item.thumbnail} alt="abyss" style={{objectFit: objectFitClass}}/>
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
                        onClick={this.onLoadMoreCharacters}
                        style={error ? {display: 'none'} : {display: 'block'}}
                        className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
