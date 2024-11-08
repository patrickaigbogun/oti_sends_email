// app/api/sendEmail/route.ts
// import axios from 'axios';
// import { NextResponse } from 'next/server';
import InvoiceEmail from '@/app/components/invoice_template';
import { config } from '@/config';
import { Resend } from 'resend';

const apiKey = config.apiKey
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
// export async function POST(req: Request) {
//   try {
//     const secret = 're_X4xZCs2q_LE8RUh4aMc8uNqz2vySs3RgE'
//     const { name, email, message }: FormData = await req.json();
//     const recipientEmail = 'rikkislayr@gmail.com'

//     const emailPromises = () =>
//       axios.post(
//         'https://api.brevo.com/v3/smtp/email',
//         {
//           to: [{ email: recipientEmail }],
//           sender: { email: 'main@patrickaigbogun.me', name: 'Patrick' },
//           subject: `New message from ${name}`,
//           htmlContent: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Message:</strong> ${message}</p>`,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'api-key': secret,
//           },
//         }
//       )


//     await Promise.all(recipientEmail);
//     return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
//   } catch (error) {
//     console.error('Brevo error:', error);
//     return NextResponse.json({ message: 'Email sending failed' }, { status: 500 });
//   }
// }


export async function POST(req: Request) {
	try {
		const formData: FormData = await req.json()


		const { data, error } = await resend.emails.send({
			from: 'main@patrickaigbogun.me',
			to: ['bigtechdomain@gmail.com'],
			subject: `Invoice #${formData.invoiceNo}`,
			react: InvoiceEmail({
				invoiceNo: formData.invoiceNo,
				dueDate: formData.dueDate,
				amountDue: formData.amountDue,
				billTo: formData.billTo,
				shipTo: formData.shipTo,
				shipDate: formData.shipDate,
				shipVia: formData.shipVia,
				terms: formData.terms,
				items: formData.items,
				subtotal: formData.subtotal,
				shipping: formData.shipping,
				total: formData.total,
				message: formData.message
			}) as React.ReactElement,
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return Response.json({ data });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}