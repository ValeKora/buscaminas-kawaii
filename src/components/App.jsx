import React, { useState, useEffect } from 'react';
import PlayerForm from './PlayerForm';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';

function App() {
  // Estados para almacenar la información del jugador y el estado del juego.
  const [player, setPlayer] = useState('');
  const [score, setScore] = useState(0);
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentPlayerId, setCurrentPlayerId] = useState(null);

  // Al montar el componente se cargan los jugadores guardados (si existen) en el LocalStorage.
  useEffect(() => {
    fetchPlayers();
  }, []);

  // Función para obtener la lista de jugadores desde LocalStorage.
  const fetchPlayers = () => {
    const stored = localStorage.getItem('players');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Se ordena la lista de jugadores de mayor a menor puntaje.
      const sorted = parsed.sort((a, b) => b.score - a.score);
      setPlayers(sorted);
    } else {
      setPlayers([]);
    }
  };

  // Función para guardar la lista de jugadores en LocalStorage.
  const updateLocalStorage = (newPlayers) => {
    localStorage.setItem('players', JSON.stringify(newPlayers));
  };

  // Función que se ejecuta al iniciar el juego.
  // Ahora se asigna un ID secuencial al nuevo jugador.
  const handleStartGame = () => {
    if (!player.trim()) {
      alert('⚠️ Debes ingresar un nombre.');
      return;
    }

    // Se calcula el nuevo ID:
    // Si existen jugadores, se toma el máximo ID existente + 1; de lo contrario, se asigna 1.
    const newId =
      players.length > 0
        ? Math.max(...players.map((p) => Number(p.id))) + 1
        : 1;

    // Se crea el objeto para el nuevo jugador con el ID secuencial.
    const newPlayer = {
      id: newId.toString(), // Se guarda como cadena para mantener la consistencia
      name: player,
      score: 0
    };

    // Se agrega el nuevo jugador a la lista existente.
    const newPlayers = [...players, newPlayer];
    updateLocalStorage(newPlayers);
    // Se guarda el ID del jugador actual para poder actualizarlo más tarde.
    setCurrentPlayerId(newPlayer.id);
    setPlayers(newPlayers);
    setGameStarted(true);
  };

  // Función para actualizar el puntaje del jugador actual en la lista y LocalStorage.
  const updatePlayerScore = (finalScore) => {
    if (!currentPlayerId) return;
    const newPlayers = players.map((p) => {
      if (p.id === currentPlayerId) return { ...p, score: finalScore };
      return p;
    });
    updateLocalStorage(newPlayers);
    setScore(finalScore);
    setPlayers(newPlayers);
  };

  // Función que se invoca cuando termina el juego,
  // marcando gameOver como true y actualizando el puntaje final.
  const handleGameOver = (finalScore) => {
    setGameOver(true);
    updatePlayerScore(finalScore);
  };

  // Permite editar el nombre y/o score del jugador en tiempo real.
  const handleEdit = (id, newName, newScore) => {
    const newPlayers = players.map((p) => {
      if (p.id === id) return { ...p, name: newName, score: newScore };
      return p;
    });
    updateLocalStorage(newPlayers);
    if (id === currentPlayerId) {
      setPlayer(newName);
      setScore(newScore);
    }
    setPlayers(newPlayers);
  };

  // Elimina el registro del jugador tanto de la lista como del LocalStorage.
  // Si se elimina el jugador actual, se reinician los estados relacionados.
  const handleDelete = (id) => {
    const newPlayers = players.filter((p) => p.id !== id);
    updateLocalStorage(newPlayers);
    if (id === currentPlayerId) {
      setPlayer('');
      setScore(0);
      setGameStarted(false);
      setGameOver(false);
      setCurrentPlayerId(null);
    }
    setPlayers(newPlayers);
  };

  return (
    <div className="app">
      <h1>🌸 Buscaminas Kawaii 🌸</h1>
      {
        // Renderizado condicional: si el juego no ha empezado, se muestra el formulario de ingreso.
        // De lo contrario, se muestra el tablero de juego.
        !gameStarted ? (
          <PlayerForm 
            player={player} 
            setPlayer={setPlayer} 
            onStartGame={handleStartGame} 
          />
        ) : (
          <GameBoard
            player={player}
            score={score}
            setScore={setScore}
            onGameOver={handleGameOver}
            onUpdateName={handleEdit}
            currentPlayerId={currentPlayerId}
          />
        )
      }
      {/* Se muestra el ScoreBoard que lista el ranking de jugadores */}
      <ScoreBoard players={players} />
    </div>
  );
}

export default App;
