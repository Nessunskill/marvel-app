import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onCharacterSelect = (id) => {
        setSelectedCharacter(id);
    }
    
    return(
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList onCharacterSelect={onCharacterSelect}/>
                <CharInfo selectedCharacter={selectedCharacter}/>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    );
}

export default MainPage;