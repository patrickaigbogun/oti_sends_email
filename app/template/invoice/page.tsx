'use client';

import { InvoiceItem } from '@/types/objects';
import { FormEvent, useEffect, useState } from 'react';
import { getRecentCustomers } from '@/app/lib/getCustomer';
import { AddInvoice } from '@/app/lib/addInvoice';
import { InvoiceData, CustomerData } from '@/types/templates';
import { Bounce, toast } from 'react-toastify';
import { PlusCircle } from '@phosphor-icons/react';
import { Box, Flex, Select, Text, Heading, TextField, TextArea, Container, Button } from '@radix-ui/themes';





const InvoicePage: React.FC = () => {
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
			const response = await AddInvoice(invoiceData)

			if (response.success) {
				// setStatus(response.message);
				toast.success(response.message, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
					transition: Bounce,
				});
			} else {
				// setStatus(response.message);
				toast.error(response.message, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
					transition: Bounce,
				})
			}
		} catch (error) {
			console.error('Submit error:', error);
			toast.error(`An error occurred: ${error}`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Bounce,
			})
			// setStatus(`${error}: An error occurred.`);
		}
	};

	const fetchCustomerEmails = async () => {
		try {
			const customers: CustomerData[] = await getRecentCustomers();
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
		<Container >
			<form onSubmit={handleSubmit}>
				<Box >
					<Flex direction="column" gap="6">
						{/* Header Section */}
						<Flex justify="between" align="start">
							<Box>
								<Box className="w-40 h-16 bg-gray-200 flex items-center justify-center mb-4">
									<Text >Your Logo</Text>
								</Box>
								<Heading size="6">INVOICE</Heading>
							</Box>
							<Box>
								<Select.Root defaultValue="Select Customer Email" onValueChange={(value: string) => handleInputChange('email', value)}>
									<Select.Trigger className="w-[200px]">
									</Select.Trigger>
									<Select.Content>
										{customerEmails.map((email, index) => (
											<Select.Item key={index} value={email}>
												{email}
											</Select.Item>
										))}
									</Select.Content>
								</Select.Root>
							</Box>
							<Flex direction="column" gap="2">
								<TextField.Root

									placeholder="Invoice No"
									value={invoiceData.invoiceNo}
									onChange={(e) => handleInputChange('invoiceNo', e.target.value)}
								/>
								<TextField.Root

									type="date"
									value={invoiceData.dueDate}
									onChange={(e) => handleInputChange('dueDate', e.target.value)}
								/>
								<TextField.Root
									type="number"
									placeholder="Amount Due"
									value={invoiceData.amountDue}
									onChange={(e) => handleInputChange('amountDue', e.target.value)}
								/>
							</Flex>
						</Flex>

						{/* Message Section */}
						<TextArea
							placeholder="Enter your message here..."
							value={invoiceData.message}
							onChange={(e) => handleInputChange('message', e.target.value)}
						/>

						{/* Billing Details */}
						<Flex gap="4">
							<Box className="flex-1">
								<Heading size="3" className="mb-2">Bill To:</Heading>
								<TextArea
									value={invoiceData.billTo}
									onChange={(e) => handleInputChange('billTo', e.target.value)}
								/>
							</Box>
							<Box className="flex-1">
								<Heading size="3" className="mb-2">Ship To:</Heading>
								<TextArea
									value={invoiceData.shipTo}
									onChange={(e) => handleInputChange('shipTo', e.target.value)}
								/>
							</Box>
						</Flex>

						{/* Shipping Details */}
						<Flex gap="4">
							<TextField.Root className="flex-1"
								type="date"
								placeholder="Ship Date"
								value={invoiceData.shipDate}
								onChange={(e) => handleInputChange('shipDate', e.target.value)}
							/>
							<TextField.Root className="flex-1"
								placeholder="Ship Via"
								value={invoiceData.shipVia}
								onChange={(e) => handleInputChange('shipVia', e.target.value)}
							/>
							<TextField.Root className="flex-1"
								placeholder="Terms"
								value={invoiceData.terms}
								onChange={(e) => handleInputChange('terms', e.target.value)}
							/>
						</Flex>

						{/* Order Details Table */}
						<Box className="overflow-x-auto">
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
												<TextField.Root
													value={item.name}
													onChange={(e) => handleItemChange(index, 'name', e.target.value)}
												/>
											</td>
											<td className="px-4 py-2">
												<TextField.Root
													value={item.description}
													onChange={(e) => handleItemChange(index, 'description', e.target.value)}
												/>
											</td>
											<td className="px-4 py-2">
												<TextField.Root
													type="number"
													value={item.quantity}
													onChange={(e) => handleItemChange(index, 'quantity', (e.target.value))}
													className="text-right"
												/>
											</td>
											<td className="px-4 py-2">
												<TextField.Root
													type="number"
													value={item.rate}
													onChange={(e) => handleItemChange(index, 'rate', (e.target.value))}
													className="text-right"
												/>
											</td>
											<td className="px-4 py-2">
												<TextField.Root
													type="number"
													value={item.amount}
													readOnly
													className="text-right"
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<Button onClick={addNewItem} className="mt-4">
								<PlusCircle />
								Add Item
							</Button>
						</Box>

						{/* Totals Section */}
						<Flex justify="end">
							<Box className="w-64">
								<Flex justify="between" align="center" className="py-2">
									<Text weight="medium">Subtotal:</Text>
									<TextField.Root
										type="number"
										value={invoiceData.subtotal}
										readOnly
										className="w-32 text-right"
									/>
								</Flex>
								<Flex justify="between" align="center" className="py-2">
									<Text weight="medium">Shipping:</Text>
									<TextField.Root
										type="number"
										value={invoiceData.shipping}
										onChange={(e) => setInvoiceData(prev => ({
											...prev,
											shipping: Number(e.target.value),
											total: prev.subtotal + Number(e.target.value)
										}))}
										className="w-32 text-right"
									/>
								</Flex>
								<Flex justify="between" align="center" className="py-2 border-t border-gray-200">
									<Text weight="bold">Total:</Text>
									<TextField.Root
										type="number"
										value={invoiceData.total}
										readOnly
										className="w-32 text-right font-bold"
									/>
								</Flex>
							</Box>
						</Flex>

						<Button type="submit" className="w-full">
							Send this invoice
						</Button>
					</Flex>
				</Box>
			</form>
		</Container>

	);
};

export default InvoicePage;