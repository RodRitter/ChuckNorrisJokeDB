import { UPDATE_CATEGORIES } from "./actionTypes";

interface ICategory {
  name: string;
  id: string;
}

export const updateCategories = (categories: ICategory[]) => ({
  type: UPDATE_CATEGORIES,
  payload: categories,
});
