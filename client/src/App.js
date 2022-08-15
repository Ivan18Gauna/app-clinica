import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import LandingPage from './components/landingPage/LandingPage';
import Details from './components/detail/Details';
import './App.css';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/home" element={<Home />} />
				<Route path="/details" element={<Details />} />
			</Routes>
		</>
	);
}

export default App;
