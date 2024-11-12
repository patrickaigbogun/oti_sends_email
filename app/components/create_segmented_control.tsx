import { Flex, SegmentedControl } from "@radix-ui/themes";
import Link from "next/link";

export default function CreateSegmentControl() {
	return(
		<Flex align="center" direction="row" gap="4">
		<SegmentedControl.Root defaultValue="inbox" radius="full">
			<Link href={"/create/invoice"}>
				<SegmentedControl.Item value="inbox">Invoice</SegmentedControl.Item>
			</Link>
			<Link href={"/create/customers"}>
				<SegmentedControl.Item value="drafts">Customers</SegmentedControl.Item>
			</Link>
			<Link href={"/create/reciepts"}>
				<SegmentedControl.Item value="sent">Reciepts</SegmentedControl.Item>
			</Link>
		</SegmentedControl.Root>
	</Flex>
	);
}
