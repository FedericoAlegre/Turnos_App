'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { format, isSunday } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Turnos = () => {
  const [appointments, setAppointments] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ id: '', client: { name: '', phone: '' }, date: '', hour: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 10;
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);
  const { logout } = useAuth();

  useEffect(() => {
    fetchAppointments();
  }, [currentPage]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5139/api/Appointment', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleEditClick = (appointment) => {
    setEditing(appointment.id);
    setEditData({ ...appointment });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5139/api/Appointment/delete/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      });
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

  const handleEditChange = (event) => {
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

  const handleDateChange = (date) => {
    setEditData(prevData => ({
      ...prevData,
      date: format(date, 'yyyy-MM-dd')
    }));
  };

  const handleTimeChange = (event) => {
    setEditData(prevData => ({
      ...prevData,
      hour: event.target.value
    }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:5139/api/Appointment/update`, editData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      });
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const iLast = currentPage * appointmentsPerPage;
  const iFirst = iLast - appointmentsPerPage;
  const currentAppointments = appointments.slice(iFirst, iLast);

  const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const isDateSelectable = (date) => {
    const today = new Date();
    return date >= today && !isSunday(date);
  };

  return (
    <div className="container mx-auto p-4 md:p-10">
      <div className="overflow-x-auto">
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Teléfono</th>
                <th className="py-3 px-6 text-left">Fecha</th>
                <th className="py-3 px-6 text-left">Hora</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentAppointments.map(appointment => (
                editing === appointment.id ? (
                  <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">
                      <input
                        type="text"
                        name="name"
                        value={editData.client.name}
                        onChange={handleEditChange}
                        className="py-2 px-4 rounded-lg text-black w-40"
                      />
                    </td>
                    <td className="py-3 px-6 text-left">
                      <input
                        type="text"
                        name="phone"
                        value={editData.client.phone}
                        onChange={handleEditChange}
                        className="py-2 px-4 rounded-lg text-black w-40"
                      />
                    </td>
                    <td className="py-3 px-6 text-left">
                      <DatePicker
                        selected={editData.date ? new Date(editData.date) : null}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        filterDate={isDateSelectable}
                        dateFormat="yyyy-MM-dd"
                        className="py-2 px-4 rounded-lg text-black w-40"
                      />
                    </td>
                    <td className="py-3 px-6 text-left">
                      <select
                        name="hour"
                        value={editData.hour}
                        onChange={handleTimeChange}
                        className="py-2 px-4 rounded-lg text-black w-40"
                      >
                        {times.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-6 flex gap-2 justify-center">
                      <button
                        onClick={handleEditSubmit}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Guardar
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setEditing(null)}>Cancelar</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{appointment.client.name}</td>
                    <td className="py-3 px-6 text-left">{appointment.client.phone}</td>
                    <td className="py-3 px-6 text-left">{appointment.date}</td>
                    <td className="py-3 px-6 text-left">{appointment.hour}</td>
                    <td className="py-3 px-6 text-left flex gap-5 justify-center">
                      <button onClick={() => handleEditClick(appointment)} className="text-blue-500 text-xl">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteClick(appointment.id)} className="text-red-500 text-xl">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-l"
          >
            Anterior
          </button>
          {[...Array(totalPages).keys()].map(page => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={`px-4 py-2 ${currentPage === page + 1 ? 'bg-dark-blue text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-r"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Turnos;
