const Services = () => {
  return (
    <div className='flex flex-col items-center gap-10 py-10 md:py-20 bg-dark-blue text-white'>
      <h2 className='text-4xl md:text-6xl font-bold text-center'>SERVICIOS</h2>
      <h3 className="text-sm md:text-lg text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos perspiciatis odio error incidunt fugit neque sequi fuga est animi optio.</h3>
      <div className='flex flex-col md:flex-row gap-12'>
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </div>
  )
}

const ServiceCard = () => {
  return (
    <div className='bg-white text-dark-blue rounded-lg shadow-md'>
      <div className='w-72 h-60 md:w-80 md:h-72 bg-slate-400 rounded-t-lg'></div>
      <div className='flex justify-between p-2'>
        <p>Corte de pelo</p>
        <span>$3000</span>
      </div>
    </div>
  )
}

export default Services;
