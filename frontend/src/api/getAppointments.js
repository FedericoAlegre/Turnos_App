import axios from 'axios';

const BASE_URL = 'http://localhost:5139/api/Appointment';

// GET APPOINTMENTS
export const getAppointments = async (authToken) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = response.data.map(appointment => ({
      ...appointment,
      date: (appointment.date)
    }));
    return data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// CREATE APPOINTMENTS
export const createAppointment = async (appointment, authToken) => {
  try {
    const response = await axios.post(BASE_URL, appointment, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// UPDATE APPOINTMENTS
export const updateAppointment = async (appointment, authToken) => {
  try {
    await axios.post(`${BASE_URL}/update`, appointment, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

// DELETE APPOINTMENTS
export const deleteAppointment = async (id, authToken) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};