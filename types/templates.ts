import { InvoiceItem } from "./objects";

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