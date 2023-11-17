"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Globe from "@/app/assets/icons/Globe";
import User from "@/app/assets/icons/User";
import UsersGroup from "@/app/assets/icons/UsersGroup";

const navData = [
  {
    title: "Live Feed",
    href: "/",
    icon: <Globe />,
  },
  {
    title: "Users",
    href: "/users",
    icon: <UsersGroup />,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: <User />,
  },
];

export default function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col justify-start items-start">
      {navData.map((nav) => (
        <Link
          key={nav.title}
          href={nav.href}
          className={`w-full flex justify-start items-center gap-4 p-3 rounded-3xl transition-all duration-500 ease-in-out text-write  ${
            pathname === nav.href
              ? "text-primary"
              : "hover:text-white hover:gap-6"
          }`}
        >
          <span className="text-2xl">{nav.icon}</span>
          <span>{nav.title}</span>
        </Link>
      ))}
    </div>
  );
}
