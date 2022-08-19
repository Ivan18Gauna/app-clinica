import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/home/Home'
import LandingPage from './components/landingPage/LandingPage'
import Details from './components/detail/Details'
import SignIn from './components/SignIn/SignIn';
import navBarEdit from './components/navBar/NavBar';
import FormProfessionals from './components/formProfessionals/FormProfesionals';
import FormPatients from './components/formPatients/FormPatients';
import healthData from './components/healthData/healthData';
import Login from './components/Login/Login';
import About from './components/about/About';
import Price from './components/Price/Price';
import Professionals from './components/professionals/Professionals';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact  path="/" component={LandingPage} />
          <Route path="/" component={navBarEdit}/>
        </Switch>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path='/details/:id' component={Details}/>
          <Route path='/login' component={Login}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/formprofessionals' component={FormProfessionals}/>
          <Route path='/formpatients' component={FormPatients}/>
          <Route path='/healthData' component={healthData}/>
          <Route path='/about' component={About}/>
          <Route path='/price' component={Price}/>
          <Route path='/professionals' component={Professionals}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
