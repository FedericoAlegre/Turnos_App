'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5139/login', {
        username,
        password,
      });
      localStorage.setItem('authToken', response.data.token);
      toast.success('Inicio de sesión exitoso');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-dark-blue text-white py-2 rounded hover:scale-105 transition-all">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;