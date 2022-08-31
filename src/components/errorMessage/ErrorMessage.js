import error from './giphy.gif';

const ErrorMessage = () => {
    return(
        <img 
            src={error}
            alt="Error"
            style={{display: "block", width: "100%", height: "100%"}}
        />
    );
}

export default ErrorMessage;