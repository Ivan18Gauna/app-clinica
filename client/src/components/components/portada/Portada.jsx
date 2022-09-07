import React from 'react';
import img from '../../Icons/Doctors.svg';
import './Portada.css';

export default function Portada() {
	return (
		<div className="portada">
			<img src={img} alt="img not found" />
		</div>
	);
}
