import { Typography, IconButton, makeStyles, Button } from '@material-ui/core';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import router from 'next/router';

const useStyles = makeStyles((theme) => ({
	center: {
		marginTop: '15rem',
		marginLeft: '38rem',

		[theme.breakpoints.down('xs')]: {}
	}
}));

export default function paymentFailed() {
	const classes = useStyles();

	return (
		<div className={classes.center}>
			<IconButton color="secondary" style={{ marginLeft: '6rem' }}>
				<ReportProblemIcon fontSize="large" />
			</IconButton>
			<Typography variant="h5">Sorry your payment failed</Typography>
			<Button onClick={() => router.back()} style={{ marginLeft: '5rem' }}>
				try again
			</Button>
		</div>
	);
}
