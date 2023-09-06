import React from "react";

// Creamos un componente funcional llamado Frutas
function Frutas() {
  // Definimos el arreglo de objetos frutas
  const frutas = [
    { id: 1, nombre: "Manzana", color: "Rojo" },
    { id: 2, nombre: "Banana", color: "Amarillo" },
    { id: 3, nombre: "Naranja", color: "Naranja" },
    // ...otros objetos de frutas
  ];

  // Usamos el método .map() para recorrer el arreglo de frutas y renderizar cada una
  // Cada elemento en el arreglo será representado por un componente <div> con su información
  //   const listaDeFrutas = frutas.map((fruta) => (
  //     <div key={fruta.id}>
  //       <h2>{fruta.nombre}</h2>
  //       <p>Color: {fruta.color}</p>
  //     </div>
  //   ));

  // Finalmente, retornamos la lista de frutas dentro de un contenedor <div>
  return (
    <div>
      <h1>Lista de Frutas</h1>
      {frutas.map((fruta) => (
        <div key={fruta.id}>
          <h2>{fruta.nombre}</h2>
          <p>Color: {fruta.color}</p>
        </div>
      ))}
    </div>
  );
}

export default Frutas;
