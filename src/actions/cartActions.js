import { CART_ID, SELECTED_COLOR, SELECTED_SIZE, PRODUCT } from "./types";

export const changeCartIDAction = newCartID => {
  return {
    type: CART_ID,
    payload: newCartID
  };
};

export const changeSelectedColorAction = newSelectedColor => {
  return {
    type: SELECTED_COLOR,
    payload: newSelectedColor
  };
};

export const changeSelectedSizeAction = newSelectedSize => {
  return {
    type: SELECTED_SIZE,
    payload: newSelectedSize
  };
};

export const changeProductAction = newProduct => {
  return {
    type: PRODUCT,
    payload: newProduct
  };
};
