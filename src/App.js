import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from 'react-router-dom';
import Router from './routes/index.js'
import {ToastContainer} from 'react-toastify';
import Header from './components/Header'
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000}/>
      <Header/>
      <Router/>
    </BrowserRouter>
  );
}

export default App;