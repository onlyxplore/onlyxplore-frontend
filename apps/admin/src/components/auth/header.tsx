import Image from "next/image";
import logoImg from "../../../public/logo.png";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Image 
        src={logoImg} 
        alt="OnlyXplore Logo" 
        className="w-auto h-12 object-contain"
      />
      <p className="text-muted-foreground text-sm font-medium">
        {label}
      </p>
    </div>
  );
};
