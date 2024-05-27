import Image from 'next/image';
import logo from '../../public/mareatech.png';
import Link from 'next/link';

const SideBar = () => {
  return (
    <div className='flex flex-col w-48 h-screen bg-dark-blue'>
      <Image src={logo} alt='' className='p-4'/>
      <hr className='p-4'/>
      <ul className='flex flex-col text-white'>
        <Link href={'/dashboard/turnos'} className='p-4 hover:bg-orange '>Turnos</Link>
        <Link href={'/dashboard/calendario'} className='p-4 hover:bg-orange '>Calendario</Link>
      </ul>
    </div>
  )
}

export default SideBar;