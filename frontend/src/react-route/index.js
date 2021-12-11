import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import CreateComponent from "../modules/create";
import ManageTableComponent from "../modules/manage"

import {NotificationContainer} from "react-notifications"
import "react-notifications/lib/notifications.css"
import { createBrowserHistory } from 'history';
function ReactRoute(props){

    // const [state, useState] = useState(false)
    return(
        <BrowserRouter history={createBrowserHistory}>
            <Routes>
                <Route extract path="/create" element={<React.Fragment><NotificationContainer/><CreateComponent /></React.Fragment>} />
                <Route extrect path="/" element={
                        <React.Fragment>
                            <NotificationContainer/>
                            <ManageTableComponent />
                        </React.Fragment>} 
                />
            </Routes>
        </BrowserRouter>
    );
}
export default ReactRoute;