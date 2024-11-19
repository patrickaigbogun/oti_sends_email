"use client";

import { useState } from 'react';
import { DotsThreeCircle } from "@phosphor-icons/react/dist/ssr";
import Logo from './header_logo';

export default function Drawer() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDrawer = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative z-10">
			<button
				className={` transition-all ${isOpen ? 'invisible' : 'visible'}`}
				onClick={toggleDrawer}>
				<DotsThreeCircle size={32} />
			</button>
			<div className={`fixed top-0 bg-black bg-opacity-40 backdrop-blur-lg shadow-lg left-0 h-full w-64 p-2 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
				<span className='flex flex-row justify-between' >
					<Logo />
					<button
						onClick={toggleDrawer}
					>
						<DotsThreeCircle size={32} />
					</button>
				</span>
				<section>
					<ul>
						<li>Home</li>
						<li>Template</li>
						<li>Orders</li>
						<li>History</li>
					</ul>
				</section>
			</div>
		</div>
	);
}
