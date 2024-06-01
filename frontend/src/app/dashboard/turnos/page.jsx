import ProtectedRoute from "@/components/ProtectedRoute";
import SideBar from "@/components/SideBar";
import Table from "@/components/Table";

const Turnos = () => {

  return (
    <ProtectedRoute>
      <div className="flex flex-col-reverse md:flex-row">
        <SideBar />
        <Table />
      </div>
    </ProtectedRoute>
  );
};

export default Turnos;