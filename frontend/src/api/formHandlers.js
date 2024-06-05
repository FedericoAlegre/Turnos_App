import { createAppointment } from "./api";
import { format, isSunday } from 'date-fns';
import { toast } from 'react-toastify';

export const handleChange = (event, data, setData, services) => {
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
    let updatedData = { ...data, [name]: value };

    if (name === 'serviceId') {
      const selectedService = services.find(service => service.id.toString() === value);
      if (selectedService) {
        updatedData.totalPrice = selectedService.price;
      }
    }
    setData(updatedData);
  }
};

export const handleDateChange = (date, setData) => {
  setData(prevData => ({
    ...prevData,
    date: format(date, 'yyyy-MM-dd')
  }));
};

export const handleTimeChange = (event, setData) => {
  setData(prevData => ({
    ...prevData,
    hour: event.target.value
  }));
};

export const handleSubmit = (event, data, setErrors, validate) => {
  event.preventDefault();

  const validationErrors = validate(data);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  createAppointment(data)
    .then(response => {
      toast.success(
        <div>
          <strong>Turno agendado:</strong><br />
          <strong>Nombre:</strong> {data.client.name}<br />
          <strong>Fecha:</strong> {data.date}<br />
          <strong>Hora:</strong> {data.hour}<br />
          <strong>Precio Total:</strong> ${data.totalPrice}
        </div>
      );
      setErrors({});
      // Redireccionar después de 6 segundos
      setTimeout(() => {
        // Router.push('/');
      }, 6000);
    })
    .catch(error => {
      toast.error('Hubo un error al agendar el turno.');
    });
};

export const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

export const isDateSelectable = (date) => {
  const today = new Date();
  return date >= today && !isSunday(date);
};

export const validate = (data) => {
  const newErrors = {};

  if (!data.client.name) newErrors.name = 'El nombre es obligatorio';
  if (!data.client.phone) newErrors.phone = 'El teléfono es obligatorio';
  if (!data.date) newErrors.date = 'La fecha es obligatoria';
  if (!data.hour) newErrors.hour = 'La hora es obligatoria';
  if (!data.serviceId) newErrors.serviceId = 'El servicio es obligatorio';

  return newErrors;
};