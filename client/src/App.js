import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home/Home'
import LandingPage from './components/LandingPage/LandingPage'
import Details from './components/Detail/Details'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/landingpage" component={LandingPage} />
          <Route path='/details' component={Details}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
