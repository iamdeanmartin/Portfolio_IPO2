//Código para el cambio al dark mode y el light mode
document.addEventListener("DOMContentLoaded", function () {
  //Código para el cambio al dark mode y el light mode
  const themeSwitch = document.getElementById("theme-switch");

  // Se asegura que esté el elemento del theme switch para que el cambio sea posible
  if (!themeSwitch) {
    console.error("Theme switch no encontrado");
    return;
  }

  //Esto es para guardar el theme que tenemos en el momento que cerramos la pagina
  //y que cuando volvamos a cargarla aparezca con el theme anterior
  let darkmode = localStorage.getItem("darkmode");

  //Apartado para activar el dark mode
  const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
    darkmode = "active";
  };

  //Apartado para desactivar el dark mode
  const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
    darkmode = null;
  };

  //Aplica el modo guardado en el local storage cuando cargamos la página
  if (darkmode === "active") {
    enableDarkMode();
  }

  //Esto es para que el modo cambie cuando pulsamos el botón
  themeSwitch.addEventListener("click", () => {
    if (darkmode !== "active") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });

  const goDown = document.getElementById("go-down");
  const target = document.getElementById("proyectos");

  if (goDown && target) {
    const go = () =>
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    goDown.addEventListener("click", go);

    const duration = 7000;

    // accesible con teclado (opcional pero recomendable)
    goDown.setAttribute("role", "button");
    goDown.setAttribute("tabindex", "0");
    goDown.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") go();
    });
  }

  // eliminado: banner de cookies
});

/* En el javascript debemos poner el string vacío en el primer momento que 
se toca el boton, luego que se asigne el none para que asi pueda volver a entrar
ya que sino de otra manera solo te permitiría entrar una o ninguna. */
