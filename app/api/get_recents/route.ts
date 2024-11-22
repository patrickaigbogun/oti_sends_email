import { NextResponse } from 'next/server';
import sql from "@/utils/neon_db_conn";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {

	try {
		const recentTemplates = await sql`
            SELECT 
                identifier, 
                template_category, 
                customer_email as customerEmail, 
                created_at 
            FROM customers 
            ORDER BY created_at DESC
        `;

		return new NextResponse(JSON.stringify(recentTemplates), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
				'Pragma': 'no-cache',
				'Expires': '0',
			},
		});
	} catch (error) {
		console.error('Error fetching recent templates:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch recent templates' },
			{
				status: 500,
				headers: {
					'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
					'Pragma': 'no-cache',
					'Expires': '0',
				},
			}
		);
	}
}