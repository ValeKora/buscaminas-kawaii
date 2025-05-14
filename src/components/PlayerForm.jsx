import React from 'react';
// Componente funcional PlayerForm
// Recibe 3 props:
// - player: el valor actual del nombre del jugador.
// - setPlayer: función para actualizar el nombre del jugador.
// - onStartGame: función que se ejecuta al iniciar el juego.
function PlayerForm({ player, setPlayer, onStartGame }) {
  return (
    // Contenedor principal con la clase "player-form" para aplicar estilos
    <div className="player-form">
      
      {/* Input para que el usuario ingrese su nombre */}
      <input
        type="text" // Tipo de entrada de texto
        placeholder="🌸 Ingresa tu nombre 🌸" // Texto guía que aparece cuando el input está vacío
        value={player} // El valor del input está controlado por la prop 'player'
        // Cada vez que se escribe algo en el input, se llama a setPlayer pasando el nuevo valor.
        onChange={(e) => setPlayer(e.target.value)}
      />
      
      {/* Contenedor para los botones */}
      <div>
        {/* Botón para iniciar el juego. Al hacer clic se llama la función onStartGame */}
        <button onClick={onStartGame}>💖 Guardar & Jugar 💖</button>
        
        {/* Botón para limpiar el campo del nombre. Al hacer clic, setPlayer se llama con '' para eliminar el nombre */}
        <button onClick={() => setPlayer('')}>❌ Eliminar Nombre ❌</button>
      </div>
    </div>
  );
}
export default PlayerForm;
