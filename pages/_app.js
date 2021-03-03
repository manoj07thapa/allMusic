import { Box, Container, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import theme from '../components/theme';
import { SWRConfig } from 'swr';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000';
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
					{/* <Search /> */}
					<SWRConfig value={{ fetcher: (url) => axios(url).then((r) => r.data) }}>
						<Box marginTop={2}>
							<Component {...pageProps} />
						</Box>
					</SWRConfig>
					<Footer />
				</ThemeProvider>
			</React.Fragment>
		);
	}
}
