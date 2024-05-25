import React from 'react'

const Services = () => {
  return (
    <div className='flex flex-col items-center gap-10 py-20 bg-dark-blue text-white'>
      <h2 className='text-6xl font-bold'>SERVICIOS</h2>
      <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos perspiciatis odio error incidunt fugit neque sequi fuga est animi optio.</h3>
      <div className='flex gap-10'>
        <div className='bg-white text-dark-blue rounded-lg'>
          <div className='w-72 h-60 bg-slate-400 rounded-t-lg'></div>
          <div className='flex justify-between p-2'>
            <p>Corte de pelo</p>
            <span>$3000</span>
          </div>
        </div>
        <div className='bg-white text-dark-blue rounded-lg'>
          <div className='w-72 h-60 bg-slate-400 rounded-t-lg'></div>
          <div className='flex justify-between p-2'>
            <p>Corte de pelo</p>
            <span>$3000</span>
          </div>
        </div>
        <div className='bg-white text-dark-blue rounded-lg'>
          <div className='w-72 h-60 bg-slate-400 rounded-t-lg'></div>
          <div className='flex justify-between p-2'>
            <p>Corte de pelo</p>
            <span>$3000</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services;