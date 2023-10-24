'use client'

import React, { useState, useEffect } from 'react';
//import 'src/components/Form.css'; // Reemplaza 'Form.css' con la ruta correcta a tu archivo de estilos

async function fetchRacerData() {
  const racers = await fetch('http://localhost:3000/api/registros');
  return racers.json();
}

const Form = () => {
  const [racerData, setRacerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRacerData();
      setRacerData(data);
    }

    fetchData();
  }, []);

  return (
    <div className="bg-no-repeat bg-cover h-screen text-gray-600 bg-center">
      <h1 className='text-white text-4xl text-center pt-5 mt-4 stroke-red-500'>SCORE INTERNATIONAL OFF ROAD RACING</h1>
      {racerData.length > 0 ? (
        <div className="flex justify-center items-center h-auto" /*h-full*/>
          <div className="w-2/3">
            <h2 className="text-2xl text-center mt-16 mb-4 text-white">Información de los Corredores</h2>
            <div className="overflow-y-auto max-h-96">
              {racerData.map((racer, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-200 rounded border border-gray-400 text-lg">
                  <p className="text-gray-700">Nombre: {racer.nombre}</p>
                  <p className="text-gray-700">Edad: {racer.edad}</p>
                  <p className="text-gray-700">Género: {racer.genero}</p>
                  <p className="text-gray-700">Clase: {racer.clase}</p>
                  {/* Puedes agregar más campos según los datos en tu archivo JSON */}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white text-center mt-20">Cargando datos...</p>
      )}
      <div>
        <button>DELETE</button>
        <button>UPDATE</button>
        <button>CREATE</button>
      </div>
    </div>
  );
}

export default Form;

