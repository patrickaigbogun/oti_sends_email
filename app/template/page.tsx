
import TemplateHero from "@/app/components/template_hero";
import RecentTemplates from "@/app/components/recent_templates";
import getRecentTemplates from '@/app/lib/getRecentTemplates'
import RecentTemplatesTable from "../components/recent_templates_table";

export default  async function TemplatePage() {

	const  templates = await getRecentTemplates()

	return (
		<section className=" space-y-28" >
			<section className="" >
				<TemplateHero />
			</section>
			<section className="" >
				<RecentTemplates/>
				<RecentTemplatesTable templates={templates} />
			</section>
		</section>
	);
}