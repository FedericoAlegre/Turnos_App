import Calendar from "@/components/Calendar";
import ProtectedRoute from "@/components/ProtectedRoute";
import SideBar from "@/components/SideBar";

const Calendario = () => {

  return (
    <ProtectedRoute>
      <div className="flex flex-col-reverse md:flex-row">
        <SideBar />
        <Calendar />
      </div>
    </ProtectedRoute>
  );
};

export default Calendario;