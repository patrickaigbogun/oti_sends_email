'use client';

import { CustomerData } from "@/types/objects";
import { FormEvent, useState } from "react";


export default function CreateCustomers() {

	const [status, setStatus] = useState<string | null>(null);
	const [customerData, setcustomerData] = useState<CustomerData>({
		name: '',
		email: '',
		phoneNo: ''
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
				setStatus('Success! You saved a customer.');
			} else {
				setStatus('Customer was not saved!');
			}
		} catch (error) {
			console.error('Submit error:', error);
			setStatus('Oops! Try that again');
		}
	};
	return (
		<div className="mx-auto w-[90%] sm:w-[70%] my-10 text-white font-bold justify-center flex flex-col p-5 border border-gray-500 rounded-xl">
			<form onSubmit={handleSubmit} 
			className="space-y-6"
			>
				{status && <p>{status}</p>}
				<section className="flex flex-col space-y-2" >
					<label htmlFor="email">Customers Email</label>
					<input
						className="text-black"
						name="email"
						type="email"
						value={customerData.email}
						placeholder="customer@gmail.com"
						onChange={(e) => handleInputChange('email', e.target.value)}

					/>
				</section>
				<section className="flex flex-col space-y-2" >
					<label htmlFor="name" >Customers name</label>
					<input
						className="text-black"
						name="name"
						type="text"
						value={customerData.name}
						placeholder="Customer INC"
						onChange={(e) => handleInputChange('name', e.target.value)}

					/>
				</section>
				<section className="flex flex-col space-y-2" >
					<label htmlFor="tel" >Customers phone</label>
					<input
						className="text-black"
						name="tel"
						type="tel"
						value={customerData.phoneNo}
						placeholder="09090909"
						onChange={(e) => handleInputChange('phoneNo', e.target.value)}

					/>
				</section>
				<button
				className="text-white border p-3 rounded-xl"
				type="submit"
				>
					Save this Customer
				</button>
			</form>
		</div>
	);
}