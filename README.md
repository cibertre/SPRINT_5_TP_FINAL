# CountryAPP

Aplicación web desarrollada con Node.js, Express, MongoDB y EJS para la gestión y visualización de países hispanohablantes de América.

El proyecto implementa una arquitectura basada en MVC (Model-View-Controller) complementada con una Service Layer y una Repository Layer, permitiendo una mejor separación de responsabilidades, mantenibilidad y escalabilidad del código.

La aplicación consume datos desde la API pública REST Countries, almacena la información en MongoDB y permite realizar operaciones CRUD completas, filtrados avanzados, exportación CSV y paginación.


# Objetivos del proyecto

* Aplicar arquitectura MVC utilizando Express.js.
* Implementar operaciones CRUD completas.
* Consumir una API externa utilizando Axios.
* Persistir datos en MongoDB con Mongoose.
* Implementar validaciones backend con Express Validator.
* Implementar patrón Repository para abstraer el acceso a datos.
* Aplicar separación de responsabilidades mediante Service Layer.
* Aplicar paginación y filtros dinámicos.
* Exportar información a CSV.
* Implementar cacheo básico para evitar llamadas repetidas a la API.
* Mejorar experiencia de usuario mediante manejo visual de errores.



# Tecnologías utilizadas

• Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

• Frontend

* EJS
* CSS

• Librerías

* Axios
* Express Validator
* Json2CSV
* Method Override
* Dotenv
* Nodemon



# Estructura Completa del proyecto


src/
│
│
├── config/db.mjs
├── controllers/paisController.mjs
├── middlewares/validations.mjs
├── models/Pais.mjs
├── routes/paisRoutes.mjs
├── services/apiService.mjs
├── repositories/paisRepository.mjs
├── views
│	├── layouts/main.ejs
│	├── partials/footer.ejs
│	├── partials/navbar.ejs
│	├── about.ejs
│	├── addPais.ejs
│	├── dashboard.ejs
│	├── editPais.ejs
│	├── home.ejs
│
├── public
│	├── css/styles.css
│	├── images/fondo.jpg
│	├── js/confirmDelete.js
│
└── app.mjs


=================================

Arquitectura del proyecto

El proyecto sigue una arquitectura por capas:

MVC (Modelo - Viesta - Controlador)
Model: define la estructura de los datos mediante Mongoose.
View: interfaces desarrolladas con EJS.
Controller: recibe las solicitudes HTTP y coordina la lógica de negocio.
Service Layer

La capa de servicios centraliza la lógica de negocio de la aplicación.

Responsabilidades:

Consumo de la API REST Countries.
Aplicación de reglas de negocio.
Gestión del cache de datos.
Transformación y preparación de información para los controladores.
Repository Layer

La capa Repository encapsula todas las operaciones de acceso a MongoDB.

Responsabilidades:

Consultas a la base de datos.
Inserción de documentos.
Actualización de registros.
Eliminación de registros.
Abstracción de Mongoose respecto a las capas superiores.

Beneficios:

Menor acoplamiento.
Mayor facilidad para realizar pruebas.
Mejor mantenimiento del código.
Posibilidad de cambiar la tecnología de persistencia con mínimo impacto. 

//////////////////////////
# Instalación del proyecto
//////////////////////////

• 1. Clonar repositorio

```bash
git clone <https://github.com/cibertre/Sprint5_TPF.git>
```

Ingresar al proyecto:

```bash
cd CountryAPP
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

# 🔐 Variables de entorno

El proyecto utiliza variables de entorno para configuración sensible.

Es el archivo ".env" en la raíz del proyecto:

====================env
PORT=3000

MONGO_URI=mongodb+srv://grupo-27:grupo-27@cluster0.blryo.mongodb.net/NodeMod3Cohorte5
======================

• Explicación

| Variable    | Descripción                           |
| ----------- | ------------------------------------- |
| PORT        | Puerto donde se ejecuta la aplicación |
| MONGODB_URI | URI de conexión a MongoDB             |

==============================================================

# Configuración de MongoDB

Asegurarse de tener MongoDB ejecutándose localmente.

Ejemplo en consola de Windows:

```consola
net start MongoDB
```

=====================

# Ejecución del proyecto


• En consola debe ejecutarse la siguiente expresion:

npm start


# Acceso a la aplicación

Abrir navegador en:

```txt
http://localhost:3000
```

---

# Funcionalidades principales

• Dashboard

* Listado paginado de países
* Estadísticas generales
* Filtros dinámicos
* Exportación CSV

• CRUD

* Agregar países
* Editar países
* Eliminar países

• Validaciones

* Validaciones backend con Express Validator
* Persistencia de datos ingresados
* Manejo visual de errores

• Exportación

* Exportación de resultados filtrados en formato CSV

• Cache API

* Evita llamadas repetidas a REST Countries
* Actualización automática cada 12 horas

---

# Filtros implementados

* Buscar por nombre
* Buscar por capital
* Población mínima
* Población máxima

---

# Seeder automático

Al iniciar la aplicación:

1. Se consume la API REST Countries.
2. Se filtran países hispanohablantes de América.
3. Los datos se almacenan en MongoDB.
4. Se evita duplicar información.
5. Se aplica cache temporal para optimizar rendimiento.

---

# Validaciones implementadas

• Formularios

* Longitud mínima y máxima
* Validación de números enteros
* Validación de texto únicamente
* Manejo de campos vacíos
* Resaltado visual de errores

---

# Exportación CSV

La aplicación permite exportar:

* resultados completos
* resultados filtrados

en formato CSV con codificación UTF-8.

==================================

# Autor

Renato Gabriel Trentini
DNI N° 31.648.559
e-mail: cibertre@gmail.com

===================================

