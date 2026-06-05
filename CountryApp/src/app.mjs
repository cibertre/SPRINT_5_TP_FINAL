import "dotenv/config";

import express from "express";
import path from "path";

import {
  fileURLToPath
} from "url";

import expressLayouts from "express-ejs-layouts";

import methodOverride from "method-override";

import cargarPaises from "./services/apiService.mjs";

import connectDB from "./config/db.mjs";

import paisRoutes from "./routes/paisRoutes.mjs";

const app = express();


// ======================
// CONEXIÓN DB
// ======================

const iniciarServidor = async () => {

  await connectDB();

  await cargarPaises();   //capa de servicio para cargar los países desde la API al iniciar el servidor

  const __filename =
    fileURLToPath(import.meta.url);

  const __dirname =
    path.dirname(__filename);

  app.use(
    express.urlencoded({  // Para parsear datos de formularios (application/x-www-form-urlencoded), procesa los datos enviados a través de formularios HTML y los hace accesibles a través de req.body en las rutas. Es esencial para manejar solicitudes POST o PUT que envían datos desde formularios.
      extended: true
    })
  );

  app.use(express.json());  // Para parsear JSON en las solicitudes entrantes, procesa los datos JSON y los hace accesibles a través de req.body en las rutas. Es esencial para manejar solicitudes POST o PUT que envían datos en formato JSON.

  app.use(
    methodOverride("_method")
  );

  app.use(
    express.static(
      path.join(
        __dirname,
        "public"
      )
    )
  );

  app.set(
    "view engine",
    "ejs"
  );

  app.set(
    "views",
    path.join(
      __dirname,
      "views"
    )
  );

  app.use(expressLayouts);

  app.set(
    "layout",
    "./layouts/main"
  );

  app.use(
    "/",
    paisRoutes
  );

  const PORT =
    process.env.PORT || 3000;

  app.listen(PORT, () => {

    console.log(
      `Servidor funcionando en puerto ${PORT}`
    );

  });

};

iniciarServidor();