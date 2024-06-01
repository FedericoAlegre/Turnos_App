import { toast } from 'react-toastify';
import {
  getAppointments,
  updateAppointment,
  deleteAppointment
} from '../api/getAppointments';

export const fetchAppointmentsHandler = async (setAppointments, logout) => {
  try {
    const data = await getAppointments(localStorage.getItem('authToken'));
    setAppointments(data);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error('No autorizado. Por favor, inicie sesión de nuevo.');
      logout();
    } else {
      toast.error('Error al obtener los turnos');
    }
  }
};

export const handleEditClick = (appointment, setEditing, setEditData) => {
  setEditing(appointment.id);
  setEditData({ ...appointment, date: new Date(appointment.date) });
};

export const handleDeleteClick = async (id, fetchAppointments, logout) => {
  try {
    await deleteAppointment(id, localStorage.getItem('authToken'));
    toast.success('Turno eliminado');
    fetchAppointments();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    if (error.response && error.response.status === 401) {
      toast.error('No autorizado. Por favor, inicie sesión de nuevo.');
      logout();
    } else {
      toast.error('Error al eliminar el turno');
    }
  }
};

export const handleEditChange = (event, setEditData) => {
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
    setEditData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }
};

export const handleDateChange = (date, setEditData) => {
  const dateInUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  setEditData(prevData => ({
    ...prevData,
    date: dateInUTC
  }));
};

export const handleTimeChange = (event, setEditData) => {
  setEditData(prevData => ({
    ...prevData,
    hour: event.target.value
  }));
};

export const handleEditSubmit = async (event, editData, setEditing, fetchAppointments, logout) => {
  event.preventDefault();
  try {
    await updateAppointment({
      ...editData,
    }, localStorage.getItem('authToken'));
    toast.success('Turno actualizado');
    setEditing(null);
    fetchAppointments();
  } catch (error) {
    console.error('Error updating appointment:', error);
    if (error.response && error.response.status === 401) {
      toast.error('No autorizado. Por favor, inicie sesión de nuevo.');
      logout();
    } else {
      toast.error('Error al actualizar el turno');
    }
  }
};