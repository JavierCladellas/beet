import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';

import Navbar from './components/Navbar';

import navbar_buttons from './data/NavbarButtons.json';

function App() {
return (
    <Router>
        <div className="App">
            <Navbar navbar_buttons = {navbar_buttons}/>
        </div>
    </Router>
  );
}

export default App;