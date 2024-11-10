'use client';

import { fetchCustomers } from "@/app/lib/getCustomer";
import { CustomerData } from "@/types/objects";
import { Table } from '@radix-ui/themes';
import { ArrowsClockwise, ListMagnifyingGlass, SortAscending, SortDescending } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function ListCustomers() {
	const [searchTerm, setSearchTerm] = useState('');
	const [sortColumn, setSortColumn] = useState<keyof CustomerData>('name');
	const [sortAscending, setSortAscending] = useState(true);
	const [customers, setCustomers] = useState<CustomerData[]>([]);
	const [loading, setLoading] = useState(true);


	const loadCustomers = async () => {
		setLoading(true);
		try {
			const data = await fetchCustomers();
			setCustomers(data);
		} catch (error) {
			console.error("Error fetching customers:", error);
		} finally {
			setLoading(false);
		}
	};

	// Fetch customers when component mounts
	useEffect(() => {
		loadCustomers();
	}, []);

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

	// Refresh customer list
	const refreshCustomers = async () => {
		setLoading(true);
		try {
			const data = await fetchCustomers();
			setCustomers(data);
		} catch (error) {
			console.error("Error refreshing customers:", error);
		} finally {
			setLoading(false);
		}
	};

	// Filter and sort customers
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
		<section className="text-white font-bold space-y-5">
			<h1>Customers</h1>
			<div className='w-full flex flex-row justify-between'>
				<div className='flex flex-row gap-x-2 items-center border-[3px] border-[#48295D] w-full md:w-[30%] p-3 rounded-full'>
					<input
						placeholder="Search files..."
						type='search'
						value={searchTerm}
						onChange={handleSearch}
						className="focus:border-black focus:ring-black rounded-full p-2 focus:outline-none w-full"
					/>
					<span className='flex flex-row justify-end'>
						<ListMagnifyingGlass size={28} weight='bold' />
					</span>
				</div>
				<button
					onClick={refreshCustomers}
					className="border-[1.5px] p-1 rounded-lg flex flex-row items-center justify-between whitespace-nowrap w-auto"
				>
					<span>Refresh</span><ArrowsClockwise size={28} />
				</button>
			</div>

			{loading ? (
				<p>Loading customers...</p>
			) : (
				<div className="flex justify-center w-full">
					<Table.Root className="border rounded-xl p-2 table-auto max-w-full">
						<Table.Header>
							<Table.Row className="items-center">
								<Table.ColumnHeaderCell>
									<button className="items-center flex flex-row p-2">
										<span>S/N</span>
									</button>
								</Table.ColumnHeaderCell>
								<Table.ColumnHeaderCell>
									<button
										onClick={() => handleSort('name')}
										className="border-[1.5px] p-1 rounded-lg flex flex-row items-center justify-between whitespace-nowrap w-auto"
									>
										<span>Customer Name</span>
										{sortAscending ? <SortDescending size={24} weight="bold" /> : <SortAscending size={24} weight="bold" />}
									</button>
								</Table.ColumnHeaderCell>
								<Table.ColumnHeaderCell>
									<button
										onClick={() => handleSort('email')}
										className="border-[1.5px] p-1 rounded-lg flex flex-row items-center justify-between whitespace-nowrap w-auto"
									>
										<span>Customer Email</span>
										{sortAscending ? <SortDescending size={24} weight="bold" /> : <SortAscending size={24} weight="bold" />}
									</button>
								</Table.ColumnHeaderCell>
								<Table.ColumnHeaderCell>
									<button
										onClick={() => handleSort('phoneNo')}
										className="border-[1.5px] p-1 rounded-lg flex flex-row items-center justify-between whitespace-nowrap w-auto"
									>
										<span>Phone No.</span>
										{sortAscending ? <SortDescending size={24} weight="bold" /> : <SortAscending size={24} weight="bold" />}
									</button>
								</Table.ColumnHeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{filteredCustomers.map((customer, index) => (
								<Table.Row key={customer.email}>
									<Table.Cell>{index + 1}</Table.Cell>
									<Table.Cell>{customer.name}</Table.Cell>
									<Table.Cell>{customer.email}</Table.Cell>
									<Table.Cell>{customer.phoneNo}</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Root>
				</div>
			)}
		</section>
	);
}
