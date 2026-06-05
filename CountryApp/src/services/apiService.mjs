import axios from "axios";

import { Parser } from "json2csv";

import {

  getAllPaises,

  getAllPaisesLean,

  getPaisesPaginados,

  countPaises,

  createPais,

  getPaisById,

  updatePaisById,

  deletePaisById,

  deleteManyPaises,

  insertManyPaises,

  reemplazarPaisesSistema
  
} from "../repositories/paisRepository.mjs";

// ======================
// CONFIG
// ======================

const CREADOR =
  "Renato G. Trentini";

const CACHE_HORAS = 12;

const CACHE_MS =
  CACHE_HORAS *
  60 *
  60 *
  1000;

let ultimaActualizacion =
  null;


// ====================
// LÓGICA DE LA APP
// ====================

export const construirFiltros = (
  query
) => {

  const {
    nombre,
    capital,
    populationMin,
    populationMax
  } = query;

  const filtros = {

    tipo: "pais",

    creador: CREADOR

  };

  if (nombre) {

    filtros["name.official"] = {

      $regex: nombre,

      $options: "i"

    };

  }

  if (capital) {

    filtros.capital = {

      $regex: capital,

      $options: "i"

    };

  }

  if (
    populationMin ||
    populationMax
  ) {

    filtros.population = {};

    if (populationMin) {

      filtros.population.$gte =
        Number(populationMin);

    }

    if (populationMax) {

      filtros.population.$lte =
        Number(populationMax);

    }

  }

  return filtros;

};

//========================
// CALCULO DE ESTADISTICAS
//========================

export const calcularEstadisticas =
  paises => {

    const totalPopulation =
      paises.reduce(
        (acc, pais) =>
          acc +
          (pais.population || 0),
        0
      );

    const totalArea =
      paises.reduce(
        (acc, pais) =>
          acc +
          (pais.area || 0),
        0
      );

    const giniValidos =
      paises.filter(
        pais =>
          pais.gini !== null &&
          pais.gini !== undefined &&
          pais.gini !== ""
      );

    const promedioGini =
      giniValidos.length > 0

        ? (

            giniValidos.reduce(
              (acc, pais) =>
                acc +
                Number(pais.gini),
              0
            )

            /

            giniValidos.length

          ).toFixed(2)

        : "Sin datos";

    return {

      totalPopulation,

      totalArea,

      promedioGini

    };

  };

  // =======================
  // TRANSFORMACION DEL FORM
  // =======================

  export const transformarPaisFormulario =
  body => ({

    tipo: "pais",

    name: {
      official:
        body.official
    },

    capital: body.capital

      ? body.capital
          .split(",")
          .map(c => c.trim())
          .filter(Boolean)

      : [],

    borders: body.borders

      ? body.borders
          .split(",")
          .map(b => b.trim())
          .filter(Boolean)

      : [],

    area:
      body.area,

    population:
      body.population,

    gini:
      body.gini,

    timezones:
      body.timezones

        ? body.timezones
            .split(",")
            .map(t => t.trim())
            .filter(Boolean)

        : [],

    creador:
      CREADOR

  });

  //==========================================
  // CRUD SERVICE - LLAMADA POR EL CONTROLADOR
  //==========================================



  export const crearPais =
  async body => {

    const data =
      transformarPaisFormulario(
        body
      );

    return createPais(data);

  };
 

  export const obtenerPais =
  async id => {

    return getPaisById(id);

  };


  export const actualizarPais =
  async (
    id,
    body
  ) => {

    const data =
      transformarPaisFormulario(
        body
      );

    return updatePaisById(
      id,
      data
    );

  };

  

  export const eliminarPais =
  async id => {

    return deletePaisById(
      id
    );

  };

  //===================
  // DASHBOARD SERVICE
  //===================

  export const obtenerDashboard =
  async query => {

    const filtros =
      construirFiltros(
        query
      );

    const page =
      Number(query.page) || 1;

    const limit = 5;

    const skip =
      (page - 1) * limit;

    const totalDocumentos =
      await countPaises(
        filtros
      );

    const totalPages =
      Math.ceil(
        totalDocumentos /
        limit
      ) || 1;

    const todosLosPaises =
      await getAllPaises(
        filtros
      );

    const paises =
      await getPaisesPaginados(
        filtros,
        skip,
        limit
      );

    const totales =
      calcularEstadisticas(
        todosLosPaises
      );

    const subtotales =
      calcularEstadisticas(
        paises
      );

    return {

      paises,

      page,

      totalPages,

      totalPaises:
        totalDocumentos,

      totalPopulation:
        totales.totalPopulation,

      totalArea:
        totales.totalArea,

      promedioGini:
        totales.promedioGini,

      subtotalPopulation:
        subtotales.totalPopulation,

      subtotalArea:
        subtotales.totalArea,

      subtotalPromedioGini:
        subtotales.promedioGini

    };

  };

  //================
  // CSV - EXPORTAR
  //================

  export const exportarCSV =
  async () => {

    const paises =
      await getAllPaisesLean({

        tipo: "pais",

        creador: CREADOR,

        capital: {
          $exists: true
        },

        population: {
          $exists: true
        }

      });

    const datos =
      paises.map(
        pais => ({

          "Nombre Oficial":
            pais.name?.official ||
            "",

          Capital:
            pais.capital?.join(
              " | "
            ) || "",

          Borders:
            pais.borders?.join(
              " | "
            ) || "",

          Área:
            pais.area,

          Población:
            pais.population,

          Gini:
            pais.gini,

          Timezones:
            pais.timezones?.join(
              " | "
            ) || "",

          Creador:
            pais.creador

        })
      );

    const parser =
      new Parser();

    return parser.parse(
      datos
    );

  };


// ======================
// CARGAR PAISES DESDE API
// ======================

const cargarPaises = async () => {

  try {

    if (ultimaActualizacion) {

      const ahora = Date.now();

      const diferencia =
        ahora - ultimaActualizacion;

      if (diferencia < CACHE_MS) {

        console.log(
          "Cache activa."
        );

        return;

      }

    }

    console.log(
      "Actualizando países desde API..."
    );

    const response =
      await axios.get(
        "https://restcountries.com/v3.1/region/america"
      );

    const paises =
      response.data;

    const paisesFiltrados =
      paises

        .filter(
          pais =>

            pais.languages &&

            Object.values(
              pais.languages
            ).includes(
              "Spanish"
            )
        )

        .map(pais => ({

          tipo: "pais",

          name: {

            official:

              pais.translations
                ?.spa
                ?.official ||

              pais.name
                ?.official ||

              "Sin nombre"

          },

          capital:
            Array.isArray(
              pais.capital
            )
              ? pais.capital
              : [],

          borders:
            Array.isArray(
              pais.borders
            )
              ? pais.borders
              : [],

          area:

            pais.area > 0

              ? pais.area

              : 1,

          population:

            pais.population > 0

              ? pais.population

              : 1,

          gini:

            pais.gini

              ? Object.values(
                  pais.gini
                )[0]

              : null,

          timezones:
            Array.isArray(
              pais.timezones
            )
              ? pais.timezones
              : [],

          creador:
            CREADOR

        }));

    // ======================
    // ELIMINAR DATOS ANTERIORES
    // ======================

  await reemplazarPaisesSistema(

  {
    tipo: "pais",
    creador: CREADOR
  },

  paisesFiltrados

);

    ultimaActualizacion =
      Date.now();

    console.log(
      `Países cargados: ${paisesFiltrados.length}`
    );

  } catch (error) {

    console.log(
      "Error cargando países:"
    );

    console.log(
      error.message
    );

  }

};

export default cargarPaises;