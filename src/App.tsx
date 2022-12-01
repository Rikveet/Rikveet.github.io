import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import SignUp from "./routes/SignUp/SignUp";
import UserPage from "./routes/UserPage/UserPage";
import UserDisplay from "./routes/UserDisplay/UserDisplay";
import Portfolios from "./routes/Portfolios/Portfolios";

function App() {
    return (
        <div>
            <Routes>
                <Route path={''} element={<Home/>}/>
                <Route path={'login'} element={<Login/>}/>
                <Route path={'signup'} element={<SignUp/>}/>
                <Route path={'user'} element={<UserPage/>}/>
                <Route path={'portfolios'} element={<Portfolios/>}/>
                <Route path={'portfolios/:id'} element={<UserDisplay/>}/>
            </Routes>
        </div>


    );
}

export default App;
