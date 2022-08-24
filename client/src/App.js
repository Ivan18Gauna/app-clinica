import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/home/Home'
import LandingPage from './components/landingPage/LandingPage'
import Details from './components/detail/Details'
import SignIn from './components/signIn/SignIn';
import navBarEdit from './components/navBar/NavBar.jsx';
import FormProfessionals from './components/formProfessionals/FormProfesionals';
import FormPatients from './components/formPatients/FormPatients';
import healthData from './components/healthData/healthData.jsx';
import Login from './components/login/Login';
import About from './components/about/About';
import Price from './components/price/Price';
import Professionals from './components/professionals/Professionals';
import FormUpProfessionals from './components/formUpProfessionals/FormUpProfessionals';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact  path="/" component={LandingPage} />
          <Route path="/" component={navBarEdit}/>
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
       {/*    <Route path='/google' component={Google}/> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
