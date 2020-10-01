import React, { Fragment } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserState from "./context/user/UserState";
import AlertState from "./context/alert/AlertState";


const App = () => {
  return (
    <UserState>
      <AlertState>
        <Fragment>
          <Navbar />
          <div className="container">
            <Home />
          </div>
        </Fragment>
      </AlertState>
    </UserState>
  );
};

export default App;
