describe('Formulario de Registro', () => {
  beforeEach(() => {
    // Abre la página local (index.html en la raíz del proyecto)
    cy.visit('index.html');
  });

  it('muestra los 3 mensajes de error con datos inválidos', () => {
    // Marca la ventana para comprobar que la página NO se recarga
    cy.window().then((win) => { win.sinRecargar = true; });

    cy.get('#nombre').clear();                 // nombre vacío
    cy.get('#correo').type('correosinarroba'); // correo sin @
    cy.get('#password').type('123');           // contraseña corta
    cy.get('#btnRegistrar').click();

    cy.get('#errorNombre').should('be.visible').and('have.text', 'El nombre es obligatorio');
    cy.get('#errorCorreo').should('be.visible').and('have.text', 'El correo debe contener @');
    cy.get('#errorPassword').should('be.visible').and('have.text', 'La contraseña debe tener al menos 6 caracteres');
    cy.get('#mensajeExito').should('have.text', '');

    // Si la página se hubiera recargado, la marca ya no existiría
    cy.window().its('sinRecargar').should('eq', true);
  });

  it('muestra registro exitoso y limpia el formulario con datos válidos', () => {
    cy.window().then((win) => { win.sinRecargar = true; });

    cy.get('#nombre').type('Juan Pérez');
    cy.get('#correo').type('juan@correo.com');
    cy.get('#password').type('secreto123');
    cy.get('#btnRegistrar').click();

    cy.get('#mensajeExito').should('be.visible').and('have.text', 'Registro FALLIDO');

    // Formulario vacío
    cy.get('#nombre').should('have.value', '');
    cy.get('#correo').should('have.value', '');
    cy.get('#password').should('have.value', '');

    // Sin mensajes de error
    cy.get('#errorNombre').should('have.text', '');
    cy.get('#errorCorreo').should('have.text', '');
    cy.get('#errorPassword').should('have.text', '');

    cy.window().its('sinRecargar').should('eq', true);
  });

  it('permite una contraseña que tenga exactamente 6 caracteres', () => {
    cy.get('#nombre').type('Fernando');
    cy.get('#correo').type('fernando@correo.com');
    cy.get('#password').type('123456');
    cy.get('#btnRegistrar').click();

    cy.get('#mensajeExito').should('have.text', 'Registro FALLIDO');
    cy.get('#errorPassword').should('have.text', '');
  });
});
