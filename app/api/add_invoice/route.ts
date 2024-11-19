
import InvoiceEmail from '@/app/components/invoice_template';
import { InvoiceData } from '@/types/templates';
import sql from '@/utils/neon_db_conn';
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
			const result = await saveInvoiceToDatabase(formData);
			if (!result) {
				return NextResponse.json({
					success: false,
					message: 'Failed to save invoice to database'
				}, { status: 500 });
			}

		} catch (error) {
			console.error('Database save error:', error);
			return NextResponse.json({
				success: false,
				message: 'Email sent but failed to save invoice',
				error
			}, { status: 500 });
		}


		return NextResponse.json({
			success: true,
			message: 'Invoice was added and email sent successfully!'
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

async function saveInvoiceToDatabase(formData: InvoiceData) {
	const templateData = formData;

	try {
		await sql`
				CREATE TABLE IF NOT EXISTS templates (
				identifier VARCHAR(255) PRIMARY KEY,
				template_category VARCHAR(50) CHECK (template_category IN ('invoice', 'receipt', 'customer')),
				customer_email VARCHAR(255),
				template_data JSONB NOT NULL,
				created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
				modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
				
				FOREIGN KEY (customer_email) REFERENCES customers(email) ON DELETE SET NULL
			);
		`;

		const result = await sql`
            INSERT INTO templates (identifier, template_category, customer_email, template_data)
            VALUES (${templateData.invoiceNo}, 'invoice', ${templateData.email}, ${templateData} )
			RETURNING *;  

        `;

		// Validate that a row was actually inserted
		if (result.length === 0) {
			throw new Error('No rows were inserted');
		}

		return true;  // Explicitly return success
	} catch (error) {
		console.error('Database save error:', error);
		throw error;  // Rethrow to allow caller to handle
	}
}
