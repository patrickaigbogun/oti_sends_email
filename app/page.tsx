'use client';

import { CustomerData, InvoiceData, InvoiceItem } from '@/types/objects';
import { FormEvent, useEffect, useState } from 'react';
import { fetchCustomers } from './lib/getCustomer';





const InvoicePage: React.FC = () => {
	const [status, setStatus] = useState<string | null>(null);
	const [customerEmails, setCustomerEmails] = useState<string[]>([]);
	const [invoiceData, setInvoiceData] = useState<InvoiceData>({
		invoiceNo: '',
		email: '',
		dueDate: '',
		amountDue: 0,
		message: '',
		billTo: '',
		shipTo: '',
		shipDate: '',
		shipVia: '',
		terms: '',
		items: [
			{
				id: 1,
				name: '',
				description: '',
				quantity: '',
				rate: '',
				amount: 0
			}
		],
		subtotal: 0,
		shipping: 0,
		total: 0
	});

	const handleItemChange = (index: number, field: keyof InvoiceItem, value: string): void => {
		const newItems = [...invoiceData.items];
		newItems[index] = { ...newItems[index], [field]: value };

		// Calculate amount if quantity and rate are present
		if (field === 'quantity' || field === 'rate') {
			const quantity = field === 'quantity' ? value : newItems[index].quantity;
			const rate = field === 'rate' ? value : newItems[index].rate;
			if (quantity && rate) {
				newItems[index].amount = Number(quantity) * Number(rate);
			}
		}

		// Calculate subtotal and total
		const subtotal = newItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

		setInvoiceData(prev => ({
			...prev,
			items: newItems,
			subtotal,
			total: subtotal + Number(prev.shipping)
		}));
	};

	const addNewItem = (): void => {
		setInvoiceData(prev => ({
			...prev,
			items: [...prev.items, {
				id: prev.items.length + 1,
				name: '',
				description: '',
				quantity: '',
				rate: '',
				amount: 0
			}]
		}));
	};

	const handleInputChange = (field: keyof InvoiceData, value: string): void => {
		setInvoiceData(prev => ({
			...prev,
			[field]: value
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/send_invoice', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(invoiceData)
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

	const fetchCustomerEmails = async () => {
		try {
			const customers: CustomerData[] = await fetchCustomers();
			const emails = customers.map(customer => customer.email);
			setCustomerEmails(emails);
		} catch (error) {
			console.error("Error fetching customer emails:", error);
		}
	};

	useEffect(() => {
		fetchCustomerEmails();
	}, []);

	return (
		<div className=" min-h-screen py-10 w-[90%] sm:w-[70%] mx-auto">
			<form className='text-black' onSubmit={handleSubmit}>

				<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
					{/* Header Section */}
					<div className="flex justify-between items-start mb-8">
						<div>
							{status && <p>{status}</p>}
							<div className="w-40 h-16 bg-gray-200 flex items-center justify-center mb-4">
								<span className="text-gray-500">Your Logo</span>
							</div>
							<h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
						</div>
						<div>
							{/* Email Select Dropdown */}
							<select
								value={invoiceData.email}
								onChange={(e) => handleInputChange('email', e.target.value)}
								className="bg-gray-300 rounded-lg"
							>
								<option value="" disabled>Select Customer Email</option>
								{customerEmails.map((email, index) => (
									<option key={index} value={email}>
										{email}
									</option>
								))}
							</select>
						</div>
						<div className="text-right">
							<p>Invoice No:
								<input
									className="border rounded px-2 py-1 bg-gray-300"
									value={invoiceData.invoiceNo}
									onChange={(e) => handleInputChange('invoiceNo', e.target.value)}
								/>
							</p>
							<div className="mt-2">
								<input
									type="date"
									className="border rounded px-2 py-1 bg-gray-300"
									value={invoiceData.dueDate}
									onChange={(e) => handleInputChange('dueDate', e.target.value)}
								/>
							</div>
							<div className="mt-2">
								<input
									type="number"
									className="border rounded px-2 py-1 bg-gray-300"
									placeholder="Amount Due"
									value={invoiceData.amountDue}
									onChange={(e) => handleInputChange('amountDue', e.target.value)}
								/>
							</div>
						</div>
					</div>

					{/* Message Section */}
					<div className="mb-8">
						<textarea
							className="w-full border rounded-lg p-4 h-24 bg-gray-300"
							placeholder="Enter your message here..."
							value={invoiceData.message}
							onChange={(e) => handleInputChange('message', e.target.value)}
						/>
					</div>

					{/* Billing Details */}
					<div className="grid grid-cols-2 gap-8 mb-8">
						<div>
							<h3 className="font-bold mb-2">Bill To:</h3>
							<textarea
								className="w-full border rounded p-2 h-24 bg-gray-300"
								value={invoiceData.billTo}
								onChange={(e) => handleInputChange('billTo', e.target.value)}
							/>
						</div>
						<div>
							<h3 className="font-bold mb-2">Ship To:</h3>
							<textarea
								className="w-full border rounded p-2 h-24 bg-gray-300"
								value={invoiceData.shipTo}
								onChange={(e) => handleInputChange('shipTo', e.target.value)}
							/>
						</div>
					</div>

					{/* Shipping Details */}
					<div className="grid grid-cols-3 gap-4 mb-8">
						<div>
							<label className="block text-sm font-medium text-gray-600">Ship Date</label>
							<input
								type="date"
								className="w-full border rounded px-2 py-1 mt-1 bg-gray-300"
								value={invoiceData.shipDate}
								onChange={(e) => handleInputChange('shipDate', e.target.value)}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600">Ship Via</label>
							<input
								type="text"
								className="w-full border rounded px-2 py-1 mt-1 bg-gray-300"
								value={invoiceData.shipVia}
								onChange={(e) => handleInputChange('shipVia', e.target.value)}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600">Terms</label>
							<input
								type="text"
								className="w-full border rounded px-2 py-1 mt-1 bg-gray-300"
								value={invoiceData.terms}
								onChange={(e) => handleInputChange('terms', e.target.value)}
							/>
						</div>
					</div>

					{/* Order Details Table */}
					<div className="overflow-x-auto mb-8">
						<table className="w-full">
							<thead>
								<tr className="bg-gray-50">
									<th className="px-4 py-2 text-left">Item</th>
									<th className="px-4 py-2 text-left">Description</th>
									<th className="px-4 py-2 text-right">Quantity</th>
									<th className="px-4 py-2 text-right">Rate</th>
									<th className="px-4 py-2 text-right">Amount</th>
								</tr>
							</thead>
							<tbody>
								{invoiceData.items.map((item, index) => (
									<tr key={item.id} className="border-b">
										<td className="px-4 py-2">
											<input
												type="text"
												className="w-full border rounded px-2 py-1 bg-gray-300"
												value={item.name}
												onChange={(e) => handleItemChange(index, 'name', e.target.value)}
											/>
										</td>
										<td className="px-4 py-2">
											<input
												type="text"
												className="w-full border rounded px-2 py-1 bg-gray-300"
												value={item.description}
												onChange={(e) => handleItemChange(index, 'description', e.target.value)}
											/>
										</td>
										<td className="px-4 py-2">
											<input
												type="number"
												className="w-full border rounded px-2 py-1 text-right bg-gray-300"
												value={item.quantity}
												onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
											/>
										</td>
										<td className="px-4 py-2">
											<input
												type="number"
												className="w-full border rounded px-2 py-1 text-right bg-gray-300"
												value={item.rate}
												onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
											/>
										</td>
										<td className="px-4 py-2">
											<input
												type="number"
												className="w-full border rounded px-2 py-1 text-right bg-gray-300"
												value={item.amount}
												readOnly
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<button
							onClick={addNewItem}
							className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Add Item
						</button>
					</div>

					{/* Totals Section */}
					<div className="flex justify-end">
						<div className="w-64">
							<div className="flex justify-between py-2">
								<span className="font-medium">Subtotal:</span>
								<input
									type="number"
									className="border rounded px-2 py-1 w-32 text-right bg-gray-300"
									value={invoiceData.subtotal}
									readOnly
								/>
							</div>
							<div className="flex justify-between py-2">
								<span className="font-medium">Shipping:</span>
								<input
									type="number"
									className="border rounded px-2 py-1 w-32 text-right bg-gray-300"
									value={invoiceData.shipping}
									onChange={(e) => setInvoiceData(prev => ({
										...prev,
										shipping: Number(e.target.value),
										total: prev.subtotal + Number(e.target.value)
									}))}
								/>
							</div>
							<div className="flex justify-between py-2 border-t border-gray-200">
								<span className="font-bold">Total:</span>
								<input
									type="number"
									className="border rounded px-2 py-1 w-32 text-right font-bold bg-gray-300"
									value={invoiceData.total}
									readOnly
								/>
							</div>
						</div>
					</div>
					<button className='p-4 border rounded-2xl font-bold' type="submit">
						Send this invoice
					</button>
				</div>
			</form>

		</div>


	);
};

export default InvoicePage;