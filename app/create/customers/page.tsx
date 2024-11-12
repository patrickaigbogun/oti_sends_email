import dynamic from "next/dynamic"
import CreateCustomers from "../../components/create_customers"
// import CreateCustomerPage from "./create/page"
// import ListCustomerPage from "./list/page"

const ListCustomers = dynamic(() => import('../../components/list_customers'), { ssr: false })

export default function CustomerPage() {

	return (
		<div className="text-white font-bold w-[90%] sm:w-[70%] mx-auto py-10" >
			<h1 className="text-2xl" >Add your customers here to see them on the list below</h1>
			<CreateCustomers />
			<span>
			<h1 className="text-2xl" >Saved customers</h1>
			<p className="font-light" ><i>Saved customers can be set as recipients of invoices, reciepts, notice, etc</i></p>
			</span>
			<ListCustomers />
		</div>
	)
}