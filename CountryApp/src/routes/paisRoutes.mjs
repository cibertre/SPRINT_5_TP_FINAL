import express from "express";

const router = express.Router();

import {
  dashboard,
  renderAdd,
  addPais,
  renderEdit,
  updatePais,
  deletePais,
  exportCSV
} from "../controllers/paisController.mjs";

import {
  paisValidation,
  dashboardValidation
} from "../middlewares/validations.mjs";

router.get("/", (req, res) => {
  res.render("home", {
    title: "Inicio"
  });
});

router.get(
  "/dashboard",
  dashboardValidation,
  dashboard
);
router.get(
  "/export/csv",
  exportCSV
);

router.get("/add", renderAdd);

router.post(
  "/add",
  paisValidation,
  addPais
);

router.get(
  "/edit/:id",
  renderEdit
);

router.put(
  "/edit/:id",
  paisValidation,
  updatePais
);

router.delete(
  "/delete/:id",
  deletePais
);

router.get("/about", (req, res) => {
  res.render("about", {
    title: "Acerca de"
  });
});

export default router;