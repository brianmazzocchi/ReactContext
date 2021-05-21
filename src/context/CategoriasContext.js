//Se importa el paquete de CreateContext
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react'

//Crear el context 
export const CategoriasContext = createContext();

//Crear el provider, donde se encuentran las funcions y el state.
//Siempre es un arrow funcion y siempre se le pasan props
const CategoriasProvider = (props) => {

    //Crear el state del context
    const [categorias, guardarCategorias] = useState([]);

    //ejecutar el llamado a la api
    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categorias = await axios.get(url)   
            
            guardarCategorias(categorias.data.drinks);
        }
        obtenerCategorias();
    }, [])

    
    //Lo que va a fluir
    return (

        //Utilizamos el context declarado como que fuera componente
        //Lo que pasamos en VALUE va a estar disponible en todos los componentes.
        //En el App.js reemplazar el Fragment principal por este componente.
        <CategoriasContext.Provider
            value={{
                categorias
            }}        
        >
            {/* De esta forma, los diferentes componentes (app, formulario) van a estar adentro del props.children para pasar los datos */}
            {props.children} 
        </CategoriasContext.Provider>        
    )
}

export default CategoriasProvider;
