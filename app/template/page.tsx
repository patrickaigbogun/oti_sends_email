
import TemplateHero from "@/app/components/template_hero";
import RecentTemplates from "@/app/components/recent_templates";
import getRecentTemplates from '@/app/lib/getRecentTemplates'

export default  async function TemplatePage() {

	const  templates = await getRecentTemplates()

	return (
		<section className="my-24 space-y-28" >
			<section className="" >
				<TemplateHero />
			</section>
			<section className="" >
				<RecentTemplates templates={templates}/>
			</section>
		</section>
	);
}