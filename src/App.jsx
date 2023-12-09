import { useEffect, useState } from 'react'

import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [pagina, setPagina] = useState(1);
  const [peliculaValue, setPeliculaValue] = useState('');
  const [peliculas,setPeliculas]= useState([])

  
  const btnAnterior = document.getElementById('btnAnterior');

  const btnSiguiente = document.getElementById('btnSiguiente');
  // input 
  const pelicula = document.querySelector("input.buscador");
  // boton buscar
  const aceptar = document.querySelector("button.btn-buscador");


  const obtenerPeliculas = async()=>{
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=20517e8c24f9c7547bb99bae8f234cdd&language=es-MX&page=${pagina}`);
      if(respuesta.status === 200){
        pagina += '';
        const datos = await respuesta.json();
			
			  
        document.getElementById('contenedor').innerHTML = peliculas;

      }
    } catch (error) {
      console.log(error);
    }
    
    
   }

  useEffect(()=>{
    obtenerPeliculas()
  },[pagina])
   
  const buscarPeliculas = async () => {
    try {
      const respuesta = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${peliculaValue}&api_key=20517e8c24f9c7547bb99bae8f234cdd&language=es-MX`
      );

      if (respuesta.status === 200) {
        const datos = await respuesta.json();

        setPeliculas(datos.results);
      } else {
        console.log('Hubo un error en la búsqueda');
      }
    } catch (error) {
      console.log(error);
    }
  }; 

  const handleInputChange = (event) => {
    setPeliculaValue(event.target.value);
  };

  const handleBuscarClick = () => {
    buscarPeliculas();
  };

  const handleSiguienteClick = () => {
    if (pagina < 1000) {
      setPagina(pagina + 1);
      cargarPeliculas();
    }
  };

  const handleAnteriorClick = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
      cargarPeliculas();
    }
  };

  return (
    <>
    <div>
      <div className='contenedor-buscador'>
        <p className='titulo-buscador'>Ingrese el nombre de la pelicula </p>
        <input className='buscador' type="text" placeholder=' Escribe el nombre de la pelicula'  value={peliculaValue} onChange={handleInputChange} />
        <button className='btn-buscador' onClick={handleBuscarClick} >Buscar</button>

      </div>
      {
        peliculas.map(peliculas =>
          <>
          <div className='contenedor' key={peliculas.id}>

            <img className='poster' src={`https://image.tmdb.org/t/p/w400/${peliculas.poster_path}`} alt={peliculas.title} />
           
            <h3 class="titulo">{peliculas.name}</h3>
          </div></>
        
        )

      }
    </div>
    <div className='paginacion'>
    <button id="btnAnterior" onClick={handleAnteriorClick}>Anterior</button>
		<button id="btnSiguiente" onClick={handleSiguienteClick}>Siguiente</button>
    </div>

   
        
    </>
  )
}



export default App
