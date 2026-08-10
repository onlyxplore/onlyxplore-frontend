import { LogoutButton } from "@/components/auth/logout-button";
import { FiLogOut } from "react-icons/fi";

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] space-y-4">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      <LogoutButton>
        <div className="flex items-center text-background bg-foreground px-4 py-2 rounded-lg hover:bg-foreground/90 transition-colors">
            <FiLogOut className="w-5 h-5 mr-2" />
            Sign Out
        </div>
      </LogoutButton>
    </div>
  );
};

export default DashboardPage;
