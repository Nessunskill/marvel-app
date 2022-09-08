import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBanner from "../appBanner/AppBanner"

const FavoriteCharacters = () => {
    const [chars, setChars] = useState([]);
    const charsArray = [];

    useEffect(() => {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            charsArray.push(JSON.parse(localStorage.getItem(key)));
        }

        setChars([...charsArray]);
    }, []);

    return(
        <>
            <AppBanner/>

            <Link
                style={{margin: "25px 0px 25px 0px", width: "100%", textAlign: "right"}} 
                to="/" 
                className="single-comic__back">
                Back to Main Page</Link>

            <div className="char__list">
            <ul className="char__grid"
            style={{gridTemplateColumns: "repeat(5, 200px)"}}>

            {
                chars.map((char, i) => {
                    let objectFitClass = null;
                    char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? objectFitClass = 'contain' : objectFitClass = 'cover';
                
                    return (
                            <li 
                                tabIndex={0}
                                key={i}
                                className="char__item">
                                <img 
                                    src={char.thumbnail} 
                                    alt={char.name}
                                    style={{objectFit: objectFitClass}}/>
                                <div className="char__name">{char.name}</div>
                            </li>            
                    )
                })
            }

            </ul>
            {/* <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button> */}
        </div>

        </>
    );
}

export default FavoriteCharacters;