'use client'
import { useState } from 'react';

const Form = () => {
  const [selectedTime, setSelectedTime] = useState('');

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

  return (
    <div className='flex flex-col gap-5 bg-dark-blue text-white py-12 px-32 w-1/2 rounded-2xl shadow-lg shadow-black'>
      <h1 className="text-center text-2xl font-bold">AGENDAR TURNO</h1>
      <form className='flex flex-col gap-10'>

        <div className="flex flex-col gap-2">
          <label>Nombre Completo</label>
          <input type='text' placeholder='Juan Perez' className="py-2 px-4 rounded-lg text-black" />
        </div>

        <div className="flex flex-col gap-2">
          <label>Seleccione Fecha</label>
          <input type='date' className="py-2 px-4 rounded-lg text-black"/>
        </div>

        <div className="flex flex-col gap-2">
          <label>Seleccione Sucursal</label>
          <select className="py-2 px-4 rounded-lg text-black">
            <option>Peña</option>
            <option>Falucho</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label>Seleccione Horario</label>
          <div className="flex flex-wrap gap-2">
            {times.map((time) => (
              <label key={time} className="flex items-center">
                <input
                  type="radio"
                  name="time"
                  value={time}
                  checked={selectedTime === time}
                  onChange={handleTimeChange}
                  className="mr-2"
                />
                {time}
              </label>
            ))}
          </div>
        </div>
        <button href={'/turnos'} className='bg-orange text-black font-bold py-2 px-6 rounded-lg shadow shadow-black'>Agendar Turno</button>

      </form>
    </div>
  );
}

export default Form;
