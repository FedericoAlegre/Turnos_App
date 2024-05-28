import Link from "next/link";
import Background from "./Background";

const Landing = () => {
  return (
    <div>
      <Background />
      <div className="flex flex-col items-center h-screen justify-center gap-10 text-white">
        <h1 className="text-8xl font-bold">THE BARBERHOOD</h1>
        <h2 className="text-xl">Horario de funcionamiento de 08:00 a 18:00</h2>
        <Link href={'/turnos'} className='bg-orange text-black font-bold py-2 px-6 rounded-lg shadow shadow-black'>Agendar Turno</Link>
      </div>
    </div>
  )
}

export default Landing;