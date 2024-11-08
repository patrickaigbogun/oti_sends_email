
interface EmailTemplateProps {
	firstName: string;
	email: string;
	message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ firstName, email, message }) => (
	<div>
		<h1>Welcome, {firstName}!</h1>

		<section>
			<h4>This is your {email}</h4>
		
		<p>
			Your message; <br /><b>{message}</b> is well received.
		</p>
		</section>
	</div>
);

export default EmailTemplate;