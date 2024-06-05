import { fetchServices, updateService } from './api';
import { toast } from 'react-toastify';

export const handleEditSubmit = async (event, editData, setEditing, setServices) => {
  event.preventDefault();
  try {
    await updateService(editData, localStorage.getItem('authToken'));
    setEditing(null);
    const updatedServices = await fetchServices(localStorage.getItem('authToken'));
    setServices(updatedServices);
    toast.success('Servicio actualizado exitosamente.');
  } catch (error) {
    toast.error('Hubo un error al actualizar el servicio.');
  }
};

export const handleEditClick = (service, setEditing, setEditData) => {
  setEditing(service.id);
  setEditData({ 
    id: service.id, 
    name: service.name, 
    price: service.price, 
    isActive: service.isActive 
  });
};

export const handleEditChange = (event, setEditData) => {
  const { name, value } = event.target;
  setEditData(prevData => ({
    ...prevData,
    [name]: name === 'isActive' ? JSON.parse(value) : value
  }));
};
