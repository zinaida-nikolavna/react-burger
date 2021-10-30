import {getCookie} from './utils';
import {TIngredient, TForm} from './types';

type TIngredients = {
  _id: Pick<TIngredient, '_id'>
}

type TUser = {
  email: string;
  name: string;
}

type TUserData = {
  success: boolean;
  user: TUser;
}

type TToken = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

type TRegisterData = TUserData & {
  accessToken: string;
  refreshToken: string;
}

type TServerResponse = {
  success: boolean;
  message: string;
}

const FETCH_URL = 'https://norma.nomoreparties.space/api/ingredients';
const POST_ENDPOINT = 'https://norma.nomoreparties.space/api/orders';
const REGISTER = 'https://norma.nomoreparties.space/api/auth/register';
const EMAIL_EXIST = 'https://norma.nomoreparties.space/api/password-reset';
const PASSWORD_RESET = 'https://norma.nomoreparties.space/api/password-reset/reset';
const AUTH = 'https://norma.nomoreparties.space/api/auth/login';
const GET_USER = 'https://norma.nomoreparties.space/api/auth/user';
const REFRESH_TOKEN = 'https://norma.nomoreparties.space/api/auth/token';
const LOGOUT = 'https://norma.nomoreparties.space/api/auth/logout';

const getResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
}

// запрос за данными на сервер для списка доступных игредиентов бургера
export  const fetchData = async():Promise<TIngredient[]> => {
    return await fetch(FETCH_URL)
    .then(res => getResponse<TIngredient[]>(res));
}

// получение номера заказа
export  const postData = async(ingredients: TIngredients[]):Promise<number> => {
    return await fetch(POST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients
        })
      })
      .then(res => getResponse<number>(res));
}

// регистрация
export  const registerUser = async(form: TForm): Promise<TRegisterData> => {
    return await fetch(REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      .then(res => getResponse<TRegisterData>(res));
}

// проверка существования email
export  const emailExist = async(email: string): Promise<TServerResponse> => {
  return await fetch(EMAIL_EXIST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    })
    .then(res => getResponse<TServerResponse>(res));
}

// сброс пароля
export  const resetPassword = async(form: TForm): Promise<TServerResponse> => {
  return await fetch(PASSWORD_RESET, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    .then(res => getResponse<TServerResponse>(res));
}

// авторизация
export  const authorization = async(form: TForm): Promise<TRegisterData> => {
  return await fetch(AUTH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    .then(res => getResponse<TRegisterData>(res));
}

// запрос данных о пользователе
export  const getUserRequest = async(): Promise<TUserData> => {
  return await fetch(GET_USER, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      },
    })
    .then(res => getResponse<TUserData>(res));
}

// обновление токена
export  const getNewToken = async(): Promise<TToken> => {
  return await fetch(REFRESH_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: getCookie('refreshToken')})
    })
    .then(res => getResponse<TToken>(res));
}

// обновление данных пользователя
export  const refreshUser = async(form: TForm): Promise<TUserData> => {
  return await fetch(GET_USER, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify(form)
    })
    .then(res => getResponse<TUserData>(res));
}

// выход из системы
export  const logoutRequest = async(): Promise<TServerResponse> => {
  return await fetch(LOGOUT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: getCookie('refreshToken')})
    })
    .then(res => getResponse<TServerResponse>(res));
}