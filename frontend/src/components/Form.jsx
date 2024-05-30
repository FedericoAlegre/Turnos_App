'use client'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useEmblaCarousel from 'embla-carousel-react';

const Form = () => {

  const [emblaRef, emblaApi] = useEmblaCarousel()

  const [data, setData] = useState({
    client: {
      name: '',
      phone: ''
    },
    date: '',
    hour: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'name' || name === 'phone') {
      setData(prevData => ({
        ...prevData,
        client: {
          ...prevData.client,
          [name]: value
        }
      }));
    } else {
      setData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleTimeChange = (event) => {
    setData(prevData => ({
      ...prevData,
      hour: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('https://localhost:7092/api/Appointment', data)
      .then(response => {
        console.log(response.data);
        toast.success(
          <div>
            <strong>Turno agendado:</strong><br />
            <strong>Nombre:</strong> {data.client.name}<br />
            <strong>Fecha:</strong> {data.date}<br />
            <strong>Hora:</strong> {data.hour}
          </div>
        );
      })
      .catch(error => {
        console.error(error);
        toast.error('Hubo un error al agendar el turno.');
      });
  };

  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  return (
    <div className='flex flex-col md:flex-row gap-5 bg-dark-blue text-white py-12 px-4 md:px-32 rounded-2xl shadow-lg shadow-black'>
      <div>
        <h1 className="text-center text-2xl font-bold mb-5">AGENDAR TURNO</h1>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>

          <div className="flex flex-col gap-2">
            <label>Nombre Completo</label>
            <input
              type='text'
              name='name'
              placeholder='Ej: Juan Perez'
              value={data.client.name}
              onChange={handleChange}
              className="py-2 px-4 rounded-lg text-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Teléfono</label>
            <input
              type='text'
              name='phone'
              placeholder='Ej: 2231111111'
              value={data.client.phone}
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
            <label>Seleccione Horario</label>
            <div className="overflow-hidden max-w-xs md:max-w-lg" ref={emblaRef}>
              <div className='flex'>
                {times.map((hour) => (
                  <div className='embla__slide'>
                  <label
                    key={hour}
                    className={`flex items-center border border-white mx-2 py-2 px-6 rounded-lg transition-colors ${data.hour === hour ? 'bg-orange text-black' : ''}`}
                  >
                    <input
                      type="radio"
                      name="hour"
                      value={hour}
                      checked={data.hour === hour}
                      onChange={handleTimeChange}
                      className="hidden"
                    />
                    {hour}
                  </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button type='submit' className='bg-orange text-black font-bold py-2 px-6 rounded-lg shadow shadow-black'>Agendar Turno</button>

        </form>
      </div>
    </div>
  );
}

export default Form;
