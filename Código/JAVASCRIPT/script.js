// Código para el formulario de acceso
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Quita los mensajes de error que nos haya salido antes
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Quita la lisyta de usuarios mostrado cuando puedes acceder a la API
    document.getElementById('message').textContent = '';
    document.getElementById('userList').innerHTML = '';
    
    // Obtiene lo que se ha introducido en cada uno de los labels
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Validar email
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Por favor, introduce un email válido.';
        return;
    }
    
    // Validar contraseña
    if (!validatePassword(password)) {
        document.getElementById('passwordError').textContent = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.';
        return;
    }
    
    // Estas son las credenciales para poder entrar en la API
    //Supongo que el login ha de ser con credenciales concretas como estas asi que las dejo por aqui para poder entrar a la info de la API
    if (email === 'deanmartingarcia2004@gmail.com' && password === 'Dean1234') {
        document.getElementById('message').textContent = 'Credenciales correctas. Cargando datos...';
        document.getElementById('message').className = 'success';
        fetchUsers();
    } else {
        document.getElementById('message').textContent = '¡Error! El mail o la contraseña son incorrectos, vuelva a intentarlo...';
        document.getElementById('message').className = 'error';
    }
});

// Valida como está posicionado mail, si contiene un @ y un punto etc. (AYUDADO CON LA IA PORQUE NO SABIA HACER ESTO)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

//Valida si la contraseña tiene al menos 8 caracteres, una mayúscula y un número (AYUDADO CON LA IA PORQUE NO SABIA COMO HACER ESTO)
function validatePassword(password) {
    const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
}

// Apartado para obtener los users del API
function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('¡Error al cargar los usuarios! Inténtelo más tarde...');
            }
            return response.json();
        })
        .then(users => {
            displayUsers(users);
        })
        .catch(error => {
            document.getElementById('message').textContent = error.message;
            document.getElementById('message').className = 'error';
        });
}

// Función para mostrar los usuarios
function displayUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '<h2>Lista de Usuarios</h2>';
    
    if (users.length === 0) {
        userList.innerHTML += '<p>No se han encontrado usuarios en el sistema.</p>';
        return;
    }
    
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Teléfono:</strong> ${user.phone}</p>
            <p><strong>Empresa:</strong> ${user.company.name}</p>
            <p><strong>Ciudad:</strong> ${user.address.city}</p>
        `;
        
        userList.appendChild(userCard);
    });
    
    document.getElementById('message').textContent = '¡Felicidades! Los datos se han cargado en el sistema correctamente.';
    document.getElementById('message').className = 'success';
}

// Código que se encarga del icono del menu y su apertura
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const linksNavegador = document.getElementById('link-navegador');
    const navLinks = document.querySelectorAll('.links-navegador li a');

    // Verifica si los elementos del menú existen
    if (!menuIcon || !linksNavegador) {
        console.error('Elementos del menú no encontrados');
        return;
    }

    // Función para alternar el menú
    function toggleMenu() {
        linksNavegador.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    // Esto es para que se abra el menu al hacer click
    menuIcon.addEventListener('click', function(e) {
        e.stopPropagation(); //Hace que el click solo lo detecte en el icono del menu
        toggleMenu();
    });

    // Esto es para que cuando hagas click en un link del menu se cierre el menu
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            linksNavegador.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Aquí hace que se cierre el menu automaticamente al hacer click fuera 
    document.addEventListener('click', function(e) {
        if (!menuIcon.contains(e.target) && !linksNavegador.contains(e.target)) {
            linksNavegador.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    //Código para el cambio al dark mode y el light mode
    const themeSwitch = document.getElementById('theme-switch');
    
    // Se asegura que esté el elemento del theme switch para que el cambio sea posible
    if (!themeSwitch) {
        console.error('Theme switch no encontrado');
        return;
    }

    //Esto es para guardar el theme que tenemos en el momento que cerramos la pagina
    //y que cuando volvamos a cargarla aparezca con el theme anterior
    let darkmode = localStorage.getItem('darkmode');

    //Apartado para activar el dark mode
    const enableDarkMode = () => {
        document.body.classList.add('darkmode');
        localStorage.setItem('darkmode', 'active');
        darkmode = 'active';
    }

    //Apartado para desactivar el dark mode
    const disableDarkMode = () => {
        document.body.classList.remove('darkmode');
        localStorage.setItem('darkmode', null);
        darkmode = null;
    }

    //Aplica el modo guardado en el local storage cuando cargamos la página
    if (darkmode === 'active') {
        enableDarkMode();
    }

    themeSwitch.addEventListener('click', () => {
        if (darkmode !== 'active') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    // Código que se encarga del wrapper de cookies
    const cookieBox = document.querySelector('.wrapper');
    const buttons = document.querySelectorAll('.button');

    //Hace el control de errores para el wrapper de cookies.
    if (!cookieBox || buttons.length === 0) {
        console.error("No se encuentra ningún elemento en el wrapper de los cookies.");
        return;
    }

    // Si la cookie ya está guardada entonces no se muestra el banner
    if (document.cookie.includes("cookieBannerDisplayed=true")) return;

    // Esto hace el proceso más realista ya que lo que hace es que se cargue el banner
    // un segundo despues de que se haya cargado la página.
    setTimeout(() => {
        cookieBox.classList.add('show');
    }, 1000);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            //Cuando hacemos click en uno de los botones entonces el wrapper se va de la pantalla
            //al ponerle que el show se quite
            cookieBox.classList.remove('show');

            //guradar la cookie en el navegador durante el tiempo que le hemos puesto que es de un mes
            if (button.id === "acceptBtn") {
                document.cookie = "cookieBannerDisplayed=true; max-age=" + (60 * 60 * 24 * 30) + "; path=/";
            }
            else if (button.id === "rejectBtn") {
                document.cookie = "cookieBannerDisplayed=true; max-age=" + (60 * 60 * 24 * 30) + "; path=/";
            }
        });
    });
});
/* En el javascript debemos poner el string vacío en el primer momento que 
se toca el boton, luego que se asigne el none para que asi pueda volver a entrar
ya que sino de otra manera solo te permitiría entrar una o ninguna. */
   