
import { showLoadingNotification, hideLoadingNotification } from './loadingNotification';
import "react-notifications/lib/notifications.css"
import { NotificationManager } from 'react-notifications';
const axios = require('axios');

const serverUrl = "http://localhost:8080"
async function sendRequest({path, method, data, showNotificationSuccess, showNotificationFailue}) {
    showLoadingNotification();
    let options = {
        method: method,
        url: serverUrl + path,
        data: data,
            // transformResponse: [(data, status) => {
            // // transform the response
            //     hideLoadingNotification()
            //     console.log(data, status, "asjdasjdasdjkl");
            //     return data;
            // }]
        };
      
      // send the request
    return axios(options).then((response)=> {
        hideLoadingNotification();
        if (showNotificationSuccess){
            NotificationManager.success("Done", " hihihaha", 5000)
        }
        return response;
    }).catch((e) => {
        hideLoadingNotification();   
        if (showNotificationFailue){
            NotificationManager.error("Error", " hihihaha", 5000) 
        }    
    })
}
export default sendRequest;