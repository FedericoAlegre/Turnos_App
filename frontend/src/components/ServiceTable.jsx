'use client';
import { useEffect, useState } from "react";
import { FaEdit } from 'react-icons/fa';
import { handleEditClick, handleEditSubmit, handleEditChange } from '../api/serviceTableHandlers';
import { fetchServices } from "@/api/api";

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ id: '', name: '', price: '', isActive: true });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const servicesData = await fetchServices(token);
        setServices(servicesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInitialData();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-10">
      <div className="overflow-x-auto">
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Precio</th>
                <th className="py-3 px-6 text-left">Estado</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {services.map(service => (
                editing === service.id ? (
                  <tr key={service.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={(e) => handleEditChange(e, setEditData)}
                        className="py-2 px-4 rounded-lg text-black w-40"
                      />
                    </td>
                    <td className="py-3 px-6 text-left">
                      <input
                        type="text"
                        name="price"
                        value={editData.price}
                        onChange={(e) => handleEditChange(e, setEditData)}
                        className="py-2 px-4 rounded-lg text-black w-40"
                      />
                    </td>
                    <td className="py-3 px-6 text-left">
                      <select
                        name="isActive"
                        value={editData.isActive}
                        onChange={(e) => handleEditChange(e, setEditData)}
                        className="py-2 px-4 rounded-lg text-black w-40"
                      >
                        <option value={true}>Activo</option>
                        <option value={false}>Inactivo</option>
                      </select>
                    </td>
                    <td className="py-3 px-6 flex gap-2 justify-center">
                      <button
                        onClick={(e) => handleEditSubmit(e, editData, setEditing, setServices)}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Guardar
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setEditing(null)}>Cancelar</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={service.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{service.name}</td>
                    <td className="py-3 px-6 text-left">$ {service.price}</td>
                    <td className="py-3 px-6 text-left">{service.isActive ? 'Activo' : 'Inactivo'}</td>
                    <td className="py-3 px-6 text-center flex gap-5 justify-center">
                      <button onClick={() => handleEditClick(service, setEditing, setEditData)} className="text-blue-500 text-xl">
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceTable;