import { CustomerData } from "@/types/objects";
import sql from "@/utils/neon_db_conn";







export async function POST(req: Request) {
	try {
		const customerData: CustomerData = await req.json()
		console.log(customerData)


		await sql`
                CREATE TABLE IF NOT EXISTS customers (
                    email VARCHAR(100) PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    phone_no VARCHAR(15) NOT NULL,
                    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    
                )
            `;

		await sql`
            INSERT INTO customers (email, name, phone_no)
            VALUES (${customerData.email}, ${customerData.name}, ${customerData.phoneNo})
        `;

		// Return a success response
		return new Response(JSON.stringify({ message: "Customer added successfully" }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		// Narrow the error type using a type guard
		if (typeof error === 'object' && error !== null && 'code' in error) {
			const { code, constraint, detail, message } = error as { code: string; constraint?: string; detail?: string; message?: string };

			if (code === '23505') {
				if (constraint?.includes('email')) {
					return new Response(JSON.stringify({ error: 'email has been added to a customer' }), { status: 200 });
				}
				if (constraint?.includes('name')) {
					return new Response(JSON.stringify({ error: 'customers must have unique names' }), { status: 409 });
				}
			}

			// Log full error object for debugging
			console.error('Full error object:', { code, constraint, detail, message });
			return new Response(JSON.stringify({ error: message || 'Database error' }), { status: 500 });
		} else {
			// Handle unexpected error types
			console.error('Unexpected error:', error);
			return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
		}
	}


}