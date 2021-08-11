import Formulario from "./components/Formulario";
import React from "react";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  const [busqueda, setBusqueda] = React.useState("");
  const [imagenes, setImagenes] = React.useState([]);
  const [paginaActual, setPaginaActual] = React.useState(1);
  const [totalPaginas, setTotalPaginas] = React.useState(1);

  React.useEffect(() => {
    const consultarAPI = async () => {
      if (!busqueda.trim()) {
        return;
      }
      const imagenesPorPagina = 30;
      const key = "22871000-bb0b3b655327f2077884a30ae";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const imagenes = await respuesta.json();
      setImagenes(imagenes.hits);

      const calcularTotalPaginas = Math.ceil(
        imagenes.totalHits / imagenesPorPagina
      );

      setTotalPaginas(calcularTotalPaginas);

      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };

    consultarAPI();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;

    if (nuevaPaginaActual === 0) {
      return;
    }

    setPaginaActual(nuevaPaginaActual);
  };

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;

    if (nuevaPaginaActual > totalPaginas) {
      return;
    }

    setPaginaActual(nuevaPaginaActual);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario
          setBusqueda={setBusqueda}
          setPaginaActual={setPaginaActual}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />
        {paginaActual === 1 ? null : (
          <button
            className="btn btn-info mr-1 mb-4"
            type="button"
            onClick={() => paginaAnterior()}
          >
            &laquo; Anterior
          </button>
        )}

        {paginaActual === totalPaginas ? null : (
          <button
            className="btn btn-info mb-4"
            type="button"
            onClick={() => paginaSiguiente()}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
