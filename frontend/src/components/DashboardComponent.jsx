'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const DashboardComponent = () => {
  const [summary, setSummary] = useState({});
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [appointmentsPerDay, setAppointmentsPerDay] = useState([]);
  const [topClients, setTopClients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7092/api/Appointment')
      .then(response => {
        const data = response.data;

        const appointments = data.map(appointment => ({
          client: appointment.client,
          date: appointment.date,
          hour: appointment.hour
        }));

        const summaryData = {
          dailyAppointments: appointments.filter(appt => new Date(appt.date).toDateString() === new Date().toDateString()).length,
          weeklyAppointments: appointments.filter(appt => {
            const apptDate = new Date(appt.date);
            const now = new Date();
            const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
            const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
            return apptDate >= weekStart && apptDate <= weekEnd;
          }).length,
          uniqueClients: [...new Set(appointments.map(appt => appt.client.name))].length
        };

        const upcomingData = appointments.filter(appt => new Date(appt.date) >= new Date()).slice(0, 5);

        const appointmentsPerDayData = appointments.reduce((acc, curr) => {
          const date = curr.date.split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        const appointmentsPerDayArray = Object.keys(appointmentsPerDayData).map(date => ({
          date,
          count: appointmentsPerDayData[date]
        }));

        const topClientsData = appointments.reduce((acc, curr) => {
          const clientName = curr.client.name;
          acc[clientName] = (acc[clientName] || 0) + 1;
          return acc;
        }, {});
        const topClientsArray = Object.keys(topClientsData).map(name => ({
          name,
          count: topClientsData[name]
        })).sort((a, b) => b.count - a.count).slice(0, 5);

        setSummary(summaryData);
        setUpcomingAppointments(upcomingData);
        setAppointmentsPerDay(appointmentsPerDayArray);
        setTopClients(topClientsArray);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const appointmentsPerDayData = {
    labels: appointmentsPerDay.map(item => item.date),
    datasets: [
      {
        label: 'Turnos',
        data: appointmentsPerDay.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-lg font-bold">Resumen de Turnos</h2>
          <p>Total de Turnos del Día: {summary.dailyAppointments}</p>
          <p>Total de Turnos de la Semana: {summary.weeklyAppointments}</p>
          <p>Total de Clientes Únicos: {summary.uniqueClients}</p>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-lg font-bold">Próximos Turnos</h2>
          <ul>
            {upcomingAppointments.map((appointment, index) => (
              <li key={index}>
                {appointment.client.name} - {appointment.client.phone} - {appointment.date} {appointment.hour}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded p-4 col-span-1 md:col-span-2">
          <h2 className="text-lg font-bold">Turnos por Día</h2>
          <div className="overflow-x-auto">
            <Bar data={appointmentsPerDayData} />
          </div>
        </div>
        <div className="bg-white shadow-md rounded p-4 col-span-1 md:col-span-2">
          <h2 className="text-lg font-bold">Clientes Más Frecuentes</h2>
          <ul>
            {topClients.map((client, index) => (
              <li key={index}>
                {client.name} - {client.count} turnos
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;