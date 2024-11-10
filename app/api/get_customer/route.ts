import { NextResponse } from 'next/server';
import sql from "@/utils/neon_db_conn";
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    const headersList = headers();
    
    try {
        const customers = await sql`
            SELECT 
                email, 
                name, 
                phone_no as "phoneNo", 
                created_at 
            FROM customers 
            ORDER BY created_at DESC
        `;

        return new NextResponse(JSON.stringify(customers), {
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