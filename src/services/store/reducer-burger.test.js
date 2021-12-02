import burgerIngredientsReducer from './burger';
import {
    getIngredientsRequest, 
    getIngredientsSuccess, 
    getIngredientsFailed, 
    getNumberOrderSuccess,
    getNumberOrderFailed,
    getburgerIngredients,
    increaseCounter,
    deleteBurgerIngredient,
    decreaseCounter,
    getNumberOrderRequest,
    increasePrice,
    decreasePrice,
    moveCard
} from './burger';

const initialState = {
    items: [], 
    itemsRequest: false,
    itemsFailed: false,
    orderNumberRequest: false,
    orderNumber: 0,
    orderNumberFailed: false,
    burgerIngredients: [], 
    counter: {},
    price: 0 
};

const ingredientBun = {
    key: 1234334,
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка",
    price: 1255,
    proteins: 80,
    type: "bun",
    __v: 0,
    _id: "1"
}

const ingredientMain = {
    calories: 84,
    carbohydrates: 85,
    fat: 26,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    name: "Филе Люминесцентного тетраодонтимформа",
    price: 988,
    proteins: 44,
    type: "main",
    __v: 0,
    _id: "2"
}

const ingredientSouce = {
    calories: 84,
    carbohydrates: 85,
    fat: 26,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    name: "Филе Люминесцентного тетраодонтимформа",
    price: 988,
    proteins: 44,
    type: "souce",
    __v: 0,
    _id: "2"
}

const testInitialState = {
    items: [], 
    itemsRequest: false,
    itemsFailed: false,
    orderNumberRequest: false,
    orderNumber: 0,
    orderNumberFailed: false,
    burgerIngredients: [ingredientBun, ingredientMain], 
    counter: {'123': 0},
    price: 10 
}

describe('Reducer burger', () => {

    test('should return initial state', () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState)
    }),

    test('should return getIngredientsRequest true', () => {
        expect(burgerIngredientsReducer(initialState, {type: getIngredientsRequest})).toEqual(
            expect.objectContaining({
                itemsRequest: true
            })
        )
    }),

    test('should return getIngredientsSuccess', () => {
        expect(burgerIngredientsReducer(initialState, {type: getIngredientsSuccess, payload: ingredientBun})).toEqual(
            expect.objectContaining({
                itemsFailed: false,
                items: ingredientBun,
                itemsRequest: false
            })
        )
    }),

    test('should return getIngredientsFailed true', () => {
        expect(burgerIngredientsReducer(initialState, {type: getIngredientsFailed})).toEqual(
            expect.objectContaining({
                itemsFailed: true,
                itemsRequest: false
            })
        )
    }),

    test('should return getNumberOrderRequest true', () => {
        expect(burgerIngredientsReducer(initialState, {type: getNumberOrderRequest})).toEqual(
            expect.objectContaining({
                orderNumberRequest: true
            })
        )
    }),

    test('should return getNumberOrderSuccess true', () => {
        expect(burgerIngredientsReducer(initialState, {type: getNumberOrderSuccess, payload: 12345})).toEqual(
            expect.objectContaining({
                orderNumberFailed: false,
                orderNumber: 12345,
                orderNumberRequest: false,
                burgerIngredients: [],
                price: 0,
                counter: {}
            })
        )
    }),

    test('should return getNumberOrderFailed true', () => {
        expect(burgerIngredientsReducer(initialState, {type: getNumberOrderFailed})).toEqual(
            expect.objectContaining({
                orderNumberFailed: true,
                orderNumberRequest: false
            })
        )
    }),

    test('should return decreasePrice true', () => {
        expect(burgerIngredientsReducer(testInitialState, {type: decreasePrice, payload: 1})).toEqual(
            expect.objectContaining({
                price: 9
            })
        )
    })

    test('should return increasePrice true', () => {
        expect(burgerIngredientsReducer(testInitialState, {type: increasePrice, payload: 1})).toEqual(
            expect.objectContaining({
                price: 11
            })
        )
    })

    test('should return getburgerIngredients true', () => {
        expect(burgerIngredientsReducer(testInitialState, {type: getburgerIngredients, payload: {ingredient: ingredientSouce, price: 12}})).toEqual(
            expect.objectContaining({
                burgerIngredients: [ingredientBun, ingredientMain, ingredientSouce],
                price: 22
            })
        )
    })

    test('should return deleteBurgerIngredient true', () => {
        expect(burgerIngredientsReducer(testInitialState, {type: deleteBurgerIngredient, payload: 1})).toEqual(
            expect.objectContaining({
                burgerIngredients: [ingredientBun],
            })
        )
    })

    test('should return increaseCounter true', () => {
        expect(burgerIngredientsReducer(testInitialState, {type: increaseCounter, payload: {id: '123', counter: 1}})).toEqual(
            expect.objectContaining({
                counter: {'123': 1},
            })
        )
    })

    test('should return decreaseCounter true', () => {
        expect(burgerIngredientsReducer(testInitialState, {type: decreaseCounter, payload: {id: '123', counter: 0}})).toEqual(
            expect.objectContaining({
                counter: {'123': 0},
            })
        )
    })

    test('should return moveCard true', () => {
        expect(burgerIngredientsReducer(testInitialState, {type: moveCard, payload: {dragIndex: 0, hoverIndex: 1}})).toEqual(
            expect.objectContaining({
                burgerIngredients: [ingredientMain, ingredientBun]
            })
        )
    })
})