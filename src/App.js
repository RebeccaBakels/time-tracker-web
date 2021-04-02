import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { firebaseConfig } from "./config";

import Welcome from "./scenes/Welcome";
import Login from "./scenes/Login";
import Signup from "./scenes/Signup";
import NavBar from "./scenes/NavBar";

firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebase.auth();
export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser, firebaseAuth }}>
      <div className="App">
        <Router>
          <NavBar />
          <Container fluid="sm">
            <Switch>
              <Route path="/LogIn" component={Login} />
              <Route path="/SignUp" component={Signup} />
              <Route path="/" component={Welcome} />
            </Switch>
          </Container>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
