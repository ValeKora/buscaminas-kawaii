// Se importan React y los hooks useState y useEffect para manejar el estado y los efectos secundarios.
// También se importa axios para realizar peticiones HTTP.
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Función para crear un nuevo tablero de juego.
// Se genera un arreglo de 25 celdas (representando un tablero 5x5).
// Cada celda es un objeto con las siguientes propiedades:
// - hasMine: se asigna un valor booleano; tiene un 20% de probabilidad de ser true (contiene mina).
// - revealed: indica si la celda ya se mostró; inicialmente es false.
// - image: almacena la URL de la imagen que se mostrará en la celda si no hay mina; comienza como null.
const createBoard = () => {
  return Array.from({ length: 25 }, () => ({
    hasMine: Math.random() < 0.2, // 20% de probabilidad de contener mina
    revealed: false,             // La celda no ha sido revelada al inicio
    image: null                  // No hay imagen asignada inicialmente
  }));
};

// Se define el componente funcional Board, que maneja la visualización y la lógica del tablero.
// Recibe las siguientes props:
// - setScore: función para actualizar el puntaje del jugador.
// - gameOver: booleano que indica si el juego ha terminado.
// - onGameOver: función que se ejecuta cuando se determina que el juego terminó.
function Board({ setScore, gameOver, onGameOver }) {
  // Se inicializa el estado 'board' utilizando la función createBoard para obtener un tablero nuevo.
  const [board, setBoard] = useState(createBoard());

  // Función que maneja el clic en una celda.
  // El parámetro 'index' representa la posición de la celda en el arreglo.
  const handleClick = (index) => {
    // Si el juego ya terminó o la celda ya fue revelada, la función se aborta.
    if (gameOver || board[index].revealed) return;

    // Se crea una copia del arreglo 'board' para realizar cambios sin mutar el estado original.
    const newBoard = [...board];
    // Se marca la celda en la posición 'index' como revelada.
    newBoard[index].revealed = true;

    // Si la celda contiene una mina...
    if (newBoard[index].hasMine) {
      // ... se actualiza el estado del tablero para reflejar la revelación y se invoca la función onGameOver para finalizar el juego.
      setBoard(newBoard);
      onGameOver();
    } else {
      // Si la celda es segura, se incrementa el puntaje.
      setScore((prev) => prev + 1);
      // Se realiza una petición HTTP GET a la API para obtener una imagen kawaii aleatoria.
      axios
        .get("https://api.waifu.pics/sfw/waifu")
        .then((response) => {
          // Una vez obtenida la imagen, se asigna la URL al atributo 'image' de la celda.
          newBoard[index].image = response.data.url;
          // Se actualiza el estado del tablero para que se renderice la imagen.
          setBoard(newBoard);
        })
        .catch((error) => {
          // En caso de error, se imprime el mensaje en la consola y se actualiza el tablero sin la imagen.
          console.error("Error al obtener imagen:", error);
          setBoard(newBoard);
        });
    }
  };

  // useEffect se utiliza para reinicializar el tablero cada vez que cambia el estado de gameOver.
  // Si el juego no está en estado de finalizado (gameOver es false),
  // se crea un nuevo tablero utilizando createBoard.
  useEffect(() => {
    if (!gameOver) {
      setBoard(createBoard());
    }
  }, [gameOver]); // El efecto se ejecuta cada vez que gameOver cambia.

  // Se retorna el JSX que representa el tablero de juego.
  return (
    // Contenedor principal con la clase "board" para aplicar estilos.
    <div className="board">
      {
        // Se itera sobre el arreglo de celdas con map para crear cada celda individual.
        board.map((cell, index) => (
          <div
            key={index}  // La "key" ayuda a React a identificar cada elemento de la lista de manera única.
            // Se asigna una clase según si la celda ha sido revelada y si contiene mina o es segura.
            className={`cell ${cell.revealed ? (cell.hasMine ? 'mine' : 'safe') : ''}`}
            // Al hacer clic en la celda, se llama a handleClick pasando el índice correspondiente.
            onClick={() => handleClick(index)}
          >
            {
              // Renderizado del contenido de la celda:
              // Si la celda ya fue revelada...
              cell.revealed ? (
                // ... y contiene una mina, se muestra el emoji de bomba.
                cell.hasMine ? (
                  '💣'
                ) : 
                // Si no tiene mina, se verifica si hay una imagen asignada.
                cell.image ? (
                  // Si hay imagen, se muestra mediante un elemento <img> con estilos definidos.
                  <img
                    src={cell.image}
                    alt="kawaii"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                ) : (
                  // Si no hay imagen, se muestra un emoji que indica seguridad.
                  '✨'
                )
              ) : (
                // Si la celda no ha sido revelada, se muestra nada.
                ''
              )
            }
          </div>
        ))
      }
    </div>
  );
}

// Se exporta el componente Board para que pueda ser utilizado en otros módulos de la aplicación.
export default Board;
