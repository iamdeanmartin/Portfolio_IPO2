// Código que se encarga del icono del menu y su apertura
document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menu-icon");
  const linksNavegador = document.getElementById("link-navegador");
  const navLinks = document.querySelectorAll(".links-navegador li a");

  // Verifica si los elementos del menú existen
  if (!menuIcon || !linksNavegador) {
    console.error("Elementos del menú no encontrados");
    return;
  }

  // Función para alternar el menú
  function toggleMenu() {
    linksNavegador.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  }

  // Esto es para que se abra el menu al hacer click
  menuIcon.addEventListener("click", function (e) {
    e.stopPropagation(); //Hace que el click solo lo detecte en el icono del menu
    toggleMenu();
  });

  // Esto es para que cuando hagas click en un link del menu se cierre el menu
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      linksNavegador.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Aquí hace que se cierre el menu automaticamente al hacer click fuera
  document.addEventListener("click", function (e) {
    if (!menuIcon.contains(e.target) && !linksNavegador.contains(e.target)) {
      linksNavegador.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });

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

  themeSwitch.addEventListener("click", () => {
    if (darkmode !== "active") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });

  // eliminado: banner de cookies
});

/* En el javascript debemos poner el string vacío en el primer momento que 
se toca el boton, luego que se asigne el none para que asi pueda volver a entrar
ya que sino de otra manera solo te permitiría entrar una o ninguna. */
