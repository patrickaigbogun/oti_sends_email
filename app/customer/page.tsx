'use client';

import { CustomerData } from "@/types/objects";
import { FormEvent, useState } from "react";



export default function CustomerPage() {

	const [status, setStatus] = useState<string | null>(null);
	const [customerData, setcustomerData] = useState<CustomerData>({
		name: '',
		email: '',
		phoneNo: 0
	});

	const handleInputChange = (field: keyof CustomerData, value: string): void => {
		setcustomerData(prev => ({
			...prev,
			[field]: value
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/create_customer', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(customerData)
			});
			if (response.ok) {
				setStatus('Email sent successfully!');
			} else {
				setStatus('Failed to send email.');
			}
		} catch (error) {
			console.error('Submit error:', error);
			setStatus('An error occurred.');
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				{status && <p>{status}</p>}
				<input type="text"
					value={customerData.name}
					onChange={(e) => handleInputChange('name', e.target.value)}

				/>
				<input type="email"
					value={customerData.email}
					onChange={(e) => handleInputChange('email', e.target.value)}

				/>
				<input type="tel"
					value={customerData.phoneNo}
					onChange={(e) => handleInputChange('phoneNo', e.target.value)}

				/>


			</form>
		</div>
	);
}