'use client';
import { useEffect, useState } from 'react';
import { fetchServices } from '@/api/api';
import { handleChange, handleDateChange, handleSubmit, handleTimeChange, isDateSelectable, times, validate } from '@/api/formHandlers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Form = () => {
  const [data, setData] = useState({
    client: {
      name: '',
      phone: ''
    },
    serviceId: '',
    totalPrice: '',
    date: '',
    hour: ''
  });

  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const servicesData = await fetchServices();
        setServices(servicesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServicesData();
  }, []);

  const activeServices = services.filter(service => service.isActive);

  return (
    <div className='flex flex-col md:flex-row gap-5 bg-dark-blue text-white py-12 px-4 md:px-32 rounded-2xl shadow-lg shadow-black'>
      <div>
        <h1 className="text-center text-2xl font-bold mb-5">AGENDAR TURNO</h1>
        <form className='flex flex-col gap-5' onSubmit={(e) => handleSubmit(e, data, setErrors, validate)}>

          <div className="flex flex-col gap-2">
            <label>Nombre Completo *</label>
            <input
              type='text'
              name='name'
              placeholder='Ej: Juan Perez'
              value={data.client.name}
              onChange={(e) => handleChange(e, data, setData, services)}
              className="py-2 px-4 rounded-lg text-black"
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Teléfono *</label>
            <input
              type='text'
              name='phone'
              placeholder='Ej: 2231111111'
              value={data.client.phone}
              onChange={(e) => handleChange(e, data, setData, services)}
              className="py-2 px-4 rounded-lg text-black"
            />
            {errors.phone && <span className="text-red-500">{errors.phone}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Seleccione Fecha *</label>
            <DatePicker
              selected={data.date ? new Date(data.date) : null}
              onChange={(date) => handleDateChange(date, setData)}
              minDate={new Date()}
              filterDate={isDateSelectable}
              dateFormat="yyyy-MM-dd"
              className="py-2 px-4 rounded-lg text-black w-full"
              placeholderText="Seleccione una fecha"
            />
            {errors.date && <span className="text-red-500">{errors.date}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Seleccione Horario *</label>
            <select
              name="hour"
              value={data.hour}
              onChange={(e) => handleTimeChange(e, setData)}
              className="py-2 px-4 rounded-lg text-black w-full"
            >
              <option value="">Selecciona un horario</option>
              {times.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
            {errors.hour && <span className="text-red-500">{errors.hour}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Seleccione Servicio *</label>
            <select
              name="serviceId"
              value={data.serviceId}
              onChange={(e) => handleChange(e, data, setData, services)}
              className="py-2 px-4 rounded-lg text-black w-full"
            >
              <option value="">Selecciona un servicio</option>
              {activeServices.map((service) => (
                <option key={service.id} value={service.id}>{service.name} - ${service.price}</option>
              ))}
            </select>
            {errors.serviceId && <span className="text-red-500">{errors.serviceId}</span>}
          </div>

          <button type='submit' className='bg-orange text-black font-bold py-2 px-6 rounded-lg shadow shadow-black'>Agendar Turno</button>

        </form>
      </div>
    </div>
  );
}

export default Form;