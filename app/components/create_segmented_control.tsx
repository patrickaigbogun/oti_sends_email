'use client';

import { ClockCounterClockwise, House } from "@phosphor-icons/react/dist/ssr";
import { Flex, SegmentedControl } from "@radix-ui/themes";
import Link from "next/link";

export default function CreateSegmentControl() {
	return (
		<Flex align="center" direction="row" gap="4" justify='center' >
			<SegmentedControl.Root radius="full">
				<SegmentedControl.Item value="Home">
					<Link href={'/create'} >
						<House size={32} />
					</Link>
				</SegmentedControl.Item>
				<SegmentedControl.Item value="Invoice">
					<Link href={"/create/invoice"}>
						Invoice
					</Link>
				</SegmentedControl.Item>
				<SegmentedControl.Item value="Customers">
					<Link href={"/create/customers"}>
						Customers
					</Link>
				</SegmentedControl.Item>
				<SegmentedControl.Item value="Reciepts">
					<Link href={"/create/reciepts"}>
						Reciepts
					</Link>
				</SegmentedControl.Item>
				<SegmentedControl.Item value="Recents">
					<Link href={'/create/recents'} >
						<ClockCounterClockwise size={32} />
					</Link>
				</SegmentedControl.Item>
			</SegmentedControl.Root>
		</Flex>
	);
}
