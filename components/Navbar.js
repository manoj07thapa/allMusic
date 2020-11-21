import { AppBar, Button, Toolbar, Typography, Container } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		marginLeft: '1rem'
	}
}));

export default function Nav() {
	const classes = useStyles();

	return (
		<AppBar position="static">
			<Container>
				<Toolbar>
					<Image src="/shoppify.jpg" layout="fixed" width={30} height={30} alt="shopping" />
					<Typography variant="h6" className={classes.title}>
						Mugicology
					</Typography>

					<Link href="/">
						<Button color="inherit" component="a">
							Home
						</Button>
					</Link>

					<Link href="/createProduct">
						<Button color="inherit" component="a">
							Create
						</Button>
					</Link>
					<Link href="/login">
						<Button color="inherit" component="a">
							Login
						</Button>
					</Link>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
