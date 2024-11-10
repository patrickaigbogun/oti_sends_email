import dynamic from "next/dynamic"
import CreateCustomers from "../components/create_customers"
// import CreateCustomerPage from "./create/page"
// import ListCustomerPage from "./list/page"

const ListCustomers = dynamic(() => import('../components/list_customers'), { ssr: false })

export default function CustomerPage() {

	return (
		<div className="text-white font-bold w-[90%] sm:w-[70%] mx-auto" >
			<h1>Add your customers here to see them on the list below</h1>
			<CreateCustomers />
			<h1>Saved customers</h1>
			<p><i>Saved customers can be set as recipients of invoices, reciepts, notice, etc</i></p>
			<ListCustomers />
		</div>
	)
}