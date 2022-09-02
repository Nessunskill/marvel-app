import {useState} from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onCharacterSelect = (id) => {
        setSelectedCharacter(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList onCharacterSelect={onCharacterSelect}/>
                    <CharInfo selectedCharacter={selectedCharacter}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    );
}

export default App;