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

export type TForm = {
  email: string;
  password: string;
  name: string;
};

export type clickCallback = (e: React.SyntheticEvent) => void;