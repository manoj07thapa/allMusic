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
			main: '#1d3557'
		},
		secondary: {
			main: '#e63946'
		},
		tertiary: {
			main: '#457b9d'
		},
		error: {
			main: red.A400
		},
		background: {
			default: 'white'
		}
	}
});
