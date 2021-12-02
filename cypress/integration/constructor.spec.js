describe('open/close ingredient modal correctly', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.visit('http://localhost:3000/');
    })

    it('open/close modal window and check ingredient characteristics', () => {
        // клик по ингредиенту
        cy.get('[data-qa=ingredient-card]').contains('Краторная булка').click();

        // чекаем характеристики
        cy.get('[data-qa=ingredient-name]').contains('Краторная булка').should('exist');
        cy.get('[data-qa=ingredient-characteristic-title]').contains('Калории, ккал').should('exist');
        cy.get('[data-qa=ingredient-characteristic]').contains(420).should('exist');
        cy.get('[data-qa=ingredient-characteristic-title]').contains('Белки, г').should('exist');
        cy.get('[data-qa=ingredient-characteristic]').contains(80).should('exist');
        cy.get('[data-qa=ingredient-characteristic-title]').contains('Жиры, г').should('exist');
        cy.get('[data-qa=ingredient-characteristic]').contains(24).should('exist');
        cy.get('[data-qa=ingredient-characteristic-title]').contains('Углеводы, г').should('exist');
        cy.get('[data-qa=ingredient-characteristic]').contains(53).should('exist');

        // закрываем окно по клику
        cy.get('[data-qa=close-icon]').click();
    })
})

describe('constructor dnd and order', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.intercept('POST', 'api/auth/login', {fixture: 'login.json'}).as('login');
        cy.intercept('POST', 'api/orders', {fixture: 'order.json'}).as('order');
        cy.visit('http://localhost:3000/');
    })

    it('dnd works and order window shows', () => {
        // dnd
        cy.get('[data-qa=ingredient-card]').contains('Краторная булка').trigger('dragstart');
        cy.get('[data-qa=constructor-container]').trigger('drop');
        cy.get('[data-qa=ingredient-card]').contains('Филе Люминесцентного тетраодонтимформа').trigger('dragstart');
        cy.get('[data-qa=constructor-container]').trigger('drop');

        cy.get('[data-qa=order-button]').click();

        // логинимся
        cy.get('form input[type=email]').type('zina270994@yandex.ru');
        cy.get('form input[type=password]').type('7777');
        cy.get('form button').click();

        cy.wait('@login').its('request.body').should('deep.equal', {
            email: 'zina270994@yandex.ru',
            password: '7777'
        })

        cy.wait(1000);
        cy.get('[data-qa=main-link]').click();
        cy.get('[data-qa=order-button]').click();

        cy.wait('@order').its('request.body').should('deep.equal', {
            ingredients: ['1', '2']
        });

        cy.get('[data-qa=order-nunber]').contains('55555').should('exist');

        cy.get('[data-qa=close-icon]').click();
    })
})
