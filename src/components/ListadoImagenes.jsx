import React from 'react'
import Imagen from './Imagen'

const ListadoImagenes = ({imagenes}) => {
    return (
        <div className="col-12 p-5 row">
            {imagenes.map(item=> {
                return (
                    <Imagen key={item.id} imagen={item}/>
                )
            })}
        </div>
    )
}

export default ListadoImagenes
