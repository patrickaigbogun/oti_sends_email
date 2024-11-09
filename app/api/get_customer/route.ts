import { NextResponse } from 'next/server';
import sql from "@/utils/neon_db_conn";

export async function GET() {
    try {
        const customers = await sql`
      SELECT email, name, phone_no, created_at FROM customers
    `;
        return NextResponse.json(customers, { status: 200 });
    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}
