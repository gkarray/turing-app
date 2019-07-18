export const changeCountAction = newCount => {
  return {
    type: "COUNT",
    newCount: newCount
  };
};

export const changeNbPagesAction = newNbPages => {
  return {
    type: "NB_PAGES",
    newNbPages: newNbPages
  };
};

export const changeCartIDAction = newCartID => {
  return {
    type: "CART_ID",
    newCartID: newCartID
  };
};

export const changeSelectedColorAction = newSelectedColor => {
  return {
    type: "SELECTED_COLOR",
    newSelectedColor: newSelectedColor
  };
};

export const changeCustomerAction = newCustomer => {
  return {
    type: "CUSTOMER",
    newCustomer: newCustomer
  };
};

export const changeSelectedSizeAction = newSelectedSize => {
  return {
    type: "SELECTED_SIZE",
    newSelectedSize: newSelectedSize
  };
};

export const changeProductAction = newProduct => {
  return {
    type: "PRODUCT",
    newProduct: newProduct
  };
};

export const changeQueryAction = newQuery => {
  return {
    type: "QUERY",
    newQuery: newQuery
  };
};

export const changeSelectedDepartmentAction = newSelectedDepartment => {
  return {
    type: "SELECTED_DEPARTMENT",
    newSelectedDepartment: newSelectedDepartment
  };
};

export const changeSelectedCategoryAction = newSelectedCategory => {
  return {
    type: "SELECTED_CATEGORY",
    newSelectedCategory: newSelectedCategory
  };
};

export const changeSearchWordAction = newSearchWord => {
  return {
    type: "SEARCH_WORD",
    newSearchWord: newSearchWord
  };
};

export const changeCategoriesAction = newCategories => {
  return {
    type: "CATEGORIES",
    newCategories: newCategories
  };
};

export const changeUserAction = newUser => {
  return {
    type: "USER",
    newUser: newUser
  };
};

export const changePageAction = newPage => {
  return {
    type: "PAGE",
    newPage: newPage
  };
};

export const changeProductsAction = newProducts => {
  return {
    type: "PRODUCTS",
    newProducts: newProducts
  };
};
