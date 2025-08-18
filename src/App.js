import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';

import navbar_buttons from './data/NavbarButtons.json';
import home_sections from './data/HomeSections.json'
import personaliza_sections from './data/PersonalizaSections.json'
import corporate_sections from './data/CorporateSections.json'
import about_sections from './data/AboutSections.json'
import coordinates from './data/Coordinates.json'

import Footer from './components/Footer';
import Home from './pages/Home';
import Personaliza from './pages/Personaliza';
import Corporate from './pages/Corporate';
import About from './pages/About';

import WhatsappButton from './components/IconButtons';

import './styles/App.css';
import './styles/text.css'
import Shop from './pages/Shop';

const apiUrl = process.env.REACT_APP_BEET_API_URL;

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0);}, [pathname]);
    return null;
};


function App() {
    const [products, setProducts ] = useState([]);

    useEffect( () => {
        fetch( apiUrl + "products", {
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then( response => response.json())
        .then( data => {
            setProducts(data);
        })
        .catch(error => {
            console.log("Could not load products : ", error);
        })
    }, [])


    return (
        <HashRouter>
            <ScrollToTop />
            <div className="App">

                <div className='logo-wrapper'>
                    <img className="navbar-logo" src="/logos/beet.webp" alt="Logo"/>
                </div>
                <Navbar navbar_buttons = {navbar_buttons}/>
                <Routes>
                    <Route exact path="/" element = { <Home sections={home_sections} products={products}/> } />
                    <Route exact path="shop" element = { <Shop products={products} />} />
                    <Route exact path="/personaliza" element = { <Personaliza sections={personaliza_sections}/> } />
                    <Route exact path="/corporate-gifting" element = { <Corporate sections={corporate_sections}/> } />
                    <Route exact path="/about" element={ <About sections={about_sections} />} />
                </Routes>
                <Footer />
            </div>
            <WhatsappButton number = {coordinates.wa_number} text = {coordinates.wa_default_text}/>
        </HashRouter>
    );
}

export default App;