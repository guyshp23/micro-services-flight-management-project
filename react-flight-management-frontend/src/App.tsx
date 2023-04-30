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
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { ApplicationStore } from "./state";
import GetAllAirports from './pages/api/airports/GetAll';
import AboutPage from './pages/AboutPage';
import MyFlights from './pages/MyFlights';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import BookFlight from './pages/flights/BookFlight';

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

  // TODO: Maybe put this one inside each page inside the useEffect hook?
  //       Figure where to put it
  //
  // function AdminAccessibleRoute(children: any) {
  // const userState = useStoreState((state: ApplicationStore) => state!.user);

  //   function isAccessible() {
  //     if (userState.data){
  //       if (userState.data.isAdmin){
  //         return true;
  //       }
  //     }
  //     return false;
  //   }

  //   return(
  //     <>
  //       {isAccessible() ? children : <TeapotPage />}
  //     </>
  //   )

  // }

  return (
    <>
      <Helmet>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/datepicker.min.js"></script>
      </Helmet>


      <Router>
        <Navbar />
          <Routes>
            <Route path="/"                       element={HomePage()}      />
            <Route path="/flights/:pk/book" element={<BookFlight />}    />

            
            <Route path="/about"                  element={AboutPage()}     />
            <Route path="/myflights"              element={MyFlights()}     />

            <Route path="/login"                  element={LoginPage()}     />
            <Route path="/register"               element={RegisterPage()}  />

            <Route path="/admin"                  element={AdminHomePage()} />
            <Route path="/admin/customers"        element={AdminCustomersPage()} />


            <Route path="/teapot"                 element={TeapotPage()}    />
          </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
