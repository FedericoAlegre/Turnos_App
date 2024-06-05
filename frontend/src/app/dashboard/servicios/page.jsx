import ProtectedRoute from "@/components/ProtectedRoute";
import ServiceForm from "@/components/ServiceForm";
import ServiceTable from "@/components/ServiceTable";
import SideBar from "@/components/SideBar";

const Servicios = () => {

  return (
    <ProtectedRoute>
      <div className="flex flex-col-reverse md:flex-row">
        <SideBar />
        <div className="mx-auto">
          <ServiceForm />
          <ServiceTable />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Servicios;