import dynamic from "next/dynamic"
import CreateCustomers from "@/app/components/create_customers"
import { getRecentCustomers } from "@/app/lib/getCustomer";


const ListCustomers = dynamic(() => import('@/app/components/recent_customers_tables'), { ssr: false })
const customers = await getRecentCustomers()
export default function CustomerPage() {


	return (
		<section >
			<h1 className="text-2xl" >Add your customers here to see them on the list below</h1>
			<CreateCustomers />
			<span>
			<h1 className="text-2xl" >Saved customers</h1>
			<p className="font-light" ><i>Saved customers can be set as recipients of invoices, reciepts, notice, etc</i></p>
			</span>
			<ListCustomers customers={customers}/>
		</section>
	)
}