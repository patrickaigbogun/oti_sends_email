'use client';

import { baseUrl } from "@/utils/constants";
import { PlusCircle } from "@phosphor-icons/react";
import { Heading, Text, Container, Flex, Box, Strong } from "@radix-ui/themes";
import Link from "next/link";

export default function CreateHero() {
	return (
		<Container className="py-12 md:py-24">
			<Flex direction="column" gap="6">
				<Box>
					<Heading size="8" className="mb-4">Create New Templates</Heading>
					<Text size="5" className="text-gray-500">
						Here you can choose to create your customers, invoices, receipts, etc
					</Text>
				</Box>
				<Flex gap="4" wrap="wrap">
					<Link href={`${baseUrl}/create/customer`} className="flex-1 min-w-[250px]">
						<Box className="bg-gradient-to-br from-teal-400 to-gray-800 h-48 rounded-xl overflow-hidden group">
							<Flex
								align="center"
								justify="center"
								className="w-full h-full bg-black bg-opacity-25 group-hover:bg-opacity-0 transition-all duration-300"
							>
								<span className="flex flex-col items-center" >
									<PlusCircle size={56} weight="duotone" /><Strong>New Customer</Strong>
								</span>
							</Flex>
						</Box>
					</Link>
					<Link href={`${baseUrl}/create/invoice`} className="flex-1 min-w-[250px]">
						<Box className="bg-gradient-to-br from-violet-500 to-orange-300 h-48 rounded-xl overflow-hidden group">
							<Flex
								align="center"
								justify="center"
								className="w-full h-full bg-black bg-opacity-25 group-hover:bg-opacity-0 transition-all duration-300"
							>
								<span className="flex flex-col items-center" >
									<PlusCircle size={56} weight="duotone" /><Strong>New Invoice</Strong>
								</span>
							</Flex>
						</Box>
					</Link>
					<Link href={`${baseUrl}/create/receipt`} className="flex-1 min-w-[250px]">
						<Box className="bg-gradient-to-br from-neutral-600 via-orange-200 to-stone-700 h-48 rounded-xl overflow-hidden group">
							<Flex
								align="center"
								justify="center"
								className="w-full h-full bg-black bg-opacity-25 group-hover:bg-opacity-0 transition-all duration-300"
							>
								<span className="flex flex-col items-center" >
									<PlusCircle size={56} weight="duotone" /><Strong>New Receipt</Strong>
								</span>
							</Flex>
						</Box>
					</Link>
				</Flex>
			</Flex>
		</Container>
	);
}