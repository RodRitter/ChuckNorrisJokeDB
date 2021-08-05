import { combineReducers } from "redux";
import categories from "./categories";

export default combineReducers({ categories });

export interface RootState {
  categories: object[];
}
