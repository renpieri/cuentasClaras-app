import { Link, useNavigate, useParams } from 'react-router-dom';
import { SlArrowLeft } from "react-icons/sl";
import { useState } from 'react';

function FormDinero({ personas, setPersonas }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dinero, setDinero] = useState('');

  function handleDinero(e) {
    setDinero(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    const filtroDistinto = personas.map(persona => {
      if (persona.id === id) {
        return {
          ...persona,
          dinero: parseInt(persona.dinero) + parseInt(dinero) || 0,
        };
      }
      return persona;
    });

    setPersonas(filtroDistinto);
    navigate('/lista');
  }

  return (
    <div className='flex flex-col justify-center'>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col">
        <input type="number" className="stepCount form-input text-center" value={dinero} onChange={handleDinero} name='dinero' placeholder="Ingrese el gasto"/>
        <button className="btn mt-6 bg-gradient-to-r from-pink-300 via-orange-300 to-white text-white font-semibold py-3 rounded-md w-1/2">Sumar gasto</button>
      </form>
      <Link to={'/Lista'} className='mt-6'><SlArrowLeft/></Link>
    </div>
  );
}

export default FormDinero;
