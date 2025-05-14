# Buscaminas Kawaii
Buscaminas Kawaii es un juego de Buscaminas con temática kawaii desarrollado con React, Axios y LocalStorage. La aplicación permite a los jugadores ingresar su nombre, jugar una partida inspirada en el clásico Buscaminas (con un toque adorable) y ver su puntaje en un ranking persistente.

# Características
Interfaz Kawaii: Disfruta de una apariencia única, con colores, tipografía y elementos visuales personalizados a mi gusto para lograr un ambiente tierno y divertido.

# Registro de Jugadores: 
Antes de iniciar el juego, el jugador ingresa su nombre. Además, puede editar o eliminar su nombre en cualquier momento.

# Juego Clásico con Twist: 
El tablero es de 5x5 celdas, donde cada celda tiene un 20% de probabilidad de contener una mina. Al descubrir una celda segura, el puntaje incrementa y se muestra una imagen kawaii obtenida mediante una llamada a la API de waifu.pics.

# Persistencia de Datos:
 Los datos de los jugadores y los puntajes se guardan en LocalStorage. Esto permite que el ranking se mantenga incluso al recargar la página.

# Ranking de Puntajes: 
Se muestra un ranking que lista los 3 mejores puntajes. Todos los jugadores se almacenan en LocalStorage, facilitando su consulta posterior.

# Tecnologías Utilizadas
# React:
 Para construir una aplicación de una sola página (SPA) y organizarla en componentes modulares.

# Axios: 
Para realizar peticiones HTTP y obtener imágenes desde una API externa.

# LocalStorage: 
Para almacenar de manera persistente los datos de los jugadores y sus puntajes.

# CSS: 
Con estilos personalizados (colores, tipografía, etc.) para crear una experiencia visual acorde a la temática kawaii.


# Instalación y Uso
Requisitos Previos
Node.js y npm.

# Instrucciones
Clona el repositorio:

bash
git clone https://github.com/ValeKora/buscaminas-kawaii.git
cd buscaminas-kawaii
Instala las dependencias:

bash
npm install
Ejecuta la aplicación en modo desarrollo:

bash
npm start
Accede a http://localhost:5173/ en tu navegador.

# Para compilar para producción:

bash
npm run build

# Estructura del Proyecto
El proyecto se organiza en varios componentes principales:

# PlayerForm: 
Permite al jugador ingresar, editar o eliminar su nombre antes de iniciar el juego.

# GameBoard:
 Maneja la lógica del juego. Contiene el tablero del Buscaminas (componente Board), se encarga de actualizar el puntaje, gestionar el fin del juego y permitir la edición del nombre durante la partida.

# ScoreBoard: 
Muestra el ranking de puntajes, mostrando los 3 mejores scores y manteniendo el listado completo en LocalStorage.

# Board: 
Implementa la lógica interna del juego. Crea un tablero 5x5 con una probabilidad del 20% de contener una mina, gestiona los clics en cada celda, incrementa el puntaje y realiza peticiones a la API para obtener imágenes kawaii en celdas seguras.

# API de Imágenes
La aplicación utiliza Axios para conectarse a waifu.pics, obteniendo imágenes kawaii de forma aleatoria cada vez que se revela una celda segura del tablero. Esto añade dinamismo y un toque visual encantador al juego.

# Personalización y Diseño
Colores y Estilo: Los colores y estilos visuales han sido personalizados a mi gusto, logrando una estética suave y tierno acorde a la temática kawaii.

Por ejemplo, se utiliza un fondo rosa suave, tipografía informal (Comic Sans MS), botones con efectos hover y celdas con colores diferenciados según su estado (seguras o con mina).

# Mejoras Futuras
Optimización de Carga de Imágenes: Implementar pre-carga de imágenes para reducir tiempos de espera.

# Nuevos Modos de Juego: Posibilidad de añadir niveles de dificultad o nuevos desafíos.

# Responsive Design: Continuar mejorando la adaptación a dispositivos móviles.

# Contribuciones
Las contribuciones son bienvenidas. Si tienes ideas o mejoras, por favor abre un issue o envía un pull request.

# Licencia
Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

# Créditos
INACAP: Conceptos y fundamentos extraídos del Aula Virtual de INACAP.
API de waifu.pics: Proporciona las imágenes kawaii que hacen único este juego.
Desarrollado con ❤️ por [Paloma Clavijo].