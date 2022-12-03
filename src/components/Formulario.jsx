import React from 'react'
import './css/formulario.css'
import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, doc, addDoc, updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore'

const Formulario = () => {

    //Campos
    const [Img, setImg] = useState('')
    const [id, setId] = useState(0)
    const [Ropa, setRopa] = useState('')
    const [TipoRopa, setTipoRopa] = useState('')
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
                nombreTipo: TipoRopa,
                nombreDescripcion: Descripcion
            })
            setListaRopa(
                [...ListaRopa, { nombreRopa: Ropa, nombreTipo: TipoRopa,nombreDescripcion: Descripcion, id: data.id }]
            )
            setRopa('')
            setTipoRopa('')
            setDescripcion('')

        } catch (error) {
            console.log(error)
        }
    }
    //Editar item
    const EditarRopa = item => {
        setId(item.id)
        setRopa(item.nombreRopa)
        setTipoRopa(item.nombreTipo)
        setDescripcion(item.nombreDescripcion)
        setModoEdition(true)
    }

    //edicion reflejada en la lista
    const editorRopa = async e => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'Ropa', id);
            await updateDoc(docRef ,{
                nombreRopa: Ropa,
                nombreTipo: TipoRopa,
                nombreDescripcion: Descripcion
            })

            const nuevoArray = ListaRopa.map(
                item => item.id === id ? {id:id, nombreRopa: Ropa, nombreTipo: TipoRopa,nombreDescripcion: Descripcion}: item
            )

            setListaRopa(nuevoArray)
            setId('')
            setRopa('')
            setTipoRopa('')
            setDescripcion('')
            setModoEdition(false)

        } catch (error) {
            console.log(error)
        }
    }

    //eliminar items
    const EliminarRopa = async id => {
        try {
            await deleteDoc(doc(db, 'Ropa', id))
        } catch (error) {
            console.log(error)
        }
    }

    //cancelar al momento de editar
    const cancelarEdtiton = () => {
        setModoEdition(false)
        setId('')
        setRopa('')
        setTipoRopa('')
        setDescripcion('')
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
                            //botones de editar
                            ListaRopa.map(item => (
                                <li className='list-group-item' key={item.id}>
                                    <span className="lead">{item.nombreRopa}---{item.nombreTipo}---{item.nombreDescripcion}</span>
                                    <button className="btn btn-warning btn-sm fload-end" onClick={() => EditarRopa(item)}>Editar</button>
                                    <button className="btn btn-danger btn-sm fload-end mx-2" onClick={() => EliminarRopa(item.id)}>Eliminar</button>

                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='col-4'>
                    <h4 className='text-center'>{modoEdition ? 'Editando Ropa' : 'Agrege Ropa'}</h4>
                    <form onSubmit={modoEdition ? editorRopa : GuardarRopa}>
                        <input type="text" className='form-control mb-2' placeholder='Ingrese ropa' value={Ropa} onChange={(e) => setRopa(e.target.value)} />
                        <input type="text" className='form-control mb-2' placeholder='Ingrese Tipo de ropa' value={TipoRopa} onChange={(e) => setTipoRopa(e.target.value)} />
                        <input type="text" className='form-control mb-2' placeholder='Ingrese descripción' value={Descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        {
                            //botones de modificacion en el editar
                            modoEdition ? (
                                <>
                                    <button className="btn btn-warning btn-block" on="submit">Confirmar</button>
                                    <button className="btn btn-dark btn-block mx-2" onClick={() => cancelarEdtiton()}>Cancelar</button>
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
