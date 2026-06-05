import Pais from "../models/Pais.mjs";

// ======================
// OBTENER TODOS
// ======================

export const getAllPaises = (
  filtros = {}
) => {

  return Pais.find(filtros);

};

export const getAllPaisesLean = (
  filtros = {}
) => {

  return Pais.find(
    filtros
  ).lean();

};

// ======================
// OBTENER PAGINADOS
// ======================

export const getPaisesPaginados = (
  filtros,
  skip,
  limit
) => {

  return Pais.find(filtros)

    .sort({
      "name.official": 1
    })

    .skip(skip)

    .limit(limit);

};

// ======================
// CONTAR
// ======================

export const countPaises = (
  filtros = {}
) => {

  return Pais.countDocuments(
    filtros
  );

};

// ======================
// CREAR
// ======================

export const createPais = (
  data
) => {

  return Pais.create(data);

};

// ======================
// BUSCAR POR ID
// ======================

export const getPaisById = (
  id
) => {

  return Pais.findById(id);

};

// ======================
// ACTUALIZAR
// ======================

export const updatePaisById = (
  id,
  data
) => {

  return Pais.findByIdAndUpdate(
    id,
    data,
    {
      new: true
    }
  );

};

// ======================
// ELIMINAR
// ======================

export const deletePaisById = (
  id
) => {

  return Pais.findByIdAndDelete(
    id
  );

};

export const eliminarPaisesSistema =
  () => {

    return Pais.deleteMany({
      tipo: "pais",
      creador: "Renato G. Trentini"
    });

  };

  // ======================
// ELIMINAR MUCHOS
// ======================

export const deleteManyPaises = (
  filtros = {}
) => {

  return Pais.deleteMany(
    filtros
  );

};

// ======================
// INSERTAR MUCHOS
// ======================

export const insertManyPaises = (
  data = []
) => {

  return Pais.insertMany(
    data
  );

};


//===================
// REEMPLAZAR PAISES
//===================

export const reemplazarPaisesSistema =
  async (
    filtros,
    nuevosPaises
  ) => {

    await Pais.deleteMany(
      filtros
    );

    return Pais.insertMany(
      nuevosPaises
    );

  };