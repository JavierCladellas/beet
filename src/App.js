import { HashRouter, Routes, Route } from 'react-router-dom';

import navbar_buttons from './data/NavbarButtons.json';

import './styles/App.css';
import './styles/Text.css';

import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Navbar from './components/Navbar';
import Users from './pages/Users';

function App() {
return (
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
);
}

export default App;
