import { fetchCustomers } from "@/app/lib/getCustomer";
import { CustomerData } from "@/types/objects";
import { ArrowsClockwise } from "@phosphor-icons/react/dist/ssr";

export const revalidate = 60

export default async function ListCustomers() {

	const customers = await fetchCustomers()

	return (
		<section className="text-white font-bold" >
            <button>
                <span>Refresh<ArrowsClockwise size={32} /></span>
            </button>
			<h1>Customers</h1>
			<ul>
				{customers.map((customer: CustomerData) => (
					<li key={customer.email}>
						<p>Name: {customer.name}</p>
						<p>Email: {customer.email}</p>
						<p>Phone: {customer.phoneNo}</p>
					</li>
				))}
			</ul>
		</section>
	)
}