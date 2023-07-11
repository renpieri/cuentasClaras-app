import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SlArrowLeft } from 'react-icons/sl';

function Calcular({ personas }) {
  
  const navigate = useNavigate();

  const calcularBalance = () => {
    const dineroTotal = personas.reduce((total, persona) => {
      return total + parseFloat(persona.dinero || 0);
    }, 0);
    
    const dineroPromedio = dineroTotal / personas.length;

    const deudas = personas.map(persona => {
    const diferencia = persona.dinero - dineroPromedio;

      if (diferencia < 0) {
        return {
          nombre: persona.nombre,
          cantidad: Math.abs(diferencia),
          listaApagar: [],
        };
      } else if (diferencia > 0) {
        return {
          nombre: persona.nombre,
          cantidad: diferencia,
          listaApagar: [],
        };
      } else {
        return null;
      }
    }).filter(deuda => deuda !== null);

    personas.forEach(persona => {
      const diferencia = persona.dinero - dineroPromedio;

      if (diferencia > 0) {
        const deudasPendientes = deudas.filter(deuda => deuda.cantidad <= diferencia);
        deudasPendientes.forEach(deudaPendiente => {
          if (deudaPendiente.nombre !== persona.nombre) {
            deudaPendiente.listaApagar.push({
              nombre: persona.nombre,
              cantidad: Math.round(deudaPendiente.cantidad),
            });
          }
        });
      }
    });

    return deudas;
  };

  const deudas = calcularBalance();

  return (
    <div>
      <h2 className="text-2xl text-center mt-6">Lista de pagos:</h2>
      {deudas.length > 0 ? (
        deudas.map(deuda => (
          <div key={deuda.nombre} className="text-xl mt-2">
            {deuda.listaApagar.map(personaDeuda => (
              <p key={personaDeuda.nombre}>
                <span className="font-medium">{deuda.nombre}</span> le tiene que dar ${deuda.cantidad.toFixed(2)} a <span className="font-medium">{personaDeuda.nombre}</span>
              </p>
            ))}
          </div>
        ))
      ) : (
        <p className="text-xl text-center mt-2">No hay deudas</p>
      )}
      <Link to={'/Lista'} className="mt-6">
        <SlArrowLeft className="mt-6" />
      </Link>
    </div>
  );
}

export default Calcular;

