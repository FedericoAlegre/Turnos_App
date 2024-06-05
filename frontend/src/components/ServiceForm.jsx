'use client';
import { useState } from "react";
import { handleChange, handleSubmit } from '../api/serviceFormHandlers';

const ServiceForm = () => {
  const [data, setData] = useState({
    name: '',
    price: '',
    isActive: true
  });
  const [errors, setErrors] = useState({});

  return (
    <div className="container mx-auto p-4 md:p-10">
      <div className="bg-white shadow-md rounded my-6 p-5">
        <h1 className="text-center text-2xl font-bold mb-5 text-gray-600">AGREGAR SERVICIO</h1>
        <form className='flex flex-col gap-5' onSubmit={(e) => handleSubmit(e, data, setErrors, setData)}>
          <div className="flex flex-col gap-2">
            <label>Servicio</label>
            <input 
              type="text"
              name="name"
              placeholder="Ej: Corte de Pelo"
              value={data.name}
              onChange={(e) => handleChange(e, setData)}
              className="py-2 px-4 rounded-lg text-black"
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Precio</label>
            <input 
              type="text"
              name="price"
              placeholder="Ej: 3000"
              value={data.price}
              onChange={(e) => handleChange(e, setData)}
              className="py-2 px-4 rounded-lg text-black"
            />
            {errors.price && <span className="text-red-500">{errors.price}</span>}
          </div>

          <button type='submit' className='bg-orange text-black font-bold py-2 px-6 rounded-lg shadow shadow-black'>Agregar Servicio</button>

        </form>
      </div>
    </div>
  )
}

export default ServiceForm;