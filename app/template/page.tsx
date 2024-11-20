
import dynamic from "next/dynamic";
import TemplateHero from "@/app/components/template_hero";

const RecentTemplates = dynamic(() => import('@/app/components/recent_templates'), { ssr: false })



export default function CreatePage() {

	return (
		<section className="space-y-12" >
			<section>
				<TemplateHero />
			</section>
			<section>
				<RecentTemplates />
			</section>
		</section>
	);
}