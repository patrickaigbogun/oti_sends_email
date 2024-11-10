'use client';

import { fetchCustomers } from "@/app/lib/getCustomer";
import { CustomerData } from "@/types/objects";
import { Table } from '@radix-ui/themes';
import { useEffect, useState, useCallback } from "react";
import { XCircle, ArrowsClockwise, ListMagnifyingGlass, SortAscending, SortDescending } from "@phosphor-icons/react/dist/ssr";

export default function ListCustomers() {
	const [searchTerm, setSearchTerm] = useState('');
	const [sortColumn, setSortColumn] = useState<keyof CustomerData>('name');
	const [sortAscending, setSortAscending] = useState(true);
	const [customers, setCustomers] = useState<CustomerData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadCustomers = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await fetchCustomers();
			setCustomers(data);
		} catch (error) {
			setError("Failed to load customers. Please try again.");
			console.error("Error fetching customers:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadCustomers();
	}, [loadCustomers]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleSort = (column: keyof CustomerData) => {
		if (sortColumn === column) {
			setSortAscending(!sortAscending);
		} else {
			setSortColumn(column);
			setSortAscending(true);
		}
	};

	const filteredCustomers = customers
		.filter((customer) =>
			customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			customer.phoneNo.includes(searchTerm)
		)
		.sort((a, b) => {
			const valueA = a[sortColumn];
			const valueB = b[sortColumn];

			if (typeof valueA === 'string' && typeof valueB === 'string') {
				const compare = valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' });
				return sortAscending ? compare : -compare;
			}
			return 0;
		});

	const SortIcon = ({ column }: { column: keyof CustomerData }) => {
		if (sortColumn !== column) return null;
		return sortAscending ?
			<SortAscending size={20} weight="bold" /> :
			<SortDescending size={20} weight="bold" />;
	};

	return (
		<section className="space-y-6 p-6">
			{/* Header and Controls */}
			<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
				<h1 className="text-2xl font-bold text-white">
					Customers ({filteredCustomers.length})
				</h1>

				<div className="flex flex-col gap-4 md:flex-row md:items-center">
					{/* Search Bar */}
					<div className="relative">
						<input
							type="search"
							placeholder="Search by name, email, or phone..."
							value={searchTerm}
							onChange={handleSearch}
							className="pl-10 pr-4 py-2 w-full md:w-[300px] rounded-lg bg-white/10 border border-white/20 
                         text-white placeholder:text-white/50 focus:outline-none focus:ring-2 
                         focus:ring-purple-800 focus:border-transparent"
						/>
						<span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
							<ListMagnifyingGlass size={20} />
						</span>
					</div>

					{/* Refresh Button */}
					<button
						onClick={loadCustomers}
						disabled={loading}
						className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-800 text-white 
                     hover:bg-purple-950 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
					>
						<span className={`${loading ? 'animate-spin' : ''}`}>
							<ArrowsClockwise size={20} />
						</span>
						{loading ? 'Refreshing...' : 'Refresh'}
					</button>
				</div>
			</div>

			{/* Error Message */}
			{error && (
				<div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200">
					{error}
				</div>
			)}

			{/* Loading State */}
			{loading && (
				<div className=" items-center justify-center py-8">
					<div className="flex-col flex space-y-3 text-center">
						<span className="animate-spin mx-auto text-purple-500" >
							<ArrowsClockwise size={32} />
						</span>
						<p className="text-white/70">Loading customers...</p>
					</div>
				</div>
			)}


			{/* Customer Table */}
			{!loading && (
				<div className="space-y-2">

					{/* Results Count */}
					{!loading && filteredCustomers.length > 0 && (
						<p className="text-sm text-white/50">
							Showing {filteredCustomers.length} of {customers.length} customers
						</p>
					)}

					<div className="flex justify-center w-full">
						<Table.Root className="border rounded-xl p-2 table-auto max-w-full bg-white/5" >
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeaderCell className="w-14 text-white/70">S/N</Table.ColumnHeaderCell>

									{['name', 'email', 'phoneNo'].map((column) => (
										<Table.ColumnHeaderCell key={column} className="text-white/70">
											<button
												onClick={() => handleSort(column as keyof CustomerData)}
												className="flex items-center hover:text-white transition-colors duration-200 border p-2 rounded-lg"
											>
												{column === 'phoneNo' ? 'Phone Number' :
													column.charAt(0).toUpperCase() + column.slice(1)}
												<SortIcon column={column as keyof CustomerData} />
											</button>
										</Table.ColumnHeaderCell>
									))}
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{filteredCustomers.length === 0 ? (
									<Table.Row>
										<Table.Cell colSpan={5} className="text-center py-8 text-white/50">
											No customers found <XCircle />
										</Table.Cell>
									</Table.Row>
								) : (
									filteredCustomers.map((customer, index) => (
										<Table.Row key={customer.email} className="hover:bg-white/5 transition-colors duration-200">
											<Table.Cell className="text-white/70">{index + 1}</Table.Cell>
											<Table.Cell className="text-white">{customer.name}</Table.Cell>
											<Table.Cell className="text-white">{customer.email}</Table.Cell>
											<Table.Cell className="text-white">{customer.phoneNo}</Table.Cell>
										</Table.Row>
									))
								)}
							</Table.Body>
						</Table.Root>
					</div>
				</div>
			)}
		</section>
	);
}