import type { Metadata } from "next";
import CreateLayoutHeader from "../components/create_layout_header";


export const metadata: Metadata = {
	title: "Create your templates",
	description: "Created by Patrick Aigbogun",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className='w-full'>
			<CreateLayoutHeader />
			<section>
				{children}
			</section>

		</section>

	);
}
