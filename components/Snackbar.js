import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	}
}));

export default function CustomizedSnackbar({ response }) {
	const classes = useStyles();
	// const [ open, setOpen ] = React.useState(false);

	// const handleClick = () => {
	// 	setOpen(true);
	// };

	// const handleClose = (event, reason) => {
	// 	response.success === false;
	// };

	return (
		<div className={classes.root}>
			<Snackbar
				open={response.success}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				autoHideDuration={6000}
			>
				<Alert severity="success">{response.message}</Alert>
			</Snackbar>
		</div>
	);
}
