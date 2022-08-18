import React from 'react';
import CardEdit from '../card/Card';

export default function Cards({ doctors }) {
	return (
		<div>
			{doctors.map((e) => {
				return <CardEdit key={e.id} id={e.id} name={e.name} />;
			})}
		</div>
	);
}
