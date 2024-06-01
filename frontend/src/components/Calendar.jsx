'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5139/api/Appointment')
      .then(response => {
        const appointments = response.data.map(appointment => ({
          title: `${appointment.client.name} - ${appointment.client.phone}`,
          start: appointment.date + 'T' + appointment.hour,
          end: appointment.date + 'T' + (parseInt(appointment.hour.split(':')[0]) + 1).toString().padStart(2, '0') + ':' + appointment.hour.split(':')[1]
        }));
        setEvents(appointments);
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-10 mb-20">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridDay,timeGridWeek,dayGridMonth'
        }}
        initialView='timeGridDay'
        nowIndicator={true}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        events={events}
        locale='es'
        height="auto"
        contentHeight='auto'
      />
    </div>
  );
}