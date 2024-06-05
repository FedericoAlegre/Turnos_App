import { format, isSunday } from 'date-fns';
import { toast } from 'react-toastify';
import { fetchAppointments, deleteAppointment, updateAppointment } from '@/api/api';

export const handleEditClick = (appointment, setEditing, setEditData) => {
  setEditing(appointment.id);
  setEditData({
    id: appointment.id,
    clientId: appointment.client.id,
    client: {
      name: appointment.client.name,
      phone: appointment.client.phone
    },
    serviceId: appointment.service.id,
    date: appointment.date,
    hour: appointment.hour,
    totalPrice: appointment.service.price
  });
  
};

export const handleDeleteClick = async (id, setAppointments) => {
  try {
    await deleteAppointment(id, localStorage.getItem('authToken'));
    const updatedAppointments = await fetchAppointments(localStorage.getItem('authToken'));
    setAppointments(updatedAppointments);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    if (error.response && error.response.status === 401) {
      toast.error('No autorizado. Por favor, inicie sesión de nuevo.');
    } else {
      toast.error('Error al eliminar el turno');
    }
  }
};

export const handleEditChange = (event, editData, setEditData, services) => {
  const { name, value } = event.target;

  if (name === 'name' || name === 'phone') {
    setEditData(prevData => ({
      ...prevData,
      client: {
        ...prevData.client,
        [name]: value
      }
    }));
  } else {
    let updatedData = { ...editData, [name]: value };

    if (name === 'serviceId') {
      const selectedService = services.find(service => service.id.toString() === value);
      if (selectedService) {
        updatedData.totalPrice = selectedService.price;
      }
    }

    setEditData(updatedData);
  }
};

export const handleDateChange = (date, setEditData) => {
  setEditData(prevData => ({
    ...prevData,
    date: format(date, 'yyyy-MM-dd')
  }));
};

export const handleTimeChange = (event, setEditData) => {
  setEditData(prevData => ({
    ...prevData,
    hour: event.target.value
  }));
};

export const handleEditSubmit = async (event, editData, setEditing, setAppointments) => {
  event.preventDefault();
  try {
    await updateAppointment(editData, localStorage.getItem('authToken'));
    setEditing(null);
    const updatedAppointments = await fetchAppointments(localStorage.getItem('authToken'));
    setAppointments(updatedAppointments);
  } catch (error) {
    console.error('Error updating appointment:', error);
    if (error.response && error.response.status === 401) {
      toast.error('No autorizado. Por favor, inicie sesión de nuevo.');
    } else {
      toast.error('Error al actualizar el turno');
    }
  }
};

export const handlePageChange = (pageNumber, setCurrentPage) => {
  setCurrentPage(pageNumber);
};

export const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

export const isDateSelectable = (date) => {
  const today = new Date();
  return date >= today && !isSunday(date);
};