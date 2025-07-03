Prueba Técnica: CRUD Completo en React.js y Node.js
Descripción del Proyecto
El objetivo de esta prueba técnica es evaluar la capacidad del candidato para
desarrollar una aplicación CRUD (Crear, Leer, Actualizar, Eliminar) utilizando
React.js para el frontend y Node.js para el backend. La aplicación gestionará una
lista de productos y categorías, donde cada producto estará asociado a una
categoría.
Requisitos
1. Backend (Node.js):
o Crear un servidor en Node.js que ofrezca una API RESTful para
gestionar productos y categorías.
o Implementar relaciones entre productos y categorías.
2. Frontend (React.js):
o Crear una interfaz en React.js que permita interactuar con la API
para realizar las operaciones CRUD.
o El usuario debe poder asociar productos a categorías desde la
interfaz.

3. Base de Datos (MySQL):
o Diseñar una base de datos relacional con las tablas necesarias para
productos y categorías.

4. Validaciones:
o Los formularios deben incluir validaciones para asegurar la calidad
de los datos. Puedes implementar las validaciones como consideres
más conveniente.
5. Investigación:
o Se permite y fomenta el uso de documentación y recursos externos.

Especificaciones Técnicas
Backend (Node.js)
1. Estructura del Proyecto:
o Organizar el proyecto en carpetas como controllers, routes y config.
2. Dependencias:
o Express.js o orm para el servidor web.
o mysql2 para conectarse a la base de datos MySQL.
o dotenv para la gestión de variables de entorno.
3. Modelos de Datos:
o Productos:
* id (INT, PRIMARY KEY, AUTO_INCREMENT)
* name (VARCHAR, NOT NULL)
* description (TEXT, NOT NULL)

* price (FLOAT, NOT NULL)
* category_id (INT, FOREIGN KEY hacia la tabla de categorías)
o Categorías:
* id (INT, PRIMARY KEY, AUTO_INCREMENT)
* name (VARCHAR, NOT NULL)

4. Relaciones:
o Cada producto debe estar asociado a una categoría.
5. Endpoints de la API:
o Productos:
* GET /products: Obtener todos los productos.
* GET /products/:id: Obtener un producto por su ID.
* POST /products: Crear un nuevo producto (asociado a una
categoría).
* PUT /products/:id: Actualizar un producto existente.
* DELETE /products/:id: Eliminar un producto.
o Categorías:
* GET /categories: Obtener todas las categorías.
* GET /categories/:id: Obtener una categoría por su ID.
* POST /categories: Crear una nueva categoría.
* PUT /categories/:id: Actualizar una categoría existente.
* DELETE /categories/:id: Eliminar una categoría.

Frontend (React.js)
1. Estructura del Proyecto:
o Puedes usar Create React App o Vite para inicializar el proyecto.
o Organizar el proyecto en carpetas como components y services.
2. Dependencias:
o Axios para las llamadas a la API.
o React Router para la navegación.
3. Componentes:
o CategoryList: Mostrar la lista de categorías.
o CategoryForm: Formulario para crear o editar categorías.
o ProductList: Mostrar la lista de productos, indicando a qué categoría
pertenece cada uno.
o ProductForm: Formulario para crear o editar productos, con la
opción de seleccionar una categoría.
o ProductDetail: Vista detallada de un producto específico, mostrando
su categoría asociada.

4. Validaciones:
o Asegurar que los formularios validen correctamente los datos
ingresados (e.g., campos obligatorios, validación de precios, etc.).
o Libertad para implementar las validaciones como consideres más
conveniente (JavaScript puro, bibliotecas adicionales, etc.).

Instrucciones para la Entrega
1. Repositorio GitHub:
o Subir el código a un repositorio público en GitHub.
o Incluir un archivo README.md con:
* Descripción del proyecto.
* Instrucciones para instalar dependencias y configurar
variables de entorno.
* Pasos para ejecutar el backend y el frontend.

2. Configuración y Ejecución:
o Proveer instrucciones claras para configurar y ejecutar tanto el
servidor como la interfaz.

3. Plazo:
o El proyecto debe completarse en un plazo máximo de .

Criterios de Evaluación
1. Funcionalidad:
o La aplicación debe cumplir con todos los requisitos funcionales
(CRUD para productos y categorías, relación entre tablas, etc.).

2. Calidad del Código:
o El código debe ser modular, limpio y bien organizado.
3. Validaciones:
o Los formularios deben incluir validaciones adecuadas para garantizar
la calidad de los datos.

4. Documentación:
o La documentación del proyecto debe ser clara y detallada.

Notas
 Tienes total libertad para investigar y utilizar recursos externos para
completar esta prueba.
 Se valorará la creatividad y la calidad en la implementación de las
relaciones entre productos y categorías.
¡Buena suerte!

 Modelos de Datos:
 Productos:
* id (INT, PRIMARY KEY, AUTO_INCREMENT)
* name (VARCHAR, NOT NULL)
* description (TEXT, NOT NULL)
* price (FLOAT, NOT NULL)
* category_id (INT, FOREIGN KEY hacia la tabla de categorías)

Categorías:
* id (INT, PRIMARY KEY, AUTO_INCREMENT)
* name (VARCHAR, NOT NULL)

4. Relaciones:
o Cada producto debe estar asociado a una categoría.

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

NOTAS:
cambiar los tipos de string a text como pide la prueba.

poner las carpetas y archivos que ellos piden







++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
el sql::

USE pava;

CREATE TABLE categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  category_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);


++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
{
  "name":"lapicero negro",
  "description":"kilometrico",
  "price":1500,
  "category_id":"1"
}