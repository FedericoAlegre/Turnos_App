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
    axios.get('http://localhost:5139/api/Appointment')
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
          <h2 className="text-lg font-bold mb-2">Resumen de Turnos</h2>
          <div className="space-y-1">
            <p><span className="font-semibold">Turnos del Día:</span> {summary.dailyAppointments}</p>
            <p><span className="font-semibold">Turnos de la Semana:</span> {summary.weeklyAppointments}</p>
            <p><span className="font-semibold">Clientes Únicos:</span> {summary.uniqueClients}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-lg font-bold mb-2">Próximos Turnos</h2>
          <ul className="space-y-2">
            {upcomingAppointments.map((appointment, index) => (
              <li key={index} className="flex justify-between">
                <div className="flex-1">
                  <p className="font-semibold">{appointment.client.name}</p>
                  <p className="text-sm text-gray-600">{appointment.client.phone}</p>
                </div>
                <div className="flex-1 text-right">
                  <p className="font-semibold">{new Date(appointment.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{appointment.hour}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded p-4 col-span-1 md:col-span-2">
          <h2 className="text-lg font-bold mb-2">Turnos por Día</h2>
          <div className="overflow-x-auto">
            <Bar data={appointmentsPerDayData} />
          </div>
        </div>
        <div className="bg-white shadow-md rounded p-4 col-span-1 md:col-span-2 mb-12">
          <h2 className="text-lg font-bold mb-2">Clientes Más Frecuentes</h2>
          <ul className="space-y-1">
            {topClients.map((client, index) => (
              <li key={index} className="flex justify-between">
                <span className="font-semibold">{client.name}</span>
                <span>{client.count} turnos</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;