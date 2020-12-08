import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

function sendEmail(message) {
	return new Promise((res, rej) => {
		const transporter = nodemailer.createTransport(
			smtpTransport({
				service: 'gmail',
				host: 'smtp.gmail.com',
				auth: {
					user: process.env.GOOGLE_USER,
					pass: process.env.GOOGLE_PASS
				}
			})
		);

		transporter.sendMail(message, function(err, info) {
			if (err) {
				rej(err);
				console.log(err, 'error sending email');
			} else {
				res(info, 'email sent');
			}
		});
	});
}

export function sendConfirmationEmail(user) {
	const message = {
		from: 'noreply@allmusic.com',
		// to: toUser.email // in production uncomment this
		to: user.email,
		subject: 'Signup success',
		html: `
      <h3> Hello  </h3>
      <p>Thank you for registering into our Application. 
      <p>Cheers</p>
      <p>All Music Team</p>
    `
	};

	return sendEmail(message);
}

export function sendResetPasswordEmail(user, token) {
	const message = {
		from: process.env.GOOGLE_USER,
		to: user.email,
		subject: 'Your App - Reset Password',
		html: `
      <h3>Hello ${user.firstname} </h3>
      <p>To reset your password please follow this link: <a target="_" href="${process.env
			.HOST}/reset-password/${token}">Reset Password Link</a></p>
      <p>Cheers,</p>
      <p>Your Application Team</p>
    `
	};

	return sendEmail(message);
}
