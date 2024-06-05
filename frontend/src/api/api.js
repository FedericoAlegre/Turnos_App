import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5139/api';

export const fetchServices = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/Service`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    toast.error('Error al obtener los servicios');
    throw error;
  }
};

export const fetchAppointments = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/Appointment`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const deleteAppointment = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/Appointment/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    toast.success('Turno eliminado');
    return response.data;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    if (error.response && error.response.status === 404) {
      toast.error('Turno no encontrado');
    } else {
      toast.error('Error al eliminar el turno');
    }
    throw error;
  }
};

export const updateAppointment = async (editData, token) => {
  try {
    await axios.post(`${API_URL}/Appointment/update`, editData, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    toast.success('Turno actualizado');
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

export const createAppointment = async (data) => {
  try {
    await axios.post(`${API_URL}/Appointment`, data);
  } catch (error) {
    console.error('Error creating appointment:', error);
    toast.error('Hubo un error al agendar el turno.');
    throw error;
  }
};

export const createService = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/Service/`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    toast.error('Error al crear el servicio');
    throw error;
  }
};

export const updateService = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/Service/update`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating service:', error);
    toast.error('Error al actualizar el servicio');
    throw error;
  }
};