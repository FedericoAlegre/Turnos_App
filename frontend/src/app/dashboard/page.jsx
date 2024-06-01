import DashboardComponent from "@/components/DashboardComponent";
import ProtectedRoute from "@/components/ProtectedRoute";
import SideBar from "@/components/SideBar";

const Dashboard = () => {

  return (
    <ProtectedRoute>
      <div className="flex flex-col-reverse md:flex-row">
        <SideBar />
        <DashboardComponent />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;