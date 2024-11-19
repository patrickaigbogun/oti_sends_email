"use client";

import { useState } from "react";
import { DotsThreeCircle } from "@phosphor-icons/react";
import Logo from "./header_logo";
import { Flex } from "@radix-ui/themes";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-10">
      {/* Button to open the drawer */}
      <button
        className={`transition-all ${isOpen ? "invisible" : "visible"}`}
        onClick={toggleDrawer}
        aria-label="Open menu"
      >
        <DotsThreeCircle size={32} />
      </button>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black bg-opacity-40 backdrop-blur-lg shadow-lg p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Flex direction="row" justify="between" align="center" className="mb-4">
          <Logo />
          <button
            onClick={toggleDrawer}
            aria-label="Close menu"
            className="p-2 text-white"
          >
            <DotsThreeCircle size={32} />
          </button>
        </Flex>

        {/* NavigationMenu for Nav */}
        <NavigationMenu.Root className="flex flex-col gap-2">
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                href="#"
                className="block px-4 py-2 text-white hover:bg-indigo-500 rounded-md"
              >
                Home
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                href="#"
                className="block px-4 py-2 text-white hover:bg-indigo-500 rounded-md"
              >
                Template
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                href="#"
                className="block px-4 py-2 text-white hover:bg-indigo-500 rounded-md"
              >
                Orders
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                href="#"
                className="block px-4 py-2 text-white hover:bg-indigo-500 rounded-md"
              >
                History
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </div>
  );
}
