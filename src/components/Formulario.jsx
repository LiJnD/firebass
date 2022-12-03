import React from 'react'
import { useState } from 'react'
import { db } from '../firebase'
import { collection, doc, addDoc } from 'firebase/firestore'

const Formulario = () => {

    const [Ropa, setRopa] = useState('')
    const [Descripcion, setDescripcion] = useState('')
    const [ListaRopa, setListaRopa] = useState([])

    const GuardarRopa = async (e) => {
        e.preventDefault()
        try {
            const data = await addDoc(collection(db, 'Ropa'), {
                nombreRopa: Ropa,
                nombreDescripcion: Descripcion
            })
        }catch(error){
            console.log(error)
        }
}

    return (
        <div className='container mt-5'>
            <h1 className="text-cent">BesrkhaRoot</h1>
            <hr />
            <div className='row'>
                <div className='col-8'>
                    <h4 className="text-center">Listado de Ropas</h4>
                    <ul className='list-group'>
                        <li className='list-group-item'>Ropa One</li>
                        <li className='list-group-item'>Ropa Two</li>
                    </ul>
                </div>
                <div className='col-4'>
                    <h4 className='text-center'>Agregar Ropa</h4>
                    <form onSubmit={GuardarRopa}>
                        <input type="text" className='form-control mb-2' placeholder='Ingrese Ropa' value={Ropa} onChange = {(e)=>setRopa(e.target.value)} />
                        <input type="text" className='form-control mb-2' placeholder='Ingrese Descripción' value={Descripcion} onChange = {(e)=>setDescripcion(e.target.value)}/>
                        <button className="btn btn-primary btn-block" on="submit">Agregar</button>
                        <button className="btn btn-dark btn-block mx-2">Cancelar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario
