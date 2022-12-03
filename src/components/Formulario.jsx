import React from 'react'
import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, doc, addDoc, onSnapshot, deleteDoc } from 'firebase/firestore'

const Formulario = () => {

    //Campos
    const [id, setId] = useState(0)
    const [Ropa, setRopa] = useState('')
    const [Descripcion, setDescripcion] = useState('')
    const [ListaRopa, setListaRopa] = useState([])
    const [modoEdition, setModoEdition] = useState(false)

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                await onSnapshot(collection(db, 'Ropa'), (query) => {
                    setListaRopa(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos(ListaRopa);
    }, [])
    //guardado
    const GuardarRopa = async (e) => {
        e.preventDefault()
        try {
            const data = await addDoc(collection(db, 'Ropa'), {
                nombreRopa: Ropa,
                nombreDescripcion: Descripcion
            })
            setListaRopa(
                [...ListaRopa, { nombreRopa: Ropa, nombreDescripcion: Descripcion, id: data.id }]
            )
            setRopa('')
            setDescripcion('')

        } catch (error) {
            console.log(error)
        }
    }
    //Editar item
    const EditarRopa = item => {
        setId(item.id)
        setRopa(item.nombreRopa)
        setDescripcion(item.nombreDescripcion)
        setModoEdition(true)
    }

    //eliminar items
    const EliminarRopa = async id => {
        try {
            await deleteDoc(doc(db, 'Ropa', id))
        } catch (error) {
            console.log(error)
        }
    }


    //correr programas
    return (
        <div className='container mt-5'>
            <h1 className="text-cent">BesrkhaRoot</h1>
            <hr />
            <div className='row'>
                <div className='col-8'>
                    <h4 className="text-center">Listado de Ropas</h4>
                    <ul className='list-group'>
                        {
                            ListaRopa.map(item => (
                                <li className='list-group-item' key={item.id}>
                                    <span className="lead">{item.nombreRopa}-{item.nombreDescripcion}</span>
                                    <button className="btn btn-warning btn-sm fload-end" onClick={() => EditarRopa(item)}>Editar</button>
                                    <button className="btn btn-danger btn-sm fload-end mx-2" onClick={() => EliminarRopa(item.id)}>Eliminar</button>

                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='col-4'>
                    <h4 className='text-center'>{modoEdition ? 'Editando Ropa' : 'Agrege Ropa'}</h4>
                    <form onSubmit={GuardarRopa}>
                        <input type="text" className='form-control mb-2' placeholder='Ingrese Ropa' value={Ropa} onChange={(e) => setRopa(e.target.value)} />
                        <input type="text" className='form-control mb-2' placeholder='Ingrese Descripción' value={Descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        {
                            //botones de agregar
                            modoEdition ? (
                                <>
                                    <button className="btn btn-warning btn-block" on="submit">Editar</button>
                                    <button className="btn btn-dark btn-block mx-2">Cancelar</button>
                                </>
                            )
                            :
                            <button className="btn btn-primary btn-block" on="submit">Agregar</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario
