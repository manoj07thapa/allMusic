import StripeCheckout from 'react-stripe-checkout';
import { Button } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';

export default function StripePayment({ total }) {
	const handleCheckout = async (paymentInfo) => {
		try {
			const res = await fetch('/api/payment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				},
				body: JSON.stringify({ paymentInfo })
			});
			const data = await res.json();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<StripeCheckout
			name="My store"
			amount={total * 100}
			currency="INR"
			shippingAddress={true}
			billingAddress={true}
			zipCode={true}
			stripeKey="pk_test_51IDmxeDcPzXbpPdgeCaU1fX1T5VYrvO7sUEANLsNj5ocPRhpXBsnLT0xbpKMehs5t4lG4nMhmIznCHIyS0VRMeNE00Hl8jqYSR"
			token={(paymentInfo) => handleCheckout(paymentInfo)}
		>
			Buy it Now
		</StripeCheckout>
	);
}
