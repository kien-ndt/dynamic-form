import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import CreateComponent from "../modules/create";
import ManageTableComponent from "../modules/manage"

function ReactRoute(props){

    // const [state, useState] = useState(false)
    return(
        <BrowserRouter>
            <Routes>
                <Route extract path="/create" element={<CreateComponent />} />
                <Route extrect path="/" element={<ManageTableComponent />} />
            </Routes>
        </BrowserRouter>
    );
}
export default ReactRoute;