const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {
  return ( 
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background p-4 sm:p-8">
      {children}
    </div>
   );
}
 
export default AuthLayout;
