'use client';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { fetchAppointments, fetchServices } from '@/api/api';
import { handleDateChange, handleEditChange, handleEditClick, handleEditSubmit, handlePageChange, handleTimeChange, times, isDateSelectable, handleDeleteClick } from '@/api/tableHandlers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Turnos = () => {
  const [appointments, setAppointments] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ id: '', serviceId: '', date: '', hour: '', totalPrice: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [services, setServices] = useState([]);
  const appointmentsPerPage = 10;
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const appointmentsData = await fetchAppointments(token);
        setAppointments(appointmentsData);
        const servicesData = await fetchServices(token);
        setServices(servicesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInitialData();
  }, [currentPage]);

  const currentAppointments = appointments.slice((currentPage - 1) * appointmentsPerPage, currentPage * appointmentsPerPage);

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
                <th className="py-3 px-6 text-left">Servicio</th>
                <th className="py-3 px-6 text-left">Precio</th>
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
                        onChange={(e) => handleEditChange(e, editData, setEditData, services)}
                        className="py-2 px-4 rounded-lg text-black w-40"
                      />
                    </td>
                    <td className="py-3 px-6 text-left">
                      <input
                        type="text"
                        name="phone"
                        value={editData.client.phone}
                        onChange={(e) => handleEditChange(e, editData, setEditData, services)}
                        className="py-2 px-4 rounded-lg text-black w-40"
                      />
                    </td>
                    <td className="py-3 px-6 text-left">
                      <DatePicker
                        selected={editData.date ? new Date(editData.date) : null}
                        onChange={(date) => handleDateChange(date, setEditData)}
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
                        onChange={(e) => handleTimeChange(e, setEditData)}
                        className="py-2 px-4 rounded-lg text-black w-40"
                      >
                        {times.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <select
                        name="serviceId"
                        value={editData.serviceId}
                        onChange={(e) => handleEditChange(e, editData, setEditData, services)}
                        className="py-2 px-4 rounded-lg text-black w-40"
                      >
                        <option value="">Selecciona un servicio</option>
                        {services.map(service => (
                          <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <input
                        type="text"
                        name="totalPrice"
                        value={editData.totalPrice}
                        readOnly
                        className="py-2 px-4 rounded-lg text-black w-40"
                      />
                    </td>
                    <td className="py-3 px-6 flex gap-2 justify-center">
                      <button
                        onClick={(e) => handleEditSubmit(e, editData, setEditing, setAppointments)}
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
                    <td className="py-3 px-6 text-left">{appointment.service.name}</td>
                    <td className="py-3 px-6 text-left">$ {appointment.service.price}</td>
                    <td className="py-3 px-6 text-left flex gap-5 justify-center">
                      <button onClick={() => handleEditClick(appointment, setEditing, setEditData)} className="text-blue-500 text-xl">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteClick(appointment.id, setAppointments)} className="text-red-500 text-xl">
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
            onClick={() => handlePageChange(currentPage - 1, setCurrentPage)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-l"
          >
            Anterior
          </button>
          {[...Array(totalPages).keys()].map(page => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1, setCurrentPage)}
              className={`px-4 py-2 ${currentPage === page + 1 ? 'bg-dark-blue text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1, setCurrentPage)}
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