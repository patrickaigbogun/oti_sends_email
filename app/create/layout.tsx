import { Metadata } from "next";



export const metadata: Metadata = {
	title: "Invoice Automation Service",
	description: "Created by Patrick Aigbogun",
};


export default function CreateLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>){
<html>
    <body>
        children
    </body>
</html>

}