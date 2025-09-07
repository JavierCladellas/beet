import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Mosaic from 'react-loading-indicators/Mosaic';

import navbar_buttons from './data/NavbarButtons.json';

import './styles/App.css';
import './styles/Text.css';
import './styles/Button.css';
import './styles/Page.css';

import Products from './pages/products/Products';
import Inventory from './pages/inventory/Inventory';
import Navbar from './components/Navbar';
import Users from './pages/users/Users';
import Login from './pages/Login';
import Orders from './pages/orders/Orders';

const apiUrl = process.env.REACT_APP_BEET_API_URL;


const ProtectedRoute = ({ role, allowedRoles, children }) => {
    if (!allowedRoles.includes(role)) {
        return <div>Access Denied</div>;
    }
    return children;
}




function App() {
    const [login, setLogin] = useState(false);
    const [loading, setloading] = useState(true);
    const [userRole, setUserRole] = useState(null);


    useEffect(() => {
        async function checkLogin() {
            try {
                const response = await fetch(apiUrl + "token", {
                    method: 'GET',
                    credentials: "include",
                    withCredentials: true,
                    headers:{
                    }
                });
                if (response.status === 200){
                    const data = await response.json();
                    setLogin(true);
                    setUserRole(data.role);
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
    }, [login, userRole]);


    const [navbarButtons, setNavbarButtons] = useState([]);

    useEffect(() => {
        const filteredNavbarButtons = navbar_buttons.filter(button => {
            if (!button.roles) return true;  // no restriction if roles not specified
            return button.roles.includes(userRole);
        });
        setNavbarButtons(filteredNavbarButtons);
    }, [userRole]);

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
                <Navbar navbar_buttons = {navbarButtons} />
                <Routes>
                    <Route exact path="/" element = { <Products /> } />
                    <Route exact path="/Inventory" element = { <Inventory /> } />
                    <Route exact path="/users" element = {
                        <ProtectedRoute role={userRole} allowedRoles={["admin", "superadmin"]}>
                            <Users userRole = {userRole}/>
                        </ProtectedRoute>
                    } />
                    <Route exact path="/orders" element = { <Orders userRole = {userRole} /> } />
                </Routes>
            </div>
            </HashRouter>
        )
    }
}

export default App;
