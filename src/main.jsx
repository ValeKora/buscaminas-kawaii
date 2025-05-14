// Se importa la librería React, necesaria para utilizar JSX y construir componentes.
import React from 'react';

// Se importa ReactDOM desde la versión 'client' para poder renderizar la aplicación en el navegador.
import ReactDOM from 'react-dom/client';

// Se importa el componente principal 'App' desde el directorio de componentes.
import App from './components/App';

// Se importan los estilos globales definidos en 'index.css'.
import './index.css';
// Se importan estilos específicos de 'App.css' que complementan o personalizan el estilo de la aplicación.
import './App.css';

// Se crea la raíz de la aplicación utilizando el elemento con id 'root' del HTML.
// ReactDOM.createRoot() inicializa el contenedor de la aplicación moderna de React.
ReactDOM.createRoot(document.getElementById('root')).render(
  // Se utiliza <React.StrictMode> para envolver la aplicación.
  // Esto ayuda a identificar problemas potenciales en la aplicación durante el desarrollo.
  <React.StrictMode>
    {/* Se renderiza el componente principal App dentro del StrictMode */}
    <App />
  </React.StrictMode>
);
