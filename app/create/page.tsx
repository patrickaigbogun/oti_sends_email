import { PlusCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";


export default function CreatePage() {

	return (
		<section>
			<section>
				<h1>
					Here you can choose to create your customers, invoices, reciepts, etc
				</h1>
				<section className="h-fit grid grid-cols-3 gap-4">
					<Link className="bg-gradient-to-br from-teal-400 to-gray-800 flex object-cover h-48 items-center justify-center rounded-xl" href={''}>
						<PlusCircle size={56} />
					</Link>
					<Link className="bg-gradient-to-br from-violet-500 to-orange-300 flex object-cover h-48 items-center justify-center rounded-xl" href={''}>
						<PlusCircle size={56} />
					</Link>
					<Link className="bg-gradient-to-br from-neutral-600 via-orange-200 flex to-stone-700 object-cover h-48 items-center justify-center rounded-xl" href={''}>
						<PlusCircle size={56} />
					</Link>

				</section>

			</section>

		</section>
	);
}