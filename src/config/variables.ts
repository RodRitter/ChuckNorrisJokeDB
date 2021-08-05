export const COLORS = {
  primary: "#31235C",
  secondary: "#c7c7c7",
  tertiary: "#5f4d94",
};

const CORS_ANYWHERE = "https://ritter-cors-anywhere.herokuapp.com/";

export const API = {
  categories: `${CORS_ANYWHERE}https://api.chucknorris.io/jokes/categories`,
  random: `${CORS_ANYWHERE}https://api.chucknorris.io/jokes/random`,
  search: `${CORS_ANYWHERE}https://api.chucknorris.io/jokes/search`,
};
