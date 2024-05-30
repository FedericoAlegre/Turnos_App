import SideBar from "@/components/SideBar";
import Table from "@/components/Table";

const Turnos = () => {

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <SideBar />
      <Table />
    </div>
  );
};

export default Turnos;