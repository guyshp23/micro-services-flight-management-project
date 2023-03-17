import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import './App.css';
import Navbar from './components/Navbar';
import { Helmet } from "react-helmet";
import Footer from './components/footer';
import TeapotPage from './pages/TeapotPage';


function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState("Jesse Hall");
  const Context         = createContext('user')

  return (
    <>
    <Helmet>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/datepicker.min.js"></script>
    </Helmet>
    <Router>
      
    <Context.Provider value={user}>
    <Navbar />
      <Routes>
        <Route path="/"         element={HomePage()} />
        <Route path="/login"    element={LoginPage()} />
        <Route path="/register" element={RegisterPage()} />
        <Route path="/teapot"   element={TeapotPage()} />
      </Routes>
      <Footer />
      </Context.Provider>
    </Router>
    </>
  );
}

export default App;
