import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import './App.css';
import Navbar from './components/Navbar';
import { Helmet } from "react-helmet";


function App() {
  return (
    <>
    <Helmet>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/datepicker.min.js"></script>
    </Helmet>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/"         element={HomePage()} />
        <Route path="/login"    element={LoginPage()} />
        <Route path="/register" element={RegisterPage()} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
