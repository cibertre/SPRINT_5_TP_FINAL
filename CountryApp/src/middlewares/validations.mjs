import {
  body,
  query
} from "express-validator";

export const paisValidation = [

  // ======================
  // NAME OFFICIAL
  // ======================

  body("official")

  .trim()

  .notEmpty()

  .withMessage(
    "El nombre oficial es obligatorio"
  )

  .isLength({
    min: 3,
    max: 90
  })

  .withMessage(
    "El nombre oficial debe tener entre 3 y 90 caracteres"
  )

  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)

  .withMessage(
    "El nombre oficial solo puede contener letras y espacios"
  ),

  // ======================
  // CAPITAL
  // ======================

  body("capital")

  .notEmpty()

.withMessage(
  "La capital es obligatoria"
)

  .custom(value => {

    const capitales =
      value.split(",");

    return capitales.every(cap => {

      const limpia =
        cap.trim();

      return (

        limpia.length >= 3 &&

        limpia.length <= 90 &&

        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(
          limpia
        )
      );
    });
  })

  .withMessage(
    "Cada capital debe contener solo letras y tener entre 3 y 90 caracteres"
  ),

  // ======================
  // BORDERS
  // ======================

  body("borders")

    .custom(value => {

      if (!value.trim())
        return true;

      const borders =
        value.split(",");

      return borders.every(border =>

        /^[A-Z]{3}$/.test(
          border.trim()
        )
      );
    })

    .withMessage(
      "Cada código border debe tener 3 letras mayúsculas"
    ),

  // ======================
  // AREA
  // ======================

  body("area")

    .isFloat({
      gt: 0
    })

    .withMessage(
      "El área debe ser un número mayor a 0"
    ),

  // ======================
  // POPULATION
  // ======================

  body("population")

    .isInt({
      gt: 0
    })

    .withMessage(
      "La población debe ser un número entero mayor a 0"
    ),

  // ======================
  // GINI
  // ======================

  body("gini")

    .optional({
      values: "falsy"
    })

    .isFloat({
      min: 0,
      max: 100
    })

    .withMessage(
      "El índice Gini debe estar entre 0 y 100"
    )
];

// ======================
// VALIDACIONES DASHBOARD
// ======================

export const dashboardValidation = [

  // ======================
  // NOMBRE
  // ======================

 query("nombre")

  .optional({ values: "falsy" })

  .trim()

  .isLength({
    min: 3,
    max: 90
  })

  .withMessage(
    "El nombre debe tener entre 3 y 90 caracteres"
  )

  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)

  .withMessage(
    "El nombre solo puede contener letras y espacios"
  ),

  // ======================
  // CAPITAL
  // ======================

  query("capital")

  .optional({ values: "falsy" })

  .trim()

  .isLength({
    min: 3,
    max: 90
  })

  .withMessage(
    "La capital debe tener entre 3 y 90 caracteres"
  )

  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)

  .withMessage(
    "La capital solo puede contener letras y espacios"
  ),

  // ======================
  // POBLACION MINIMA
  // ======================

  query("populationMin")

    .optional({ values: "falsy" })

    .isInt({
      min: 0
    })

    .withMessage(
      "La población mínima debe ser un número entero mayor o igual a 0"
    ),

  // ======================
  // POBLACION MAXIMA
  // ======================

  query("populationMax")

    .optional({ values: "falsy" })

    .isInt({
      gt: 0
    })

    .withMessage(
      "La población máxima debe ser un número entero mayor a 0"
    )
];