import { NextResponse } from 'next/server';
import sql from "@/utils/neon_db_conn";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    
    try {

        const recentCustomers = await sql`
            SELECT * FROM templates 
            WHERE template_category = 'customer'
            ORDER BY created_at DESC limit 7
        `;

        return new NextResponse(JSON.stringify(recentCustomers), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json(
            { error: 'Failed to fetch customers' }, 
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