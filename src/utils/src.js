import {getCookie} from '../utils/utils.js';

const FETCH_URL = 'https://norma.nomoreparties.space/api/ingredients';
const POST_ENDPOINT = 'https://norma.nomoreparties.space/api/orders';
const REGISTER = 'https://norma.nomoreparties.space/api/auth/register';
const EMAIL_EXIST = 'https://norma.nomoreparties.space/api/password-reset';
const PASSWORD_RESET = 'https://norma.nomoreparties.space/api/password-reset/reset';
const AUTH = 'https://norma.nomoreparties.space/api/auth/login';
const GET_USER = 'https://norma.nomoreparties.space/api/auth/user';
const REFRESH_TOKEN = 'https://norma.nomoreparties.space/api/auth/token';
const LOGOUT = 'https://norma.nomoreparties.space/api/auth/logout';

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

// проверка существования email
export  const emailExist = async(email) => {
  const res = await fetch(EMAIL_EXIST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    });
  if (res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка ${res.status}`);
  }
}

// сброс пароля
export  const resetPassword = async(form) => {
  const res = await fetch(PASSWORD_RESET, {
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

// авторизация
export  const authorization = async(form) => {
  const res = await fetch(AUTH, {
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

// запрос данных о пользователе
export  const getUserRequest = async() => {
  const res = await fetch(GET_USER, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      },
    });
  if (res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка ${res.status}`);
  }
}

// обновление токена
export  const getNewToken = async() => {
  const res = await fetch(REFRESH_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: getCookie('refreshToken')})
    });
  if (res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка ${res.status}`);
  }
}

// обновление данных пользователя
export  const refreshUser = async(form) => {
  const res = await fetch(GET_USER, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify(form)
    });
  if (res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка ${res.status}`);
  }
}

// выход из системы
export  const logoutRequest = async() => {
  const res = await fetch(LOGOUT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: getCookie('refreshToken')})
    });
  if (res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка ${res.status}`);
  }
}