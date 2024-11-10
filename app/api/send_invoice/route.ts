
import InvoiceEmail from '@/app/components/invoice_template';
import { InvoiceData } from '@/types/objects';
import { ResendConfig } from '@/utils/resend_config';
import { Resend } from 'resend';

const apiKey = ResendConfig.apiKey
const resend = new Resend(apiKey);


export async function POST(req: Request) {
	try {
		const formData: InvoiceData = await req.json()
		console.log(formData)


		const { data, error } = await resend.emails.send({
			from: 'main@patrickaigbogun.me',
			to: [formData.email],
			subject: `Invoice #${formData.invoiceNo}`,
			react: InvoiceEmail(formData),
		});

		if (error) {
			return Response.json({ error });
		}

		return (
			console.error,
			Response.json({ data })
		);
	} catch (error) {
		return (
			console.error,
			Response.json({ error })
		)
	}
}