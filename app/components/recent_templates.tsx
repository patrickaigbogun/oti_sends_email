'use client';

import { Heading } from "@radix-ui/themes";
import RecentTemplatesTable from "./recent_templates_table";



export default function RecentTemplates() {
    return (
        <section>
            <Heading>
                Recently Created Templates
            </Heading>

            <RecentTemplatesTable />
        </section>
    )
}
