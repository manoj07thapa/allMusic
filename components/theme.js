import { createMuiTheme } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

// Create a light theme instance.
// export const lightTheme = createMuiTheme();

// Create a dark theme instance.
export const darkTheme = createMuiTheme({
	palette: {
		type: 'dark'
	}
});

// Create a theme instance.
export const lightTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#1d3557',
			light: '#bc4749',
			contrastText: '#e9ecef' //'#e9ecef' use this color for grey background
		},
		secondary: {
			main: '#e63946'
		},
		error: {
			main: red.A400
		},
		background: {
			default: 'white'
		}
	}
});
