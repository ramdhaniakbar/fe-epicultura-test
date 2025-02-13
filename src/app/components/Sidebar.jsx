import { Home, User } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="h-screen w-20 bg-white shadow-md flex flex-col items-center py-8">
      {/* Home Icon */}
      <div className="bg-[#296377] p-3 rounded-lg text-white flex justify-center items-center w-12 h-12 cursor-pointer">
        <Home size={20} />
      </div>

      {/* Space between icons */}
      <div className="mt-6"></div>

      {/* User Icon */}
      <div className="text-[#296377] flex justify-center items-center w-12 h-12 cursor-pointer">
        <User size={20} />
      </div>
    </div>
  );
}