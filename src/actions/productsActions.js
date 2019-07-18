import {
  COUNT,
  NB_PAGES,
  QUERY,
  SELECTED_DEPARTMENT,
  SELECTED_CATEGORY,
  SEARCH_WORD,
  CATEGORIES,
  PAGE,
  PRODUCTS
} from "./types";

export const changeCountAction = newCount => {
  return {
    type: COUNT,
    payload: newCount
  };
};

export const changeNbPagesAction = newNbPages => {
  return {
    type: NB_PAGES,
    payload: newNbPages
  };
};

export const changeQueryAction = newQuery => {
  return {
    type: QUERY,
    payload: newQuery
  };
};

export const changeSelectedDepartmentAction = newSelectedDepartment => {
  return {
    type: SELECTED_DEPARTMENT,
    payload: newSelectedDepartment
  };
};

export const changeSelectedCategoryAction = newSelectedCategory => {
  return {
    type: SELECTED_CATEGORY,
    payload: newSelectedCategory
  };
};

export const changeSearchWordAction = newSearchWord => {
  return {
    type: SEARCH_WORD,
    payload: newSearchWord
  };
};

export const changeCategoriesAction = newCategories => {
  return {
    type: CATEGORIES,
    payload: newCategories
  };
};

export const changePageAction = newPage => {
  return {
    type: PAGE,
    payload: newPage
  };
};

export const changeProductsAction = newProducts => {
  return {
    type: PRODUCTS,
    payload: newProducts
  };
};
