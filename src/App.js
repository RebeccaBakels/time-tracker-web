import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import Welcome from './scenes/Welcome'
import Login from './scenes/Login'
import Signup from './scenes/Signup'
import NavBar from './scenes/NavBar'



function App() {
  return (
    
    <div className="App">
      <Router>
      <NavBar />
      <Container fluid="sm" >
      <Switch>
            <Route path="/LogIn" component={Login}/>
            <Route path="/SignUp" component={Signup}/>
            <Route path="/" component={Welcome}/>
        </Switch>
      </Container>
      </Router>
    </div>
    
  )
}

export default App
