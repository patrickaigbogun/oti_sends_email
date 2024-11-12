import { Metadata } from "next";
import CreateSegmentControl from "../components/create_segmented_control";



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
        <CreateSegmentControl />
        {children}
    </body>
</html>

}