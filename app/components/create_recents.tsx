'use client';

import { Heading } from "@radix-ui/themes";
import CreateRecentsTable from "./create_recent_table";



export default function CreateRecents() {
    return (
        <section>
            <Heading>
                Recently Created Templates
            </Heading>

            <CreateRecentsTable />
        </section>
    )
}
