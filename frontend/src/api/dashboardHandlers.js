// src/api/dashboardHandlers.js
import axios from "axios";

export const fetchAppointmentsData = async () => {
  const response = await axios.get('http://localhost:5139/api/Appointment');
  return response.data;
};

export const processAppointmentsData = (data) => {
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

  return { summaryData, upcomingData, appointmentsPerDayArray, topClientsArray };
};

export const prepareAppointmentsPerDayData = (appointmentsPerDay) => {
  return {
    labels: appointmentsPerDay.map(item => item.date),
    datasets: [
      {
        label: 'Turnos',
        data: appointmentsPerDay.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };
};