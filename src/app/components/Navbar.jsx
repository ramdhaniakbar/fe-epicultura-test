import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="sticky flex justify-between items-center top-0 z-40 bg-gradient-to-r from-[#101212] to-[#296377] py-4 px-6">
      {/* Logo & Nama */}
      <div className="flex items-center gap-2">
        <Image src="/images/ftl.png" alt="FTL Logo" layout="intrinsic" width={100} height={100} />
        <span className="text-white font-bold text-lg">iMeeting</span>
      </div>

      {/* Notifikasi & Profile */}
      <div className="flex items-center gap-6">
        <Bell className="text-white text-lg cursor-pointer" />

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src={'/images/profile.png'} alt="Profile Logo" className="rounded-full" layout="intrinsic" width={20} height={20} />
          <span className="text-white font-medium">John Doe</span>
          <span className="text-white">
            <ChevronDown />
          </span>
        </div>
      </div>
    </div>
  );
}