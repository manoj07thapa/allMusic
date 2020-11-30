import { useField } from 'formik';
import { TextField } from '@material-ui/core';

export const FormikTextField = ({ formikKey, ...props }) => {
	const [ field, meta, helpers ] = useField(formikKey);
	return (
		<TextField
			id={field.name}
			name={field.name}
			helperText={meta.touched ? meta.error : ''}
			error={meta.touched && Boolean(meta.error)}
			value={field.value}
			onChange={field.onChange}
			{...props}
		/>
	);
};
