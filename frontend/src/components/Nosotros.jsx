import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

const Nosotros = () => {
  return (
    <div className='flex gap-10 py-20 bg-white'>
      <h2 className='text-2xl font-bold h-min -rotate-90 mt-28 -mr-20'>NUESTRO EQUIPO</h2>
        <div className="flex flex-col">
          <div className='w-72 h-60 bg-slate-500 rounded-lg'>
            <p className="flex w-full h-full items-end justify-center p-8 text-orange font-bold">Nombre Apellido</p>
          </div>
          <div className="flex justify-center gap-10 p-4">
            <FiInstagram />
            <FiFacebook />
            <FiTwitter />
          </div>
        </div>
        <div className="flex flex-col">
          <div className='w-72 h-60 bg-slate-500 rounded-lg'>
            <p className="flex w-full h-full items-end justify-center p-8 text-orange font-bold">Nombre Apellido</p>
          </div>
          <div className="flex justify-center gap-10 p-4">
            <FiInstagram />
            <FiFacebook />
            <FiTwitter />
          </div>
        </div>
        <div className="flex flex-col">
          <div className='w-72 h-60 bg-slate-500 rounded-lg'>
            <p className="flex w-full h-full items-end justify-center p-8 text-orange font-bold">Nombre Apellido</p>
          </div>
          <div className="flex justify-center gap-10 p-4">
            <FiInstagram />
            <FiFacebook />
            <FiTwitter />
          </div>
        </div>
    </div>
  )
}

export default Nosotros;