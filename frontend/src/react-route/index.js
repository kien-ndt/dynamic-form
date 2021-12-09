import { BrowserRouter, Route, Routes } from "react-router-dom"

import CreateComponent from "../modules/create";

function ReactRoute(props){
    return(
        <BrowserRouter>
            <Routes>
                <Route extract path="/create" element={<CreateComponent />} />
            </Routes>
        </BrowserRouter>
    );
}
export default ReactRoute;