'use client';

import { useState } from 'react';

interface InvoiceItem {
	id: number;
	name: string;
	description: string;
	quantity: string;
	rate: string;
	amount: number;
}

interface InvoiceData {
	invoiceNo: string;
	dueDate: string;
	amountDue: string;
	message: string;
	billTo: string;
	shipTo: string;
	shipDate: string;
	shipVia: string;
	terms: string;
	items: InvoiceItem[];
	subtotal: number;
	shipping: number;
	total: number;
}

const InvoicePage: React.FC = () => {
	const [invoiceData, setInvoiceData] = useState<InvoiceData>({
		invoiceNo: '',
		dueDate: '',
		amountDue: '',
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

	return (
		<form action="/api/send">
			<div className="bg-gray-100 min-h-screen p-6">
				<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
					{/* Header Section */}
					<div className="flex justify-between items-start mb-8">
						<div>
							<div className="w-40 h-16 bg-gray-200 flex items-center justify-center mb-4">
								<span className="text-gray-500">Your Logo</span>
							</div>
							<h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
						</div>
						<div className="text-right">
							<p className="text-gray-600">Invoice No:
								<input
									className="border rounded px-2 py-1"
									value={invoiceData.invoiceNo}
									onChange={(e) => handleInputChange('invoiceNo', e.target.value)}
								/>
							</p>
							<div className="mt-2">
								<input
									type="date"
									className="border rounded px-2 py-1"
									value={invoiceData.dueDate}
									onChange={(e) => handleInputChange('dueDate', e.target.value)}
								/>
							</div>
							<div className="mt-2">
								<input
									type="number"
									className="border rounded px-2 py-1"
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
							className="w-full border rounded-lg p-4 h-24"
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
								className="w-full border rounded p-2 h-24"
								value={invoiceData.billTo}
								onChange={(e) => handleInputChange('billTo', e.target.value)}
							/>
						</div>
						<div>
							<h3 className="font-bold mb-2">Ship To:</h3>
							<textarea
								className="w-full border rounded p-2 h-24"
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
								className="w-full border rounded px-2 py-1 mt-1"
								value={invoiceData.shipDate}
								onChange={(e) => handleInputChange('shipDate', e.target.value)}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600">Ship Via</label>
							<input
								type="text"
								className="w-full border rounded px-2 py-1 mt-1"
								value={invoiceData.shipVia}
								onChange={(e) => handleInputChange('shipVia', e.target.value)}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600">Terms</label>
							<input
								type="text"
								className="w-full border rounded px-2 py-1 mt-1"
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
												className="w-full border rounded px-2 py-1"
												value={item.name}
												onChange={(e) => handleItemChange(index, 'name', e.target.value)}
											/>
										</td>
										<td className="px-4 py-2">
											<input
												type="text"
												className="w-full border rounded px-2 py-1"
												value={item.description}
												onChange={(e) => handleItemChange(index, 'description', e.target.value)}
											/>
										</td>
										<td className="px-4 py-2">
											<input
												type="number"
												className="w-full border rounded px-2 py-1 text-right"
												value={item.quantity}
												onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
											/>
										</td>
										<td className="px-4 py-2">
											<input
												type="number"
												className="w-full border rounded px-2 py-1 text-right"
												value={item.rate}
												onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
											/>
										</td>
										<td className="px-4 py-2">
											<input
												type="number"
												className="w-full border rounded px-2 py-1 text-right"
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
									className="border rounded px-2 py-1 w-32 text-right"
									value={invoiceData.subtotal}
									readOnly
								/>
							</div>
							<div className="flex justify-between py-2">
								<span className="font-medium">Shipping:</span>
								<input
									type="number"
									className="border rounded px-2 py-1 w-32 text-right"
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
									className="border rounded px-2 py-1 w-32 text-right font-bold"
									value={invoiceData.total}
									readOnly
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button className='p-4' type="submit">
				Add this invoice
			</button>
		</form>

	);
};

export default InvoicePage;