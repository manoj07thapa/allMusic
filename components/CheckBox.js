import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { continents } from '../utils/Data';

export default function CheckBox(props) {
	const [ checked, setChecked ] = React.useState([]);

	const handleChange = (value) => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [ ...checked ];
		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
		props.handleFilters(newChecked); // sending newChecked info to parent component via handleFilters()
	};
	return (
		<div>
			{continents.map((item) => (
				<div key={item._id}>
					<Checkbox
						checked={checked.indexOf(item._id) === -1 ? false : true}
						onChange={() => handleChange(item._id)}
						inputProps={{ 'aria-label': 'primary checkbox' }}
					/>
					<span>{item.name}</span>
				</div>
			))}
		</div>
	);
}
