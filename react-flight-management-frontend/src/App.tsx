import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import './App.css';
import Navbar from './components/Navbar';
import { Helmet } from "react-helmet";
import Footer from './components/footer';
import TeapotPage from './pages/TeapotPage';
import getUserDetails from './pages/api/auth/getUserDetails';
import { Actions, useStoreActions } from 'easy-peasy';
import { ApplicationStore } from "./state";
import GetAllAirports from './pages/api/airports/GetAll';
import AboutPage from './pages/AboutPage';

function App() {
  const updateUserData      = useStoreActions((actions: Actions<ApplicationStore>) => actions.user.updateUserData);
  const setAirportsListData = useStoreActions((actions: Actions<ApplicationStore>) => actions.airports.setAirports);

  useEffect(() => {
    // If there is a refresh token in local storage,
    // then we can assume the user is logged in.
    // Get the user details and save them in the redux store.
    if (localStorage.getItem("refresh_token")) {
      console.debug('refresh token found, getting user details...')


      getUserDetails().then((r) => {
        console.debug('User details response:', r);
        updateUserData(r);
      })
    }
  }, [updateUserData])

  
  useEffect(() => {
    console.debug('allAirportsList:');
    GetAllAirports().then((r) => {
      console.debug('Get all airports response:', r);
      setAirportsListData(r);
    })

  }, [setAirportsListData])

  return (
    <>
      <Helmet>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/datepicker.min.js"></script>
      </Helmet>

        
      <Router>
        <Navbar />
          <Routes>
            <Route path="/"         element={HomePage()}     />
            <Route path="/about"    element={AboutPage()}     />
            <Route path="/login"    element={LoginPage()}    />
            <Route path="/register" element={RegisterPage()} />
            <Route path="/teapot"   element={TeapotPage()}   />
          </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
