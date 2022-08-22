import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/home/Home'
import LandingPage from './components/landingPage/LandingPage'
import Details from './components/detail/Details'
import SignIn from './components/SignIn/SignIn';
import navBarEdit from './components/navBar/NavBar.jsx';
import FormProfessionals from './components/formProfessionals/FormProfesionals';
import FormPatients from './components/formPatients/FormPatients';
import healthData from './components/healthData/healthData';
import Login from './components/Login/Login';
import About from './components/about/About';
import Price from './components/Price/Price';
<<<<<<< HEAD
import Google from './components/google/Google';
import FormUpProfessionals from './components/formUpProfessionals/FormUpProfessionals';

=======
import Professionals from './components/professionals/Professionals';
>>>>>>> e9f85b96b840a0de8f84c240616299a0b29d0eee

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
<<<<<<< HEAD
          <Route path='/google' component={Google}/>
          <Route path='/formupprofessional' component={FormUpProfessionals}/>
=======
          <Route path='/professionals' component={Professionals}/>
>>>>>>> e9f85b96b840a0de8f84c240616299a0b29d0eee
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
