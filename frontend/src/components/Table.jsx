
const Table = () => {

    // Datos de ejemplo (ficticios)
    const appointments = [
      { id: 1, name: 'John Doe', phone: '123456789', date: '2024-06-01', branch: 'Peña', time: '09:00' },
      { id: 2, name: 'Jane Smith', phone: '987654321', date: '2024-06-02', branch: 'Falucho', time: '10:30' },
      { id: 3, name: 'Alice Johnson', phone: '555123456', date: '2024-06-03', branch: 'Falucho', time: '14:00 ' },
    ];

  return (
    <div className="container mx-auto">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Telefono</th>
              <th className="py-3 px-6 text-left">Fecha</th>
              <th className="py-3 px-6 text-left">Hora</th>
              <th className="py-3 px-6 text-left">Sucursal</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {appointments.map(appointment => (
              <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{appointment.name}</td>
                <td className="py-3 px-6 text-left">{appointment.phone}</td>
                <td className="py-3 px-6 text-left">{appointment.date}</td>
                <td className="py-3 px-6 text-left">{appointment.time}</td>
                <td className="py-3 px-6 text-left">{appointment.branch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table;