import {

  obtenerDashboard,

  crearPais,

  obtenerPais,

  actualizarPais,

  eliminarPais,

  exportarCSV,

  transformarPaisFormulario

} from "../services/apiService.mjs";

import { validationResult } from "express-validator";

// ======================
// DASHBOARD
// ======================

export const dashboard = async (
  req,
  res
) => {

  try {

    const {
      nombre,
      capital,
      populationMin,
      populationMax
    } = req.query;

    const hayFiltros =
      nombre?.trim() ||
      capital?.trim() ||
      populationMin ||
      populationMax;

    const soloPaginacion =
      req.query.page &&
      !nombre &&
      !capital &&
      !populationMin &&
      !populationMax;

    const validationErrors =
      validationResult(req);

    if (
      !validationErrors.isEmpty()
    ) {

      return res.render(
        "dashboard",
        {
          title: "Dashboard",
          paises: [],
          totalPaises: 0,
          totalPopulation: 0,
          totalArea: 0,
          promedioGini: "Sin datos",
          subtotalArea: 0,
          subtotalPopulation: 0,
          subtotalPromedioGini:
            "Sin datos",
          request: req,
          page: 1,
          totalPages: 1,
          errors:
            validationErrors.array(),
          oldData: req.query
        }
      );

    }

    if (
      !soloPaginacion &&
      Object.keys(req.query)
        .length > 0 &&
      !hayFiltros
    ) {

      return res.render(
        "dashboard",
        {
          title: "Dashboard",
          paises: [],
          totalPaises: 0,
          totalPopulation: 0,
          totalArea: 0,
          promedioGini: "Sin datos",
          subtotalArea: 0,
          subtotalPopulation: 0,
          subtotalPromedioGini:
            "Sin datos",
          request: req,
          page: 1,
          totalPages: 1,
          errors: [
            {
              msg:
                "Debes completar al menos un campo para filtrar.",
              path: "filtro"
            }
          ],
          oldData: req.query
        }
      );

    }

    const data =
      await obtenerDashboard(
        req.query
      );

    return res.render(
      "dashboard",
      {
        title: "Dashboard",
        request: req,
        errors: [],
        oldData: req.query,
        ...data
      }
    );

  } catch (error) {

    console.log(error);

    return res
      .status(500)
      .send(
        "Error al cargar dashboard"
      );

  }

};

// ======================
// RENDER ADD
// ======================

export const renderAdd = (
  req,
  res
) => {

  res.render(
    "addPais",
    {
      title:
        "Agregar País",
      errors: [],
      oldData: {}
    }
  );

};

// ======================
// ADD PAIS
// ======================

export const addPais = async (
  req,
  res
) => {

  try {

    const errors =
      validationResult(req);

    if (
      !errors.isEmpty()
    ) {

      return res.render(
        "addPais",
        {
          title:
            "Agregar País",
          errors:
            errors.array(),
          oldData:
            req.body
        }
      );

    }

    await crearPais(
      req.body
    );

    return res.redirect(
      "/dashboard"
    );

  } catch (error) {

    console.log(error);

    return res
      .status(500)
      .send(
        "Error al crear país"
      );

  }

};

// ======================
// DELETE
// ======================
export const deletePais =
  async (
    req,
    res
  ) => {

    try {

      await eliminarPais(
        req.params.id
      );

      return res.redirect(
        "/dashboard"
      );

    } catch (error) {

      console.log(error);

      return res
        .status(500)
        .send(
          "Error al eliminar país"
        );

    }

  };

// =========
// EDIT PAIS
// =========

export const renderEdit =
  async (
    req,
    res
  ) => {

    try {

      const pais =
        await obtenerPais(
          req.params.id
        );

      if (!pais) {

        return res.redirect(
          "/dashboard"
        );

      }

      return res.render(
        "editPais",
        {
          title:
            "Editar País",
          pais,
          errors: []
        }
      );

    } catch (error) {

      console.log(error);

      return res.redirect(
        "/dashboard"
      );

    }

  };

  //=============
  // UPDATE PAIS
  //=============

  export const updatePais =
  async (
    req,
    res
  ) => {

    try {

      const errors =
        validationResult(req);

      if (
        !errors.isEmpty()
      ) {

        return res.render(
          "editPais",
          {
            title:
              "Editar País",

            pais: {
              _id:
                req.params.id,

              ...transformarPaisFormulario(
                req.body
              )
            },

            errors:
              errors.array()
          }
        );

      }

      await actualizarPais(
        req.params.id,
        req.body
      );

      return res.redirect(
        "/dashboard"
      );

    } catch (error) {

      console.log(error);

      return res
        .status(500)
        .send(
          "Error al actualizar país"
        );

    }

  };

  // ===========
  // EXPORT CSV
  // ===========

  export const exportCSV =
  async (
    req,
    res
  ) => {

    try {

      const csv =
        await exportarCSV();

      res.header(
        "Content-Type",
        "text/csv"
      );

      res.attachment(
        "paises.csv"
      );

      return res.send(
        csv
      );

    } catch (error) {

      console.log(error);

      return res
        .status(500)
        .send(
          "Error al exportar CSV"
        );

    }

  };