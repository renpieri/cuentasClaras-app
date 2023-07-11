import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import shortid from 'shortid';

function FormPersona({ agregarPersonas, personas, setPersonas }) {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [error, setError] = useState(false);

  function handleName(e) {
    setNombre(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

      if(nombre === ''){
        setError(true)
        return
      }

    const personaExiste = personas.find(persona => persona.id === nombre);

    if (personaExiste) {
      
      const personaActualizada = personas.map(persona => {
        if (persona.id === personaExiste.id) {
          return {
            ...persona,
            dinero: persona.dinero + parseInt(personaExiste.dinero),
          };
        }
        return persona;
      });

      setPersonas(personaActualizada);
    } else {
      const personaNueva = {
        nombre: nombre,
        id: shortid.generate(),
        dinero: 0,
      };

      setPersonas([...personas, personaNueva]);
    }
  }

  const persona = personas.map((e, i) => {
    return (
      <div key={i} className="mt-4 flex items-center justify-between">
        <p className="w-1/2 text-2xl text-left">{e.nombre}</p>
      </div>
    );
  });

  return (
    <>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col">
        <input type="text" className="stepCount form-input text-center" name="nombre" value={nombre} onChange={handleName} placeholder="Nombre"/>
        <button className="btn mt-6 bg-gradient-to-r from-pink-300 via-orange-300 to-white text-white font-semibold py-3 rounded-md w-1/2">Agregar</button>
        {error ? <p className='text-red-500 p-2 text-center'>Por favor ingrese un nombre</p> : null}
      </form>
      {persona}

      { persona.length > 1 ? 
        <Link to={'/Lista'} className="btn mt-6 bg-gradient-to-r from-pink-300 via-orange-300 to-white text-white font-semibold py-3 rounded-md w-1/2"> Listo </Link> 
      : 
        null
      }
      
    </>
  );
}

export default FormPersona;
