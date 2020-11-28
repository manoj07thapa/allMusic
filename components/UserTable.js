import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

// function createData(name, calories, fat, carbs, protein) {
// 	return { name, calories, fat, carbs, protein };
// }

// const rows = [
// 	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// 	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// 	createData('Eclair', 262, 16.0, 24, 6.0),
// 	createData('Cupcake', 305, 3.7, 67, 4.3),
// 	createData('Gingerbread', 356, 16.0, 49, 3.9)
// ];

export default function UserTable({ users }) {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>First Name</TableCell>
						<TableCell align="right">Last Name</TableCell>
						<TableCell align="right">Email</TableCell>
						<TableCell align="right">Role</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((row) => (
						<TableRow key={row._id}>
							<TableCell component="th" scope="row">
								{row.firstname}
							</TableCell>
							<TableCell align="right">{row.lastname}</TableCell>
							<TableCell align="right">{row.email}</TableCell>
							<TableCell align="right">{row.role}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
