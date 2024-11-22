'use client';

import { Table } from "@radix-ui/themes";
import getRecentTemplates from "../lib/getRecentTemplates";

export default function RecentTemplatesTable() {

async () => {
	const recentTemplates = await getRecentTemplates()

	
}

	return (
		<section className="w-full min-w-full">
			<Table.Root
				variant="surface"
				layout="fixed"
				size="3"
			>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell >Template</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell >ID / Name</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell >Customer Email</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell >Timestamp</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					<Table.Row>
						<Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
						<Table.Cell>danilo@example.com</Table.Cell>
						<Table.Cell>Developer</Table.Cell>
						<Table.Cell>Developer</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</section>
	);
}