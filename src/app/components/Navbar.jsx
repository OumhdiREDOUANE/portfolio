"use client";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {

 

  const menuItems = ["Work", "Services", "Contact","About"];

  return (
    <nav className="w-full flex justify-center py-4">
      <ul className="flex gap-32">
        {menuItems.map((item) => (
          <li key={item} className="relative group cursor-pointer">
            <span className="text-black font-semibold">{item}</span>
            {/* underline */}
            <span
              className="
                absolute left-1/2 -bottom-1
                h-[2px] w-0 bg-black
                transition-all duration-300
                group-hover:w-full
                group-hover:left-0
              "
            />
          </li>
        ))}

      
      </ul>
    </nav>
  );
}
