import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';

import Navbar from './components/Navbar';

import navbar_buttons from './data/NavbarButtons.json';
import home_sections from './data/HomeSections.json'
import personaliza_sections from './data/PersonalizaSections.json'
import corporate_sections from './data/CorporateSections.json'
import about_sections from './data/AboutSections.json'
import Footer from './components/Footer';
import Home from './pages/Home';
import Personaliza from './pages/Personaliza';
import Corporate from './pages/Corporate';
import About from './pages/About';

import './styles/App.css';
import './styles/text.css'


function App() {
return (
    <Router>
        <div className="App">
            <Navbar navbar_buttons = {navbar_buttons}/>
            <Route exact path="/">
                <Home sections={home_sections}/>
            </Route>
            <Route exact path="/personaliza">
                <Personaliza sections={personaliza_sections}/>
            </Route>
            <Route exact path="/corporate-gifting">
                <Corporate sections={corporate_sections}/>
            </Route>
            <Route exact path="/about">
                <About sections={about_sections}/>
            </Route>
            <Footer />
        </div>
    </Router>
  );
}

export default App;