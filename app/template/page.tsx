
import dynamic from "next/dynamic";
import TemplateHero from "@/app/components/template_hero";

const RecentTemplates = dynamic(() => import('@/app/components/recent_templates'), { ssr: false })



export default function CreatePage() {

	return (
		<section className="my-24 space-y-24" >
			<section className="" >
				<TemplateHero />
			</section>
			<section className="" >
				<RecentTemplates />
			</section>
		</section>
	);
}