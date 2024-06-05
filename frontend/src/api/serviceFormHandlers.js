import { createService } from './api';
import { toast } from 'react-toastify';

export const handleChange = (event, setData) => {
  const { name, value } = event.target;
  setData(prevData => ({
    ...prevData,
    [name]: value
  }));
};

export const validate = (data) => {
  const newErrors = {};
  if (!data.name) newErrors.name = 'El nombre es obligatorio';
  if (!data.price) newErrors.price = 'El precio es obligatorio';
  return newErrors;
};

export const handleSubmit = (event, data, setErrors, setData) => {
  event.preventDefault();

  const validationErrors = validate(data);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  createService(data, localStorage.getItem('authToken'))
    .then(response => {
      setErrors({});
      setData({ name: '', price: '', isActive: true });
      toast.success(
        <div>
          <strong>Servicio Creado</strong><br />
          <strong>Nombre:</strong> {data.name}<br />
          <strong>Precio:</strong> {data.price}<br />
        </div>
      );
    })
    .catch(error => {
    toast.error('Hubo un error al agregar el servicio.');
    });
};