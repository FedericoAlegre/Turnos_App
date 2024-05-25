import Background from '@/components/Background';
import Form from '@/components/Form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Turnos = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Background />
      <Form />
      <ToastContainer />
    </div>
  )
}

export default Turnos;