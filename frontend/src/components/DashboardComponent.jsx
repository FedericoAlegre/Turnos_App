'use client';
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { fetchAppointmentsData, processAppointmentsData, prepareAppointmentsPerDayData } from '@/api/dashboardHandlers';

const DashboardComponent = () => {
  const [summary, setSummary] = useState({});
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [appointmentsPerDay, setAppointmentsPerDay] = useState([]);
  const [topClients, setTopClients] = useState([]);

  useEffect(() => {
    fetchAppointmentsData()
      .then(data => {
        const processedData = processAppointmentsData(data);
        setSummary(processedData.summaryData);
        setUpcomingAppointments(processedData.upcomingData);
        setAppointmentsPerDay(processedData.appointmentsPerDayArray);
        setTopClients(processedData.topClientsArray);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const appointmentsPerDayData = prepareAppointmentsPerDayData(appointmentsPerDay);

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
            {appointmentsPerDay.length > 0 ? (
              <Bar data={appointmentsPerDayData} />
            ) : (
              <p>Cargando datos...</p>
            )}
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