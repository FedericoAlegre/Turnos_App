import Image from 'next/image';
import logo from '../../public/mareatech.png';
import Link from 'next/link';
import { RiDashboardFill, RiScissors2Fill, RiCalendar2Fill, RiServiceFill } from "react-icons/ri";

const SideBar = () => {
  return (
    <div>
      <div className='flex-col h-full w-60 bg-dark-blue md:flex hidden'>
        <Image src={logo} alt='Logo' className='p-4'/>
        <hr className='p-4'/>
        <ul className='flex flex-col text-white'>
          <Link href={'/dashboard'} className='p-4 hover:bg-orange '>Dashboard</Link>
          <Link href={'/dashboard/turnos'} className='p-4 hover:bg-orange '>Turnos</Link>
          <Link href={'/dashboard/calendario'} className='p-4 hover:bg-orange '>Calendario</Link>
          <Link href={'/dashboard/servicios'} className='p-4 hover:bg-orange '>Servicios</Link>
        </ul>
      </div>

      <div className='md:hidden fixed bottom-0 left-0 right-0 bg-dark-blue z-10'>
        <ul className='text-white flex justify-around'>
          <Link href={'/dashboard'} className='p-4 text-2xl '><RiDashboardFill /></Link>
          <Link href={'/dashboard/turnos'} className='p-4 text-2xl '><RiScissors2Fill /></Link>
          <Link href={'/dashboard/calendario'} className='p-4 text-2xl '><RiCalendar2Fill /></Link>
          <Link href={'/dashboard/servicios'} className='p-4 text-2xl '><RiServiceFill /></Link>
        </ul>
      </div>
    </div>
  )
}

export default SideBar;