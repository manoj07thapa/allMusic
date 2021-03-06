import { Button } from '@material-ui/core';
import KhaltiCheckout from 'khalti-checkout-web';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import router from 'next/router';

export default function KhaltiPayment({ products, totalAmt }) {
	const [ paymentRes, setPaymentRes ] = useState({});
	console.log('Amount', totalAmt);
	console.log('Payment Response', paymentRes);

	let config = {
		// replace this key with yours
		publicKey: 'test_public_key_2994c415529b494595ebb5d4c6118235',
		productIdentity: '1234567890',
		productName: 'Drogon',
		productUrl: 'http://gameofthrones.com/buy/Dragons',
		eventHandler: {
			async onSuccess(payload) {
				// hit merchant api for initiating verfication
				const { token } = parseCookies();

				try {
					const res = await fetch('/api/payment/khalti', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: token
						},
						body: JSON.stringify({ payload })
					});

					const data = await res.json();
					if (data.success === true) {
						router.push('/paymentSuccess');
					} else {
						router.push('/paymentFailed');
					}
				} catch (error) {
					console.log(error);
				}
			},
			// onError handler is optional
			onError(error) {
				// handle errors
				console.log(error);
			},
			onClose() {
				console.log('widget is closing');
			}
		},
		paymentPreference: [ 'KHALTI', 'EBANKING', 'MOBILE_BANKING', 'CONNECT_IPS', 'SCT' ]
	};

	const checkout = new KhaltiCheckout(config);

	const handleClick = () => {
		checkout.show({ amount: totalAmt * 100 });
	};

	return (
		<Button onClick={handleClick} style={{ backgroundColor: '#5a189a', color: 'white' }} variant="contained">
			Khalti
		</Button>
	);
}
