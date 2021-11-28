export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
 };

export type TIngredientWithKey = TIngredient & {key?: string};

export type TForm = {
  email: string;
  password: string;
  name: string;
};

export type submitCallback = (e: React.FormEvent<HTMLFormElement>) => void;

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: 'status' | 'pending' | 'done';
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export type TOrderResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
}