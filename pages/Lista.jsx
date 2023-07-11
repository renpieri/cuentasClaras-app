import { Link, useNavigate  } from 'react-router-dom'
import { useState } from 'react';


function Lista ({personas, setDinero, dinero}) {


    const persona = personas.map((e,i) => {
        return(
            <div key={i} className="mt-4 flex items-center justify-between">
            <p className="w-1/2 text-2xl text-left">{e.nombre}</p>
            <p className="w-1/4 text-left">${e.dinero}</p>
            <Link className='btnPago p-1 rounded' to={`/agregarDinero/${e.id}`}>Sumar $</Link>
        </div>
        )
    })

    return(
        <>
            {persona}
        <Link to={'/calcular'} className="btn mt-6 bg-gradient-to-r from-pink-300 via-orange-300 to-white text-white font-semibold py-3 rounded-md w-1/2">Calcular</Link>
        </>
    )
}


export default Lista