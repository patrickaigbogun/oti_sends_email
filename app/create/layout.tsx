import type { Metadata } from "next";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import localFont from "next/font/local";
import "../globals.css";
import CreateSegmentControl from "../components/create_segmented_control";
import Drawer from "../components/drawer";
import CreateLayoutHeader from "../components/create_layout_header";

const geistSans = localFont({
	src: "../fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "../fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Invoice Automation Service",
	description: "Created by Patrick Aigbogun",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section>
			<CreateLayoutHeader/>
			{/* <Drawer /> */}
			<section
				className={`${geistSans.variable} ${geistMono.variable} antialiased text-white mx-auto w-[95%] sm:w-[75%] `}
			>
				{/* <CreateSegmentControl /> */}
				{children}
			</section>

		</section>

	);
}
