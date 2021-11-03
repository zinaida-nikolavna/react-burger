import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const burgerIngredientsReducer = createSlice({
    name: 'burger',
    initialState: {
        items: [], // итемы игредиентов бургера
        itemsRequest: false,
        itemsFailed: false,
        orderNumberRequest: false,
        orderNumber: null, // номер заказа
        orderNumberFailed: false,
        burgerIngredients: [], // итемы в конструкторе
        counter: {}, // объект для хранения счетчиков для ингредиентов
        price: 0 // цена заказа
    },
    reducers: {
        getIngredientsRequest: (state) => {
            state.itemsRequest = true;
        },
        getIngredientsSuccess: (state, action) => {
            state.itemsFailed = false;
            state.items = action.payload;
            state.itemsRequest = false;
        },
        getIngredientsFailed: (state) => {
            state.itemsFailed = true;
            state.itemsRequest = false;
        },
        getNumberOrderRequest: (state) => {
            state.orderNumberRequest = true;
        },
        // получаем номер заказа
        getNumberOrderSuccess: (state, action) => {
            state.orderNumberFailed = false;
            state.orderNumber = action.payload;
            state.orderNumberRequest = false;
            // очищаем конструктор, цену, счетчики
            state.burgerIngredients = [];
            state.price = 0;
            state.counter = {};
        },
        // если апи при получении номера заказа упало
        getNumberOrderFailed: (state) => {
            state.orderNumberFailed = true;
            state.orderNumberRequest = false;
        },
        // ингредиенты, помещенные пользователем в конструктор
        getburgerIngredients: (state, action) => {
            const item = state.items.find(element => element._id === action.payload);
            item.key = uuidv4();
            state.burgerIngredients.push(item);
            if (item.type === 'bun') {
                state.price = state.price + item.price * 2;
            } else {
                state.price = state.price + item.price;
            }
        },
        deleteBurgerIngredient: (state, action) => {
            state.burgerIngredients.splice(action.payload, 1);
        },
        // увеличиваем счетчик
        increaseCounter: (state, action) => {
            // проверяем есть ли такой id ингредиента уже в объекте
            if (action.payload.id in state.counter) {
                // если да, увеличиваем на один
                state.counter[action.payload.id] = state.counter[action.payload.id] + 1;
            } else {
                if (action.payload.type === 'bun') {
                    // если булка, проставляем изначальное значение 2
                    state.counter[action.payload.id] = 2;
                } else {
                    // если нет, проставляем значение 1
                    state.counter[action.payload.id] = 1;
                }
            }
        },
        // уменьшаем счетчик
        decreaseCounter: (state, action) => {
            if (action.payload.type === 'bun') {
                state.counter[action.payload.id] = state.counter[action.payload.id] - 2;
            } else {
                state.counter[action.payload.id] = state.counter[action.payload.id] - 1;
            }
        },
        // увеличиваем цену
        increasePrice: (state, action) => {
            state.price = state.price + action.payload;
        },
        // уменьшаем цену
        decreasePrice: (state, action) => {
            state.price = state.price - action.payload;
        },
        // перемещение ингрединетов dnd
        moveCard: (state, action) => {
            const dragCard = state.burgerIngredients[action.payload.dragIndex];
            state.burgerIngredients.splice(action.payload.dragIndex, 1);
            state.burgerIngredients.splice(action.payload.hoverIndex, 0, dragCard);
        }
    }
});

export const {
    getIngredientsRequest, 
    getIngredientsSuccess, 
    getIngredientsFailed, 
    showIngredient,
    closeIngredient,
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
} = burgerIngredientsReducer.actions;