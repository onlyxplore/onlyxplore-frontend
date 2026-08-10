"use client";

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-[400px] shadow-2xl bg-transparent backdrop-blur-2xl border border-white/20">
      <CardHeader className="pb-4">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter className="flex flex-col gap-4 pt-0">
          <div className="flex items-center w-full gap-x-4">
            <div className="flex-1 h-px bg-[#0A3D62]/15"></div>
            <span className="text-xs text-[#0A3D62]/50 font-medium uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-[#0A3D62]/15"></div>
          </div>
          <div className="w-full">
            <Social />
          </div>
        </CardFooter>
      )}
      <CardFooter className="pt-0">
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
