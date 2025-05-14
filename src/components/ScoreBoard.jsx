import React from 'react';

// Componente ScoreBoard, que recibe la propiedad "players" (un arreglo de objetos de jugador),
// donde se espera que cada objeto contenga al menos un "id", "name" y "score".
function ScoreBoard({ players }) {
  // Suponemos que el arreglo "players" ya está ordenado de mayor a menor score.
  // Se extraen solo los 3 primeros elementos, para mostrar únicamente el top 3.
  const topPlayers = players.slice(0, 3);

  return (
    // Contenedor principal del ranking, con la clase "scoreboard" para estilar este bloque.
    <div className="scoreboard">
      {/* Título del ranking con emojis para hacerlo más visual */}
      <h2>🌟 Top 3 Scores 🌟</h2>
      {/* Lista no ordenada que contendrá los puntajes */}
      <ul>
        {
          // Se itera sobre el arreglo de topPlayers usando map para crear un elemento <li> por cada jugador.
          topPlayers.map((player) => (
            // Se asigna "key" utilizando player.id para ayudar a React a identificar de manera única cada elemento.
            <li key={player.id}>
              {/* Se despliega el nombre y el score del jugador */}
              {player.name}: {player.score} puntos
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default ScoreBoard;
