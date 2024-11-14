'use client';


import { PlusCircle } from "@phosphor-icons/react";
import { Heading } from "@radix-ui/themes";
import Link from "next/link";


export default function HeroCreatePage() {
    return (
        <section className="space-y-8" >
            <Heading>Here you can choose to create your customers, invoices, reciepts, etc</Heading>
            <section className="h-fit grid grid-cols-3 gap-4">
                <Link className="bg-gradient-to-br from-teal-400 to-gray-800 flex object-cover h-48 items-center justify-center rounded-xl brightness-75" href={''}>
                    <PlusCircle size={56} />
                </Link>
                <Link className="bg-gradient-to-br from-violet-500 to-orange-300 flex object-cover h-48 items-center justify-center rounded-xl brightness-75" href={''}>
                    <PlusCircle size={56} />
                </Link>
                <Link className="bg-gradient-to-br from-neutral-600 via-orange-200 flex to-stone-700 object-cover h-48 items-center justify-center rounded-xl brightness-75" href={''}>
                    <PlusCircle size={56} />
                </Link>
            </section>
        </section>
    );
}
