import React from "react";

import { SidebarTrigger } from "./ui/sidebar";
import ModeSwitcher from "./mode-switcher";

export default function Header() {
  return (
    <header className="p-8 w-full flex justify-between sticky top-0 z-50">
      <SidebarTrigger />
      <ModeSwitcher />
    </header>
  );
}
