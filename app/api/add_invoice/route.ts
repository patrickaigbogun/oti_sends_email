
import InvoiceEmail from '@/app/components/invoice_template';
import { InvoiceData } from '@/types/objects';
import { ResendConfig } from '@/utils/resend_config';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const apiKey = ResendConfig.apiKey
const resend = new Resend(apiKey);


export async function POST(req: NextRequest) {
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
			return NextResponse.json({
				success: false,
				message: 'Failed to send email',
				error
			}, { status: 500 });
		}

		// Save to database
		try {
			await saveInvoiceToDatabase(formData);

		} catch (dbError) {
			console.error('Database save error:', dbError);
			return NextResponse.json({
				success: false,
				message: 'Email sent but failed to save invoice',
				error: dbError
			}, { status: 500 });
		}


		return NextResponse.json({
			success: true,
			message: 'Invoice sent successfully',
			data
		});


	} catch (error) {
		console.error('Invoice processing error:', error);
		return NextResponse.json({
			success: false,
			message: 'Failed to process invoice',
			error
		}, { status: 500 });
	}
}

async function saveInvoiceToDatabase(templateData: InvoiceData) {

	throw new Error('Function not implemented.');
}
