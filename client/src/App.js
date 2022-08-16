import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import LandingPage from './components/landingPage/LandingPage';
import Details from './components/detail/Details';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact  path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path='/details/:id' component={Details}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
