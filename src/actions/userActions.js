import { USER, CUSTOMER } from "./types";

export const changeUserAction = newUser => {
  return {
    type: USER,
    payload: newUser
  };
};

export const changeCustomerAction = newCustomer => {
  return {
    type: CUSTOMER,
    payload: newCustomer
  };
};
