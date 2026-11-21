# Serie II – Formulario de registro + Cypress

Página sencilla (HTML, CSS y JS sin frameworks) con un formulario de registro validado en JavaScript y probado con Cypress.

## Estructura

```
registro-cypress/
├── index.html               # Página con el formulario
├── styles.css               # Estilos
├── script.js                # Validación en JS (sin recargar la página)
├── package.json             # Dependencia de Cypress y scripts
├── cypress.config.js        # Configuración de Cypress
└── cypress/e2e/registro.cy.js   # Las 2 pruebas
```

## Validaciones (script.js)

| Campo      | Regla                          | Mensaje de error                                  |
|------------|--------------------------------|---------------------------------------------------|
| Nombre     | No puede estar vacío           | El nombre es obligatorio                          |
| Correo     | Debe contener `@`              | El correo debe contener @                         |
| Contraseña | Al menos 6 caracteres          | La contraseña debe tener al menos 6 caracteres    |

- Dato inválido → mensaje de error junto al campo, sin recargar (`preventDefault`).
- Datos válidos → mensaje **"Registro exitoso"** y el formulario se vacía (`form.reset()`), sin recargar.

## Pasos con Cypress

Requisito: tener Node.js instalado (`node -v`).

1. Abrir una terminal en la carpeta del proyecto:
   ```bash
   cd registro-cypress
   ```
2. **Instalar Cypress:**
   ```bash
   npm install
   ```
   (equivale a `npm install cypress --save-dev`)
3. **Abrir el Test Runner:**
   ```bash
   npx cypress open
   ```
   - Elegir **E2E Testing** → elegir navegador (Chrome o Electron) → **Start E2E Testing**.
   - Hacer clic en **registro.cy.js**.
4. Se ejecutan las 2 pruebas y deben quedar en **verde (passed)**:
   - ✅ muestra los 3 mensajes de error con datos inválidos
   - ✅ muestra registro exitoso y limpia el formulario con datos válidos

También se pueden correr en la terminal sin abrir la ventana:
```bash
npx cypress run
```
Al final muestra una tabla con `2 passing`.

## Qué verifica cada prueba

**Prueba 1 – datos inválidos:** deja el nombre vacío, escribe `correosinarroba` y la contraseña `123`, presiona *Registrarse* y comprueba que aparecen los 3 mensajes de error, que no hay mensaje de éxito y que la página no se recargó.

**Prueba 2 – datos válidos:** escribe `Juan Pérez`, `juan@correo.com` y `secreto123`, presiona *Registrarse* y comprueba que aparece "Registro exitoso", que los 3 campos quedan vacíos, que no hay errores y que la página no se recargó.
