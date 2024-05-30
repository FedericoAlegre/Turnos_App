import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/mareatech.png';

const NavBar = () => {
  return (
    <div className='md:flex hidden justify-between items-center fixed w-full bg-dark-blue text-white p-4 shadow-md shadow-black'>
      <div className='flex items-center gap-12'>
        <Link href='/' className='md:w-1/6 w-1/2'>
          <Image src={logo} alt='Marea Tech'/>
        </Link>
        <ul className='flex gap-12'>
          <li>Inicio</li>
          <li>Servicios</li>
          <li>Nosotros</li>
        </ul>
      </div>
      <Link href={'/turnos'} className='bg-orange text-black font-bold py-2 px-6 rounded-lg shadow shadow-black'>Agendar Turno</Link>
    </div>
  )
}

export default NavBar;