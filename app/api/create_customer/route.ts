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
                    phone_no number(255) NOT NULL,
                    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    
                )
            `;

		await sql`
            INSERT INTO customers (email, name, phone_no)
            VALUES (${customerData.email}, ${customerData.name}, ${customerData.phoneNo})
        `;
	} catch (error) {
		// Narrow the error type using a type guard
		if (typeof error === 'object' && error !== null && 'code' in error) {
			const { code, constraint, detail, message } = error as { code: string; constraint?: string; detail?: string; message?: string };

			if (code === '23505') {
				if (constraint?.includes('username')) {
					throw new Error('username has been registered');
				}
				if (constraint?.includes('email')) {
					throw new Error('email has been registered, maybe you meant to login?');
				}
			}

			// Log the full error object for debugging
			console.error('Full error object:', { code, constraint, detail, message });
		} else {
			// Handle unexpected error types
			console.error('Unexpected error:', error);
		}
	}


}