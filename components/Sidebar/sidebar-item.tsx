import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  icon: LucideIcon;
}

const SidebarItem = ({ icon: Icon, label }: Props) => {
  return (
    <div className="flex flex-row items-center">
      {/* Mobile */}
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
        <Icon size={28} color="white" />
      </div>

      {/* Desktop */}
      <div className="relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
        <Icon size={28} color="white" />
        <p className="hidden lg:block text-xl text-white">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
