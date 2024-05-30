import Calendar from "@/components/Calendar";
import SideBar from "@/components/SideBar";

const Calendario = () => {

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <SideBar />
      <Calendar />
    </div>
  );
};

export default Calendario;