const FETCH_URL = 'https://norma.nomoreparties.space/api/ingredients';
const POST_ENDPOINT = 'https://norma.nomoreparties.space/api/orders';
const REGISTER = 'https://norma.nomoreparties.space/api/auth/register';

// запрос за данными на сервер для списка доступных игредиентов бургера
export  const fetchData = async() => {
    const res = await fetch(FETCH_URL);
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

// получение номера заказа
export  const postData = async(ingredients) => {
    const res = await fetch(POST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients
        })
      });
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

// регистрация
export  const registerUser = async(form) => {
    const res = await fetch(REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
}