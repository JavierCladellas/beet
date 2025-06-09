import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';

import Navbar from './components/Navbar';

import navbar_buttons from './data/NavbarButtons.json';
import Footer from './components/Footer';

function App() {
return (
    <Router>
        <div className="App">
            <Navbar navbar_buttons = {navbar_buttons}/>
            <Footer />
        </div>
    </Router>
  );
}

export default App;