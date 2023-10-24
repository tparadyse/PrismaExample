'use client'
import React, { useState, useEffect } from 'react';

const RacerForm = ({ onClose, saveRacer, racerData, isEditing, editedRacer,

    nombre: existingName,
    genero: existingGender,
    edad: existingAge,
    clase: existingClass,
  }) => {
  const [nombre, setNombre] = useState(existingName || '');
  const [edad, setEdad] = useState(existingAge || '');
  const [genero, setGenero] = useState(existingGender || '');
  const [clase, setClase] = useState(existingClass || '');
  const [error, setError] = useState('');

  // Llena los campos si hay datos existentes para editar
  useEffect(() => {
    if (racerData) {
      setNombre(racerData.nombre);
      setEdad(racerData.edad);
      setGenero(racerData.genero);
      setClase(racerData.clase);
    }
  }, [racerData]);

  // Función para manejar la acción de guardar (creación o edición)
  const handleSave = () => {
    if (!nombre || !edad || !genero || !clase) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (isNaN(edad)) {
      setError('La edad debe ser un número.');
      return;
    }

    setError(''); // Limpiar el mensaje de error

    const racer = { nombre, edad, genero, clase };
    if (isEditing) {
      // Si se está editando, enviar el ID del corredor
      racer.id = editedRacer.id;
    }
    saveRacer(racer);

    onClose();
  };

  return (
    <div className="modal">
      <h2>{isEditing ? 'Editar Corredor' : 'Crear Corredor'}</h2>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="text" placeholder="Edad" value={edad} onChange={(e) => setEdad(e.target.value)} />
      <select
        required
        className={`${genero === "" ? "text-[#9CA3AF]" : "text-black"}`}
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
      >
        <option className="text-gray-500" value="" disabled>
          Genero
        </option>
        <option className="text-black" value="Masculino">
          Masculino
        </option>
        <option className="text-black" value="Femenino">
          Femenino
        </option>
      </select>
      <input type="text" placeholder="Clase" value={clase} onChange={(e) => setClase(e.target.value)} />

      {error && <p className="text-red-600">{error}</p>}

      <div className="flex space-x-6 mt-10">
        <button
          type="button"
          className="bg-blue-500 px-4 py-2 text-white font-semibold rounded-md w-full"
          onClick={handleSave}
        >
          Guardar
        </button>
        <button
          type="button"
          className="bg-red-600 px-4 py-2 text-white font-semibold rounded-md w-full"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default RacerForm;

