import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

const NoMatch = () => {
    return(
        <>
            <div style={{width: '500px', margin: '0 auto', textAlign: 'center'}}>
              <ErrorMessage/>
              <h1>404 Not found</h1>
              <h2 style={{color: '#9f0013'}}><Link to="/">Back to main page</Link></h2>
            </div>
        </>
    );
}

export default NoMatch;