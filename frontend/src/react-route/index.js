import { BrowserRouter, Route, Routes } from "react-router-dom"

import CreateComponent from "../modules/create";
import App from "../testsourcehoc/App"

function ReactRoute(props){
    return(
        <BrowserRouter>
            <Routes>
                <Route extract path="/create" element={<CreateComponent />} />
                <Route extract path="/hoc" element={<App />} />
            </Routes>
        </BrowserRouter>
    );
}
export default ReactRoute;