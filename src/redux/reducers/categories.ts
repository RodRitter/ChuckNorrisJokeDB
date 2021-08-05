import { UPDATE_CATEGORIES } from "../actionTypes";

interface IAction {
  type: string;
  payload: Array<string>;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action: IAction) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      if (action.payload) {
        return action.payload;
      }
      return state;
    default:
      return state;
  }
};
