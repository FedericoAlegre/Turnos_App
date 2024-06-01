'use client';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useEmblaCarousel from 'embla-carousel-react';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";
import DatePicker from 'react-datepicker';
import { format, isSunday } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Form = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const router = useRouter();

  const [data, setData] = useState({
    client: {
      name: '',
      phone: ''
    },
    date: '',
    hour: ''
  });

  const [errors, setErrors] = useState({});

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

  const handleDateChange = (date) => {
    setData(prevData => ({
      ...prevData,
      date: format(date, 'yyyy-MM-dd')
    }));
  };

  const handleTimeChange = (event) => {
    setData(prevData => ({
      ...prevData,
      hour: event.target.value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!data.client.name) newErrors.name = 'El nombre es obligatorio';
    if (!data.client.phone) newErrors.phone = 'El teléfono es obligatorio';
    if (!data.date) newErrors.date = 'La fecha es obligatoria';
    if (!data.hour) newErrors.hour = 'La hora es obligatoria';

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.post('http://localhost:5139/api/Appointment', data)
      .then(response => {
        toast.success(
          <div>
            <strong>Turno agendado:</strong><br />
            <strong>Nombre:</strong> {data.client.name}<br />
            <strong>Fecha:</strong> {data.date}<br />
            <strong>Hora:</strong> {data.hour}
          </div>
        );
        setErrors({});
        setTimeout(() => {
          router.push('/');
        }, 6000);
      })
      .catch(error => {
        toast.error('Hubo un error al agendar el turno.');
      });
  };

  const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const isDateSelectable = (date) => {
    const today = new Date();
    return date >= today && !isSunday(date);
  };

  return (
    <div className='flex flex-col md:flex-row gap-5 bg-dark-blue text-white py-12 px-4 md:px-32 rounded-2xl shadow-lg shadow-black'>
      <div>
        <Link href={'/'}><IoArrowBackCircle className='text-4xl mb-5' /></Link>
        <h1 className="text-center text-2xl font-bold mb-5">AGENDAR TURNO</h1>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>

          <div className="flex flex-col gap-2">
            <label>Nombre Completo *</label>
            <input
              type='text'
              name='name'
              placeholder='Ej: Juan Perez'
              value={data.client.name}
              onChange={handleChange}
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
              onChange={handleChange}
              className="py-2 px-4 rounded-lg text-black"
            />
            {errors.phone && <span className="text-red-500">{errors.phone}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Seleccione Fecha *</label>
            <DatePicker
              selected={data.date ? new Date(data.date) : null}
              onChange={handleDateChange}
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
            <div className='flex items-center gap-2'>
              <span className="text-2xl cursor-pointer" onClick={scrollPrev}><MdNavigateBefore /></span>
              <div className="overflow-hidden max-w-xs md:max-w-lg" ref={emblaRef}>
                <div className='flex'>
                  {times.map((hour) => (
                    <div className='embla__slide' key={hour}>
                      <label className={`flex items-center border border-white mx-2 py-2 px-6 rounded-lg transition-colors ${data.hour === hour ? 'bg-orange text-black' : ''}`}>
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
              <span className="text-2xl cursor-pointer" onClick={scrollNext}><MdNavigateNext /></span>
            </div>
            {errors.hour && <span className="text-red-500">{errors.hour}</span>}
          </div>

          <button type='submit' className='bg-orange text-black font-bold py-2 px-6 rounded-lg shadow shadow-black'>Agendar Turno</button>

        </form>
      </div>
    </div>
  );
}

export default Form;
