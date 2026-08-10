import { Caveat } from "next/font/google";
import { cn } from "@/lib/utils";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-2">
      <h1 className={cn("text-4xl font-bold text-[#0A3D62] drop-shadow-sm", caveat.className)}>
        {label}
      </h1>
    </div>
  );
};
