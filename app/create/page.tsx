
import dynamic from "next/dynamic";
import CreateHero from "../components/create_hero";

const CreateRecents = dynamic(() => import('../components/create_recents'), { ssr: false })



export default function CreatePage() {

	return (
		<section className="space-y-12" >
			<section>
				<CreateHero />
			</section>
			<section>
				<CreateRecents />
			</section>
		</section>
	);
}