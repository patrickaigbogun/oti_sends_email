"use client";

import React, { useState } from 'react';
import { DotsThreeCircle } from "@phosphor-icons/react/dist/ssr";

export default function Drawer() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDrawer = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative z-10">
			<button
				className={` transition-all ${isOpen ? 'invisible' : 'visible'}`}
				onClick={toggleDrawer}
			>
				<DotsThreeCircle size={32} />
			</button>
			<div
				className={`fixed top-0 bg-black bg-opacity-40 backdrop-blur-lg shadow-lg left-0 h-full w-64 p-4 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
			>
				<span className='flex flex-row justify-between' >
					<h3 className="text-lg font-medium mb-2">Drawer Content</h3>
					<button
						onClick={toggleDrawer}
					>
						<DotsThreeCircle size={32} />
					</button>
				</span>
				<p>This is the content that will be displayed in the drawer.</p>
			</div>
		</div>
	);
}
