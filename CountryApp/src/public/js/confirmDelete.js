const formsDelete = document.querySelectorAll(
  ".form-delete"
);

formsDelete.forEach(form => {

  form.addEventListener(
    "submit",
    function (e) {

      const confirmar = confirm(
        "¿Seguro que desea eliminar este país?"
      );

      if (!confirmar) {

        e.preventDefault();
      }
    }
  );
});