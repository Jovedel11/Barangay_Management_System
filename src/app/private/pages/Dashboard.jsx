import { useAuth } from "@/hooks/useAuthProvider";
import StatsCard from "../components/dashboard/StastsCard";
import RecentDocsReq from "../components/dashboard/RecentDocsReq";
import QuickActions from "../components/dashboard/QuickActions";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="w-full flex flex-col px-4">
      <span className="text-3xl font-extrabold">
        Welcome back, {user?.first_name ?? "No user found"}!
      </span>
      <span className="text-slate-400">
        Access free and affordable community services in our barangay
      </span>
      <div className="mt-4">
        <StatsCard />
      </div>
      <div className="w-full grid grid-cols-12 gap-6 mt-4">
        <div className="col-span-12 md:col-span-7">
          <RecentDocsReq />
        </div>
        <div className="col-span-12 md:col-span-5">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
