import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';

import Navbar from './components/Navbar';

import navbar_buttons from './data/NavbarButtons.json';
import home_sections from './data/HomeSections.json'
import Footer from './components/Footer';
import Home from './components/Home';

import './styles/App.css';
import './styles/text.css'


function App() {
return (
    <Router>
        <div className="App">
            <Navbar navbar_buttons = {navbar_buttons}/>
            <Home sections={home_sections}/>
            <Footer />
        </div>
    </Router>
  );
}

export default App;