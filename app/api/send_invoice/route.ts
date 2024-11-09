
import InvoiceEmail from '@/app/components/invoice_template';
import { ResendConfig } from '@/utils/resend_config';
import { Resend } from 'resend';

const apiKey = ResendConfig.apiKey
const resend = new Resend(apiKey);



interface InvoiceItem {
	name: string;
	description: string;
	quantity: string;
	rate: string;
	amount: number;
}

interface FormData {
	invoiceNo: string;
	dueDate: string;
	amountDue: number;
	billTo: string;
	shipTo: string;
	shipDate: string;
	shipVia: string;
	terms: string;
	items: InvoiceItem[];
	subtotal: number;
	shipping: number;
	total: number;
	message?: string;
}


export async function POST(req: Request) {
	try {
		const formData: FormData = await req.json()
		console.log(formData)


		const { data, error } = await resend.emails.send({
			from: 'main@patrickaigbogun.me',
			to: ['rikkislayr@gmail.com'],
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