import React from 'react';
import './App.css';
import NCSU from './images/NCSU.png';

import MainContentComponent from './components/MainContentComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AppContent = () => {

    return (
        <div className="app-container">

            <header>
                <img src={NCSU} alt="NCSU Logo"/>
                <h1>GPA Calculator</h1>
            </header>
            <Routes>
                <Route path='/' element= {<MainContentComponent /> }> </Route>
            </Routes>
        </div>
    )
    


}

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <AppContent />
         </BrowserRouter>
        
    </div>
  );
}

export default App;
