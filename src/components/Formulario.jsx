import React from "react";
import Error from "./Error";

const Formulario = ({ setBusqueda, setPaginaActual }) => {
  const [termino, setTermino] = React.useState("");
  const [error, setError] = React.useState(false);

  const buscarImagenes = (e) => {
    e.preventDefault();

    if (!termino.trim()) {
      setError(true);
      return;
    }

    setError(false);
    setPaginaActual(1);
    setBusqueda(termino);
  };

  return (
    <form onSubmit={(e) => buscarImagenes(e)}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            name=""
            id=""
            className="form-control form-control-lg"
            placeholder="Busca algo ejemplo: Cafe"
            onChange={(e) => setTermino(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            name=""
            id=""
            className="btn btn-lg btn-danger btn-block w-100"
            value="Buscar"
          />
        </div>
      </div>
      {error ? <Error mensaje="Agrega un termino de busqueda" /> : null}
    </form>
  );
};

export default Formulario;
