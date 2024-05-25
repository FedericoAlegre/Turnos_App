'use client'
import { useState } from 'react';
import { toast } from 'react-toastify';

const Form = () => {
  const [data, setData] = useState({
    fullName: '',
    phone: '',
    date: '',
    branch: 'Peña',
    time: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleTimeChange = (event) => {
    setData({ ...data, time: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes hacer una llamada a una API para enviar los datos
    console.log('Datos del formulario:', data);
    toast.success(
      <div>
        <strong>Turno agendado:</strong><br />
        <strong>Nombre:</strong> {data.fullName}<br />
        <strong>Fecha:</strong> {data.date}<br />
        <strong>Sucursal:</strong> {data.branch}<br />
        <strong>Hora:</strong> {data.time}
      </div>
    );
  };

  const times = ['09:00', '10:00', '11:00', '12:00', '13:00'];

  return (
    <div className='flex flex-col gap-5 bg-dark-blue text-white py-12 px-32 w-1/2 rounded-2xl shadow-lg shadow-black'>
      <h1 className="text-center text-2xl font-bold">AGENDAR TURNO</h1>
      <form className='flex flex-col gap-10' onSubmit={handleSubmit}>

        <div className="flex flex-col gap-2">
          <label>Nombre Completo</label>
          <input
            type='text'
            name='fullName'
            placeholder='Ej: Juan Perez'
            value={data.fullName}
            onChange={handleChange}
            className="py-2 px-4 rounded-lg text-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Telefono</label>
          <input
            type='text'
            name='phone'
            placeholder='Ej: 2231111111'
            value={data.phone}
            onChange={handleChange}
            className="py-2 px-4 rounded-lg text-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Seleccione Fecha</label>
          <input
            type='date'
            name='date'
            value={data.date}
            onChange={handleChange}
            className="py-2 px-4 rounded-lg text-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Seleccione Sucursal</label>
          <select
            name='branch'
            value={data.branch}
            onChange={handleChange}
            className="py-2 px-4 rounded-lg text-black"
          >
            <option>Peña</option>
            <option>Falucho</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label>Seleccione Horario</label>
          <div className="flex flex-wrap gap-2">
            {times.map((time) => (
              <label
                key={time}
                className={`flex items-center border border-white py-2 px-6 rounded-lg transition-colors ${data.time === time ? 'bg-orange text-black' : ''}`}
              >
                <input
                  type="radio"
                  name="time"
                  value={time}
                  checked={data.time === time}
                  onChange={handleTimeChange}
                  className="hidden"
                />
                {time}
              </label>
            ))}
          </div>
        </div>
        <button type='submit' className='bg-orange text-black font-bold py-2 px-6 rounded-lg shadow shadow-black'>Agendar Turno</button>

      </form>
    </div>
  );
}

export default Form;