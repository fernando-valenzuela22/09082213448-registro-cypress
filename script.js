// Referencias a los elementos del formulario
const formulario = document.getElementById('formRegistro');
const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const password = document.getElementById('password');

const errorNombre = document.getElementById('errorNombre');
const errorCorreo = document.getElementById('errorCorreo');
const errorPassword = document.getElementById('errorPassword');
const mensajeExito = document.getElementById('mensajeExito');

// Muestra un error junto al campo
function mostrarError(input, span, mensaje) {
  span.textContent = mensaje;
  input.classList.add('invalido');
}

// Limpia el error de un campo
function limpiarError(input, span) {
  span.textContent = '';
  input.classList.remove('invalido');
}

formulario.addEventListener('submit', function (evento) {
  // Evita que la página se recargue
  evento.preventDefault();

  mensajeExito.textContent = '';
  let esValido = true;

  // 1. Nombre no vacío
  if (nombre.value.trim() === '') {
    mostrarError(nombre, errorNombre, 'El nombre es obligatorio');
    esValido = false;
  } else {
    limpiarError(nombre, errorNombre);
  }

  // 2. Correo debe contener @
  if (!correo.value.includes('@')) {
    mostrarError(correo, errorCorreo, 'El correo debe contener @');
    esValido = false;
  } else {
    limpiarError(correo, errorCorreo);
  }

  // 3. Contraseña de al menos 6 caracteres
  if (password.value.length < 6) {
    mostrarError(password, errorPassword, 'La contraseña debe tener al menos 6 caracteres');
    esValido = false;
  } else {
    limpiarError(password, errorPassword);
  }

  // Si todo es válido: mensaje de éxito y formulario vacío
  if (esValido) {
    mensajeExito.textContent = 'Registro exitoso';
    formulario.reset();
  }
});
