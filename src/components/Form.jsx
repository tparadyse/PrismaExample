'use client'

import React, { useState, useEffect } from 'react';
import Modal from "@/components/Modal";
import RacerForm from "@/components/RacerForm";
import { IconEdit, IconTrash } from '@tabler/icons-react';

/* async function fetchRacerData() {
  const racers = await fetch('http://localhost:3000/api/registros');
  return racers.json();
} */

const Form = () => {
  const [racerData, setRacerData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [editedRacer, setEditedRacer] = useState({});
  const [deletedRacer, setDeletedRacer] = useState({});

  const fetchRacer = () => {
    fetch("/api/registros")
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => {
        setRacerData(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  useEffect(() => {
      fetchRacer();
    }, []);

  // Función para manejar la acción de guardar (creación o edición)
  const saveRacer = async (racer) => {
    if (!racer.id) {
      await fetch("/api/registros", {
        method: "POST",
        body: JSON.stringify(racer),
        headers: {
          "Content-type": "application/json",
        },
      });
    } else {
      await fetch("/api/registros/" + racer.id, {
        method: "PUT",
        body: JSON.stringify(racer),
        headers: {
          "Content-type": "application/json",
        },
      });
      setEditedRacer({});
    }
    //setIsModalOpen(false);
    fetchRacer();
  };

  //Funcion para editar algun corredor
  const editRacer = (racer) => {
    setEditedRacer(racer);
    setIsModalEditOpen(true);
  };

  //Funcion para eliminar un corredor
  const deleteRacer = async () => {
    await fetch("/api/registros/" + deletedRacer.id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    setDeletedRacer({});
    fetchRacer();
  };

  return (
    <div className="bg-no-repeat bg-cover h-screen text-gray-600 bg-center">
      <h1 className='text-white bg-black bg-opacity-50 text-4xl text-center pt-5 pb-5 mt-5'>SCORE INTERNATIONAL OFF ROAD RACING</h1>
      {racerData.length > 0 ? (
        <div className="flex justify-center items-center h-auto" /*h-full*/>
          <div className="w-2/3">
            <h2 className="text-2xl text-center mt-16 mb-4 text-white">Información de los Corredores</h2>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white p-2 rounded">Agregar Corredor</button>
            <div className="overflow-y-auto max-h-96">
              {racerData.map((racer, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-200 rounded border border-gray-400 text-lg">
                  <p className="text-gray-700">Nombre: {racer.nombre}</p>
                  <p className="text-gray-700">Edad: {racer.edad}</p>
                  <p className="text-gray-700">Género: {racer.genero}</p>
                  <p className="text-gray-700">Clase: {racer.clase}</p>
                  {/* Puedes agregar más campos según los datos en tu archivo JSON */}
                  <div className='mt-3 space-x-5'>
                  <button onClick={() => editRacer(racer)}>
                    <IconEdit size={20} className='text-yellow-500'/>
                  </button>
                  <button onClick={() => {
                    setDeletedRacer(racer);
                    setIsModalDeleteOpen(true);
                  }}>
                    <IconTrash size={20} className='text-red-600'/>
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white text-center mt-20">Cargando datos...</p>
      )}
      
      {/* Ventana emergente para crear/editar/eliminar corredores */}
      <Modal isOpen={isModalOpen}>
          <h2 className="text-2xl font-bold text-center my-4">
            Nuevo Corredor Off Road
          </h2>
          <RacerForm
            saveRacer={saveRacer}
            onClose={() => setIsModalOpen(false)}
            isEditing={false}
          />
        </Modal>

        <Modal isOpen={isModalEditOpen}>
          <h2 className="text-2xl font-bold text-center my-4">
            Editar Corredor Off Road
          </h2>
          <RacerForm
            saveRacer={saveRacer}
            onClose={() => setIsModalEditOpen(false)}
            isEditing={true}
            {...editedRacer}
            editedRacer={editedRacer}
          />
        </Modal>

        <Modal isOpen={isModalDeleteOpen}>
          <h2 className="text-2xl font-bold text-center my-4">
            Estas seguro de Eliminar a {deletedRacer.nombre}?
          </h2>
          <div className="flex space-x-6 mt-10">
            <button
              type="button"
              className="bg-red-600 px-4 py-2 text-white font-semibold rounded-md w-full"
              onClick={() => {
                deleteRacer();
                setIsModalDeleteOpen(false);
              }}
            >
              Eliminar
            </button>
            <button
              type="button"
              className="bg-blue-500 px-4 py-2 text-white font-semibold rounded-md w-full"
              onClick={() => {
                setDeletedRacer({});
                setIsModalDeleteOpen(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </Modal>
    </div>
  );
}

export default Form;

