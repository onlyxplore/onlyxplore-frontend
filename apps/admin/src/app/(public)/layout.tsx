interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ 
  children 
}: PublicLayoutProps) => {
  return ( 
    <div className="relative min-h-screen w-full bg-[#F7F7F2] text-[#0A3D62] selection:bg-[#3C8DAD]/30">
      <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#3C8DAD_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none"></div>
      <div className="relative z-10 flex min-h-screen flex-col">
        {children}
      </div>
    </div>
   );
}
 
export default PublicLayout;
