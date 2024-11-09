import { fetchCustomers } from "@/app/lib/getCustomer";
import { CustomerData } from "@/types/objects";


export default async function ListCustomerPage(){

const customers = await fetchCustomers()

    return(
       <section>
         <h1>Customers</h1>
      <ul>
        {customers.map((customer:CustomerData) => (
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