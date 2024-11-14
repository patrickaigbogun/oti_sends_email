import type { Metadata } from "next";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/header";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
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
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased text-white p-0 m-0 font-bold `}
			>
				<ThemeProvider attribute="class">

					<Theme accentColor="purple" grayColor="mauve" radius="large">
						<section className="mx-auto w-[95%] sm:w-[75%">
							<Header />
							{children}
						</section>
					</Theme>
				</ThemeProvider >

			</body>
		</html>
	);
}
