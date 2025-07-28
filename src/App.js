import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Mosaic from 'react-loading-indicators/Mosaic';

import navbar_buttons from './data/NavbarButtons.json';
import dev_env from './data/DevEnv.json';

import './styles/App.css';
import './styles/Text.css';

import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Navbar from './components/Navbar';
import Users from './pages/Users';
import Login from './pages/Login';

function App() {
    const [login, setLogin] = useState(false);
    const [loading, setloading] = useState(true);


    useEffect(() => {
        async function checkLogin() {
            try {
                const response = await fetch(dev_env.url + "token", {
                    method: 'GET',
                    credentials: "include",
                    withCredentials: true,
                    headers:{
                    }
                });
                if (response.status === 200){
                    setLogin(true);
                }
            }
            catch (error) {
                setLogin(false);
                return;
            }
            finally {
                setloading(false);
            }
        };
        checkLogin()
    }, []);


    if (loading) {
        return <div className="loading-icon-container">
            <Mosaic className="loading-icon" color="#540640" size="medium" text="BEET - ERP" textColor="" />
        </div>
    }

    if (!login) {
        return <Login setLogin={setLogin} />;
    }
    else {
        return(
            <HashRouter>
            <div className="App">
                <Navbar navbar_buttons = {navbar_buttons}/>
                <Routes>
                    <Route exact path="/" element = { <Products /> } />
                    <Route exact path="/Inventory" element = { <Inventory /> } />
                    <Route exact path="/users" element = { <Users /> } />
                </Routes>
            </div>
            </HashRouter>
        )
    }
}

export default App;
