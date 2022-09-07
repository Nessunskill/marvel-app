import './singleComicPage.scss';
import xMen from '../../resources/img/x-men.png';
import useMarvelServices from '../../services/MarvelServices';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SingleComicPage = () => {
    const [comic, setComic] = useState(null);
    const {comicId} = useParams();
    const {loading, error, getComicById} = useMarvelServices();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
      getComicById(comicId)
          .then(onComicLoaded);
    }

    const onComicLoaded = (comic) => {
      setComic(comic)
    }

    return (
        <>
            {loading ? <Spinner/> : null}
            {error ? <ErrorMessage/> : null}
            {comic ? <View comic={comic}/> : null}
        </>
    );
}

const View = ({comic}) => {
    const {title, description, prices, pageCount, thumbnail} = comic;

    return(
        <div className="single-comic">
            <img src={thumbnail.path + "." + thumbnail.extension} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description ? description : "Description for this comic not found..."}</p>
                <p className="single-comic__descr">{pageCount > 0 ? pageCount + " pages" : null}</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{prices[0].price > 0 ? prices[0].price + "$" : "Not Available"}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    );
}

export default SingleComicPage;