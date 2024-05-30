import Link from "next/link";
import Background from "./Background";

const Landing = () => {
  return (
    <div>
      <Background />
      <div className="flex flex-col items-center h-screen justify-center text-white gap-10">
        <h1 className="text-4xl md:text-8xl font-bold text-center">THE BARBERHOOD</h1>
        <h2 className="text-lg md:text-xl text-center">Horario de 08:00 a 18:00</h2>
        <Link href={'/turnos'} className='bg-orange text-black font-bold py-2 px-6 rounded-lg shadow shadow-black'>Agendar Turno</Link>
      </div>
    </div>
  )
}

export default Landing;
