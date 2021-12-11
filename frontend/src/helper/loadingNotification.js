import CircularProgress from '@mui/material/CircularProgress';
import ReactDOM from 'react-dom';
function showLoadingNotification(){    
    document.getElementById('notification').style.display = "flex";
    document.getElementById('notification').style.opacity = "0.5";
    document.getElementById('notification').style.alignItems = "center";
    document.getElementById('notification').style.justifyContent = "center";
    ReactDOM.render(      
        <CircularProgress color="secondary" fontSize="large" size={100}/>
    ,
    document.getElementById('notification')
    );
}
function hideLoadingNotification(){
    document.getElementById('notification').style.display = "none";
    ReactDOM.unmountComponentAtNode(document.getElementById('notification'))
}
export {showLoadingNotification, hideLoadingNotification}