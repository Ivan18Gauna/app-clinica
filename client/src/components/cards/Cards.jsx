import React from 'react';
import CardEdit from '../card/Card';

export default function Cards({ doctors, setLastName, setFilterProfProv, setFilterEsp }) {
	return (
		<div>
			{doctors.map((e) => {
				return <CardEdit key={e.id} id={e.id} name={e.name} lastname={e.lastname} />;
			})}
		</div>
	);
}
