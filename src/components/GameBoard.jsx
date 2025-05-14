// Se importa React y el hook useState para gestionar el estado local del componente.
import React, { useState } from 'react';
// Se importa el componente Board, que se encargará de mostrar y gestionar el tablero de juego.
import Board from './Board';

// Se define el componente funcional GameBoard que recibe varias props:
// - player: el nombre actual del jugador.
// - score: el puntaje actual del jugador.
// - setScore: función para actualizar el puntaje.
// - onGameOver: función que se ejecuta cuando el juego termina.
// - onUpdateName: función para actualizar el nombre del jugador en la lista de jugadores.
// - currentPlayerId: ID del jugador actual.
function GameBoard({ player, score, setScore, onGameOver, onUpdateName, currentPlayerId }) {

  // Estado local para indicar si el juego terminó en esta vista (localGameOver).
  // Inicialmente se establece en false (el juego está en curso).
  const [localGameOver, setLocalGameOver] = useState(false);

  // Estado para controlar si el usuario está editando su nombre.
  // Inicialmente es false, lo que indica que no está en modo de edición.
  const [isEditingName, setIsEditingName] = useState(false);

  // Estado para almacenar el nuevo nombre mientras se edita.
  // Se inicializa con el nombre actual del jugador (prop player).
  const [editedName, setEditedName] = useState(player);

  // Función para manejar el fin del juego.
  // Al llamarla, se configura localGameOver en true para reflejar que el juego terminó
  // y se invoca la función onGameOver pasándole el puntaje actual.
  const handleGameOver = () => {
    setLocalGameOver(true);
    onGameOver(score);
  };

  // Función para reiniciar el juego.
  // Se restablece el puntaje a 0 y se marca que el juego está en curso (localGameOver en false).
  const resetGame = () => {
    setScore(0);
    setLocalGameOver(false);
  };

  // Función para guardar el nuevo nombre cuando se edita.
  // Se actualiza el nombre del jugador llamando a onUpdateName, manteniendo el puntaje actual,
  // y luego se finaliza el modo de edición (isEditingName se establece en false).
  const handleSaveName = () => {
    // Actualiza el nombre del jugador (manteniendo el score actual)
    onUpdateName(currentPlayerId, editedName, score);
    setIsEditingName(false);
  };

  // Renderizado del componente GameBoard mediante JSX:
  return (
    // Contenedor principal con la clase "game-board" para estilos.
    <div className="game-board">
      {/* Título que muestra el nombre del jugador y su puntaje actual. */}
      <h2>
        💖 Jugador: {player} - Score: {score} 💖
      </h2>
      
      {/* Sección para editar o visualizar el nombre del jugador */}
      <div>
        {/* Se utiliza un operador ternario para determinar si se muestra el modo de edición */}
        {isEditingName ? (
          // Si isEditingName es true, se muestra un input para editar el nombre y dos botones.
          <>
            {/* Input controlado que permite cambiar el valor del nombre a editar */}
            <input 
              type="text" 
              value={editedName} 
              onChange={(e) => setEditedName(e.target.value)} 
            />
            {/* Botón para guardar el nuevo nombre, llamando a handleSaveName */}
            <button onClick={handleSaveName}>Guardar Nombre</button>
            {/* Botón para cancelar la edición, simplemente sale del modo de edición */}
            <button onClick={() => setIsEditingName(false)}>Cancelar</button>
          </>
        ) : (
          // Si isEditingName es false, se muestra un botón para activar el modo de edición.
          // Al hacer clic, se activa el modo de edición y se establece editedName con el valor actual de player.
          <button onClick={() => { setIsEditingName(true); setEditedName(player); }}>
            Editar Nombre
          </button>
        )}
      </div>
      
      {/* Se renderiza el componente Board, pasando funciones y estados necesarios:
          - setScore: para actualizar el puntaje desde Board.
          - gameOver: se pasa el estado local localGameOver para informar si el juego terminó.
          - onGameOver: se pasa la función handleGameOver para manejar el final del juego.
      */}
      <Board setScore={setScore} gameOver={localGameOver} onGameOver={handleGameOver} />

      {/* Si el juego terminó (localGameOver es true), se muestra el botón para reiniciar el juego */}
      {localGameOver && (
        <button onClick={resetGame}>💕 Reiniciar Juego 💕</button>
      )}
    </div>
  );
}

// Se exporta el componente GameBoard para que pueda ser utilizado en otros módulos.
export default GameBoard;
