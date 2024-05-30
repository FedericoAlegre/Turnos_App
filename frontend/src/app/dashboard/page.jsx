import DashboardComponent from "@/components/DashboardComponent";
import SideBar from "@/components/SideBar";

const Dashboard = () => {

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <SideBar />
      <DashboardComponent />
    </div>
  );
};

export default Dashboard;