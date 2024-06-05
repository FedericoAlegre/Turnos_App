import { fetchAppointments } from './api';
import { toast } from 'react-toastify';

export const getFormattedAppointments = async (token) => {
  try {
    const appointments = await fetchAppointments(token);
    return appointments.map(appointment => ({
      title: `${appointment.client.name} - ${appointment.client.phone}`,
      start: `${appointment.date}T${appointment.hour}`,
      end: `${appointment.date}T${(parseInt(appointment.hour.split(':')[0]) + 1).toString().padStart(2, '0')}:${appointment.hour.split(':')[1]}`
    }));
  } catch (error) {
    console.error('Error fetching appointments:', error);
    toast.error('Error al obtener los turnos');
    throw error;
  }
};