import {getCookie} from './utils';
import {TIngredient, TForm} from './types';

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

type TOrderNumber = TServerResponse & {
  order: {number: number}
}

type TIngredientServer = TServerResponse & {
  data: TIngredient[];
}

const API_URL = 'https://norma.nomoreparties.space/api';

const FETCH_URL = `${API_URL}/ingredients`;
const POST_ENDPOINT = `${API_URL}/orders`;
const REGISTER = `${API_URL}/auth/register`;
const EMAIL_EXIST = `${API_URL}/password-reset`;
const PASSWORD_RESET = `${API_URL}/password-reset/reset`;
const AUTH = `${API_URL}/auth/login`;
const GET_USER = `${API_URL}/auth/user`;
const REFRESH_TOKEN = `${API_URL}/auth/token`;
const LOGOUT = `${API_URL}/auth/logout`;

const getResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
}

// запрос за данными на сервер для списка доступных игредиентов бургера
export  const fetchData = async():Promise<TIngredientServer> => {
    return await fetch(FETCH_URL)
    .then(res => getResponse<TIngredientServer>(res));
}

// получение номера заказа
export  const postData = async(ingredients: string[]):Promise<TOrderNumber> => {
    return await fetch(POST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients
        })
      })
      .then(res => getResponse<TOrderNumber>(res));
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