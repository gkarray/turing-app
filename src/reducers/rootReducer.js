import {
  COUNT,
  NB_PAGES,
  CART_ID,
  PAGE,
  SELECTED_CATEGORY,
  SELECTED_COLOR,
  SELECTED_DEPARTMENT,
  SELECTED_SIZE,
  CATEGORIES,
  USER,
  PRODUCT,
  PRODUCTS,
  CUSTOMER,
  SEARCH_WORD,
  QUERY
} from "../actions/types";

const initState = {
  user: null,
  categories: [],
  products: [],
  query: "none",
  nbPages: 0,
  count: 0,
  page: 1,
  selectedDepartment: 0,
  selectedCategory: 0,
  searchWord: "",
  selectedProduct: {},
  selectedSize: 0,
  selectedColor: 0,
  cartID: ""
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case COUNT:
      return {
        ...state,
        count: parseInt(action.payload)
      };
    case NB_PAGES:
      return {
        ...state,
        nbPages: parseInt(action.payload)
      };

    case CART_ID:
      return {
        ...state,
        cartID: action.payload
      };

    case PAGE:
      //console.log(state.page);
      return {
        ...state,
        page: parseInt(action.payload)
      };
    case SELECTED_COLOR:
      return {
        ...state,
        selectedColor: action.payload
      };

    case CUSTOMER:
      return {
        ...state,
        user: { ...state.user, customer: action.payload }
      };

    case SELECTED_SIZE:
      return {
        ...state,
        selectedSize: action.payload
      };

    case PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload
      };

    case PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case QUERY:
      return {
        ...state,
        query: action.payload
      };

    case CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };

    case SELECTED_DEPARTMENT:
      return {
        ...state,
        selectedDepartment: parseInt(action.payload)
      };

    case SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: parseInt(action.payload)
      };

    case SEARCH_WORD:
      return {
        ...state,
        searchWord: action.payload
      };

    case USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};

export default rootReducer;
