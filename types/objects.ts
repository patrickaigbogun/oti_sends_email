
export interface CustomerData {
    name: string;
    email: string;
    phoneNo: string;
}

export interface InvoiceData {
	invoiceNo: string;
	email:CustomerData['email'];
	dueDate: string;
	amountDue: number;
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

export interface InvoiceItem {
	id: number;
	name: string;
	description: string;
	quantity: string;
	rate: string;
	amount: number;
}

export   interface InvoiceEmailProps {
	invoiceNo: string;
	dueDate: string;
	amountDue: number;
	billTo: string;
	shipTo: string;
	shipDate: string;
	shipVia: string;
	terms: string;
	items: InvoiceItem[];
	subtotal: number;
	shipping: number;
	total: number;
	message?: string;
  }