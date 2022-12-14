import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage, NoMatch, SingleComicPage, FavoriteCharacters} from '../pages';

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}></Route>

                        <Route path="/comics" element={<ComicsPage/>}></Route>

                        <Route path="/comics/:comicId" element={<SingleComicPage/>}></Route>

                        <Route path="/favorite" element={<FavoriteCharacters/>}></Route>

                        <Route path='*' element={<NoMatch/>}></Route>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;