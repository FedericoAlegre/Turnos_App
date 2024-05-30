'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Turnos = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7092/api/Appointment')
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

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
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {appointments.map(appointment => (
                <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{appointment.client.name}</td>
                  <td className="py-3 px-6 text-left">{appointment.client.phone}</td>
                  <td className="py-3 px-6 text-left">{appointment.date}</td>
                  <td className="py-3 px-6 text-left">{appointment.hour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Turnos;