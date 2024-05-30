import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

const Nosotros = () => {
  return (
    <div className='flex flex-col md:flex-row gap-10 py-10 md:py-20 bg-white'>
      <h2 className='text-2xl md:text-4xl font-bold md:-rotate-90 md:mt-28 md:-mr-32 mx-auto md:mx-0'>NUESTRO EQUIPO</h2>
      <div className="flex flex-col items-center">
        <div className='w-72 h-60 md:w-80 md:h-72 bg-slate-500 rounded-lg'>
          <p className="flex w-full h-full items-end justify-center p-8 text-orange font-bold">Nombre Apellido</p>
        </div>
        <div className="flex justify-center gap-5 md:gap-10 p-4">
          <FiInstagram />
          <FiFacebook />
          <FiTwitter />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className='w-72 h-60 md:w-80 md:h-72 bg-slate-500 rounded-lg'>
          <p className="flex w-full h-full items-end justify-center p-8 text-orange font-bold">Nombre Apellido</p>
        </div>
        <div className="flex justify-center gap-5 md:gap-10 p-4">
          <FiInstagram />
          <FiFacebook />
          <FiTwitter />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className='w-72 h-60 md:w-80 md:h-72 bg-slate-500 rounded-lg'>
          <p className="flex w-full h-full items-end justify-center p-8 text-orange font-bold">Nombre Apellido</p>
        </div>
        <div className="flex justify-center gap-5 md:gap-10 p-4">
          <FiInstagram />
          <FiFacebook />
          <FiTwitter />
        </div>
      </div>
    </div>
  )
}

export default Nosotros;