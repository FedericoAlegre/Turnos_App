'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

export default function Calendar() {
  return (
    <div className="container mx-auto p-10">
      <FullCalendar
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin
        ]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridDay,timeGridWeek,dayGridMonth'
        }}
        initialView='timeGridWeek'
        nowIndicator={true}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        events={[
          { title: 'Turno 1', start: '2024-05-27T09:00:00', end: '2024-05-27T10:00:00' },
          { title: 'Turno 2', start: '2024-05-27T11:00:00', end: '2024-05-27T12:00:00' },
          { title: 'Turno 3', start: '2024-05-27T14:00:00', end: '2024-05-27T15:00:00' },
          { title: 'Turno 4', start: '2024-05-27T16:00:00', end: '2024-05-27T17:00:00' },
          { title: 'Turno 5', start: '2024-05-27T09:00:00', end: '2024-05-27T10:00:00' },
          { title: 'Turno 6', start: '2024-05-27T11:00:00', end: '2024-05-27T12:00:00' },
          { title: 'Turno 7', start: '2024-05-27T14:00:00', end: '2024-05-27T15:00:00' },
          { title: 'Turno 8', start: '2024-05-27T16:00:00', end: '2024-05-27T17:00:00' },
          { title: 'Turno 9', start: '2024-05-27T09:00:00', end: '2024-05-27T10:00:00' },
          { title: 'Turno 10', start: '2024-05-27T11:00:00', end: '2024-05-27T12:00:00' }
        ]}
        locale='es'
        height="auto"
      />
    </div>
  )
}
