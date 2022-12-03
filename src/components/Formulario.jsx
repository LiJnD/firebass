import React from 'react'
import { useState } from 'react'

const Formulario = () => {

const [Ropa, setRopa] = useState('')
const [Descripcion, setDescripcion] = useState('')
const [ListaRopa, setListaRopa] = useState([])


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
            <form action="">
                <input type="text" className='form-control mb-2' placeholder='Ingrese Ropa' />
                <input type="text" className='form-control mb-2' placeholder='Ingrese Descripción' />
                <button className="btn btn-primary btn-block" on = "submit">Agregar</button>
                <button className="btn btn-dark btn-block mx-2">Cancelar</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Formulario