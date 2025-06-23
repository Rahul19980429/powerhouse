import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './pages/NavBar';
import Home from './pages/Home';
import AddNewClient from './pages/AddNewClient';
import React from 'react'
import GymPlan from './pages/GymPlan';
import State from './context/State';
import LogIn from './pages/LogIn';
import SubscriptedClient from './pages/SubscriptedClients';
import CreateUser from './pages/CreateUser';
import CreateGymPlan from './pages/CreateGymPlan';
import VerifyUser from './pages/VerifyUser';



function App() {

  return (
    < >
      <State>

        <BrowserRouter>
          <div className='setBg'>
            {/* this is navBar  */}
            <NavBar />

            <Routes>
              {/* this is Home page router */}
              <Route exact path="/" element={<Home />} />
              {/* this is about page router */}
              {/* this is subscripted Clients page router */}
              <Route exact path="/subscriptedClient" element={<SubscriptedClient />} />
              {/* this is login page router */}
              <Route exact path="/login" element={<LogIn />} />
              {/* this is addnew page router */}
              <Route exact path="/addnew" element={<AddNewClient />} />
              {/* this is gym plan display page router */}
              <Route exact path="/addnew/plan/:id" element={<GymPlan />} />
              {/* this is create user page router */}
              <Route exact path="/addnewUser" element={<CreateUser />} />
              {/* this is create gym plan page router */}
              <Route exact path="/createGymPlan" element={<CreateGymPlan />} />
              {/* this is user setting page router */}
              <Route exact path="/setting" element={<VerifyUser/>} />
              

              {/* default */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            {/* <Footer/> */}
          </div>
        </BrowserRouter>
      </State>

    </>

  );
}

export default App;
