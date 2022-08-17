import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/home/Home'
import LandingPage from './components/landingPage/LandingPage'
import Details from './components/detail/Details'
import Login from './Login/Login';
import SignIn from './components/SignIn/SignIn';
import navBarEdit from './components/navBar/NavBar';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" component={navBarEdit}/>
        <Switch>
          <Route exact  path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path='/details/:id' component={Details}/>
          <Route path='/login' component={Login}/>
          <Route path='/signin' component={SignIn}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
