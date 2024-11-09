import CreateCustomerPage from "./create/page"
import ListCustomerPage from "./list/page"



export default function CustomerPage(){

    return(
       <div className="text-white font-bold w-[90%] sm:w-[70%] mx-auto" >
        <h1>Add your customers here to see them on the list below</h1>
         <a href='/customer/create'>click me to head over there</a>
         <h1>Saved customers</h1>
         <p><i>Saved customers can be set as recipients of invoices, reciepts, notice, etc</i></p>
         <a href="/customer/list" >click me to go here</a>
       </div>
    )
}