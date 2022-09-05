import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/home/Home'
import LandingPage from './components/landingPage/LandingPage'
import Details from './components/detail/Details'
import SignIn from './components/signIn/SignIn';
import NavBarEdit from './components/navBar/NavBar.jsx';
import FormProfessionals from './components/formProfessionals/FormProfesionals';
import FormPatients from './components/formPatients/FormPatients';
import HealthData from './components/healthData/HealthData.jsx';
import Login from './components/login/Login';
import About from './components/about/About';
import Price from './components/price/Price';
import Professionals from './components/professionals/Professionals';
import FormUpProfessionals from './components/formUpProfessionals/FormUpProfessionals';
import ClinicHistory from './components/clinicHistory/ClinicHistory';
import Auth0 from './components/auth0/Auth0';
import HomeProfessional from './components/homeProfessionals/HomeProfessionals';
import Calendar from '../src/components/calendar/Calendar.jsx'
import HomePatients from './components/homePatients/HomePatients';
import UserProfile from './components/userProfile/UserProfile';
import Sidebar from './components/admin/Admin'
import DetailsPatients from "./components/detailPatAdmin/DetailPatAdmin";
import DetailsDrAdmin from "./components/detailProfAdmin/DetailProfAdmin";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/" component={NavBarEdit} />
      </Switch>
      <Switch>
        <Route path="/admin" component={Sidebar} />
        <Route path="/detailPatAdmin/:id" component={DetailsPatients}/>
        <Route path="/detailProfAdmin/:id" component={DetailsDrAdmin}/>
        <Route path="/home" component={Home} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/details/:id" component={Details} />
        <Route path="/login" component={Login} />
        <Route path="/signin" component={SignIn} />
        <Route path="/formprofessionals" component={FormProfessionals} />
        <Route path="/formpatients" component={FormPatients} />
        <Route path="/healthData" component={HealthData} />
        <Route path="/professionals" component={Professionals} />
        <Route path="/about" component={About} />
        <Route path="/price" component={Price} />
        <Route path="/form" component={FormUpProfessionals} />
        {/* <Route path='/google' component={Google}/> */}
        <Route path="/clinic_history" component={ClinicHistory} />
        <Route path="/homeUsuarioPrueba" component={HomeProfessional} />
        <Route path="/userProfile" component={UserProfile} />
        <Route path="/professionals" component={Professionals} />
        <Route path="/auth0" component={Auth0} />
        <Route path="/homepatients" component={HomePatients} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
