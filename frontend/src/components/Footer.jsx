import Link from 'next/link';
import { FaRegCopyright } from "react-icons/fa6";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import Image from 'next/image';
import landing from '../../public/mareatech.png'

const Footer = () => {
  return (
    <div>
      <div className='bg-dark-blue flex flex-col gap-10 justify-center items-center py-12'>
        <div className='flex text-white gap-10'>
          <FiInstagram />
          <FiFacebook />
          <FiTwitter />
        </div>
        <Image src={landing} alt='' className='w-1/6'/>
        <Link href={'/turnos'} className='bg-orange text-black font-bold py-2 px-6 rounded-lg shadow shadow-black'>Agendar Turno</Link>
      </div>
      <div className='flex justify-between p-4 bg-white text-dark-blue flex-col items-center md:flex-row'>
        <div className='flex items-center gap-x-2'>
          <FaRegCopyright />
          <p className="text-sm lg:text-base">2024 Marea Tech.</p>
        </div>
        <div className='flex text-lg lg:text-xl items-center gap-x-3'>
          <Link href={''} target='_BLANK'><FaWhatsapp /></Link>
          <Link href={''} target='_BLANK'><FaLinkedinIn /></Link>
          <Link href={''} target='_BLANK'><FaInstagram /></Link>
        </div>
      </div>
    </div>
  )
}

export default Footer;