import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import FormPersona from '../pages/FormPersona'
import FormDinero from '../pages/FormDinero'
import Lista from '../pages/Lista'
import Calcular from '../pages/Calcular'

function App() {

  const [ personas, setPersonas  ] = useState([])
  const [ dinero, setDinero  ] = useState([])

  return (
    <BrowserRouter>
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-50 via-orange-50 to-white">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 lg:backdrop-filter backdrop-blur-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Calculador de gastos</h1>
            <Link to={'/agregarPersonas'} className='btn mt-6 bg-gradient-to-r from-pink-300 via-orange-300 to-white text-white font-semibold py-3 rounded-md w-full'>Agregar personas</Link>
              <Routes>
                <Route path='/agregarPersonas' element={<FormPersona personas={personas} setPersonas={setPersonas}/>}/>
                <Route path='/lista' element={<Lista personas={personas} setDinero={setDinero} dinero={dinero}/>}/>
                <Route path='/agregarDinero/:id' element={<FormDinero personas={personas} setPersonas={setPersonas}/>}/>
                <Route path='/calcular' element={<Calcular personas={personas}/>}/>
              </Routes>
              
        </div>
      </main>
    </BrowserRouter>
    
  )
}

export default App


