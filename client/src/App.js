import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/home/Home'
import LandingPage from './components/landingPage/landingPage'
import Details from './components/detail/details'
import SignIn from './components/signIn/SignIn';
import NavBarEdit from './components/navBar/NavBar.jsx';
import FormProfessionals from './components/formProfessionals/FormProfesionals';
import FormPatients from './components/formPatients/FormPatients';
import healthData from './components/healthData/healthData.jsx';
import Login from './components/login/Login';
import About from './components/about/About';
import Price from './components/price/Price';
import Professionals from './components/professionals/Professionals';

import FormUpProfessionals from './components/formUpProfessionals/FormUpProfessionals';
import ClinicHistory from './components/clinicHistory/ClinicHistory';
import HomePatients from './components/homePatients/HomePatients';
import UserProfile from './components/userProfile/UserProfile';

import Auth0 from './components/auth0/Auth0';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact  path="/" component={LandingPage} />
          <Route path="/" component={NavBarEdit}/>
        </Switch>
        <Switch>
          <Route path="/form" component={FormUpProfessionals}/>
          <Route path="/home" component={Home} />
          <Route path='/details/:id' component={Details}/>
          <Route path='/login' component={Login}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/formprofessionals' component={FormProfessionals}/>
          <Route path='/formpatients' component={FormPatients}/>
          <Route path='/healthData' component={healthData}/>
          <Route path='/professionals' component={Professionals}/>
          <Route path='/about' component={About}/>
          <Route path='/price' component={Price}/>

          {/* <Route path='/google' component={Google}/> */}
          <Route path='/clinic_history' component={ClinicHistory}/>
          <Route path='/homeUsuarioPrueba' component={HomePatients}/>
          <Route path='/userProfile' component={UserProfile} />
          <Route path='/professionals' component={Professionals}/>
          <Route path='/auth0' component={Auth0}/>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
