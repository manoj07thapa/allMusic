import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

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
			main: '#556cd6'
		},
		secondary: {
			main: '#19857b'
		},
		error: {
			main: red.A400
		},
		background: {
			default: 'white'
		}
	}
});
