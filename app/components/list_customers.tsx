'use client';
import { fetchCustomers } from "@/app/lib/getCustomer";
import { CustomerData } from "@/types/objects";
import { Box, Table } from '@radix-ui/themes';
import { ArrowsClockwise, ListMagnifyingGlass, SortAscending, SortDescending } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export const revalidate = 60

export default async function ListCustomers() {
	const [searchTerm, setSearchTerm] = useState('');
	const [sortColumn, setSortColumn] = useState<keyof CustomerData>('name');
	const [sortAscending, setSortAscending] = useState(true);
	const customers = await fetchCustomers()

	// Handle search
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	// Handle sorting
	const handleSort = (column: keyof CustomerData) => {
		if (sortColumn === column) {
			setSortAscending(!sortAscending);
		} else {
			setSortColumn(column);
			setSortAscending(true);
		}
	};

	// Filter and sort files based on search term and sort options
	const filteredCustomers = customers
		.filter((customer) =>
			customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			customer.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.sort((a, b) => {
			const valueA = a[sortColumn];
			const valueB = b[sortColumn];

			if (typeof valueA === 'string' && typeof valueB === 'string') {
				const compare = valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' });
				return sortAscending ? compare : -compare;
			}

			if (typeof valueA === 'number' && typeof valueB === 'number') {
				return sortAscending ? valueA - valueB : valueB - valueA;
			}

			return 0;
		});


	return (
		<section className="text-white font-bold" >

			<h1>Customers</h1>
			<Box className="p-4 space-y-7 font-bold">
				<div className='w-full flex flex-row justify-between' >
					<div className='flex flex-row gap-x-2 items-center border-[3px] border-[#48295D] w-full md:w-[30%] p-3 rounded-full' >
						<input
							placeholder="Search files..."
							type='search'
							value={searchTerm}
							onChange={handleSearch}
							className=" focus:border-black focus:ring-black rounded-full p-2 focus:outline-none w-full"
						/>
						<span className='flex flex-row justify-end' >
							<ListMagnifyingGlass size={28} weight='bold' />
						</span>
					</div>
					<button className="border border-gray-700 rounded-xl p-2 flex flex-row items-center gap-x-2 " >
						<span>Refresh</span><ArrowsClockwise size={28} />
					</button>
				</div>

				<Table.Root className='border rounded-xl p-2 ' >
					<Table.Header>
						<Table.Row className='items-center'>
							<Table.ColumnHeaderCell>
								<button className='items-center flex flex-row p-2' >
									<span  >
										S/N
									</span>
								</button>
							</Table.ColumnHeaderCell>
							<Table.ColumnHeaderCell>
								<button
									onClick={() => handleSort('name')}
									className='border-[1.5px] p-2 rounded-lg flex flex-row items-center justify-between w-fit mx-auto whitespace-nowrap'
								>
									<span>
										Customer Name
									</span>
									{sortAscending ? <SortDescending size={24} weight="bold" /> : <SortAscending size={24} weight="bold" />}
								</button>
							</Table.ColumnHeaderCell>
							<Table.ColumnHeaderCell>
								<button
									onClick={() => handleSort('email')}
									className='border-[1.5px] p-2 rounded-lg flex flex-row items-center justify-between w-fit mx-auto whitespace-nowrap'
								>
									<span>Customer Email</span>
									<span>
										{sortAscending ? <SortDescending size={24} weight="bold" /> : <SortAscending size={24} weight="bold" />}
									</span>
								</button>
							</Table.ColumnHeaderCell>
							<Table.ColumnHeaderCell>
								<button
									onClick={() => handleSort('phoneNo')}
									className='border-[1.5px] p-2 rounded-lg flex flex-row items-center justify-between w-fit mx-auto whitespace-nowrap'
								>
									<span>
										Phone No.
									</span>
									{sortAscending ? <SortDescending size={24} weight="bold" /> : <SortAscending size={24} weight="bold" />}
								</button>
							</Table.ColumnHeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{filteredCustomers.map((customer, index) => (
							<Table.Row key={customer.email}>
								<Table.Cell >{index + 1}</Table.Cell>
								<Table.Cell >{customer.name}</Table.Cell>
								<Table.Cell>{customer.email}</Table.Cell>
								<Table.Cell>{customer.phoneNo}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</Box>
		</section>
	)
}