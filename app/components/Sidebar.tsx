import Image from "next/image";
import Link from "next/link";

import SidebarNavigation from "./sidebar/Navigation";
import SidebarStandings from "./sidebar/Standings";
import UserCard from "./sidebar/UserCard";

import PitlaneFeverLogo from "@/app/assets/images/pflogo.png";

export default function Sidebar() {
  return (
    <div className="w-4/12 flex flex-col justify-start items-start gap-2 -mt-4">
      <Link href="/">
        <Image
          src={PitlaneFeverLogo}
          width={116}
          height={30}
          alt="Pitlane Fever Logo"
        />
      </Link>
      <UserCard />
      <SidebarStandings />
      <SidebarNavigation />
    </div>
  );
}
