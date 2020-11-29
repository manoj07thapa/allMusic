import { Box, Container, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
// import theme from './theme';
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// axios.defaults.baseURL = 'http://localhost:3000';

export default class MyApp extends App {
	componentDidMount() {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}

	render() {
		const { Component, pageProps } = this.props;

		const theme = createMuiTheme({
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

		return (
			<React.Fragment>
				<Head>
					<title>My page</title>
					<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
				</Head>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<Navbar />
					<Container>
						<Box marginTop={2}>
							<Component {...pageProps} />
						</Box>
					</Container>
					<Footer />
				</ThemeProvider>
			</React.Fragment>
		);
	}
}
