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
    case "COUNT":
      return {
        ...state,
        count: parseInt(action.newCount)
      };
    case "NB_PAGES":
      return {
        ...state,
        nbPages: parseInt(action.newNbPages)
      };

    case "CART_ID":
      return {
        ...state,
        cartID: action.newCartID
      };

    case "PAGE":
      //console.log(state.page);
      return {
        ...state,
        page: parseInt(action.newPage)
      };
    case "SELECTED_COLOR":
      return {
        ...state,
        selectedColor: action.newSelectedColor
      };

    case "CUSTOMER":
      return {
        ...state,
        user: { ...state.user, customer: action.newCustomer }
      };

    case "SELECTED_SIZE":
      return {
        ...state,
        selectedSize: action.newSelectedSize
      };

    case "PRODUCT":
      return {
        ...state,
        selectedProduct: action.newProduct
      };

    case "PRODUCTS":
      return {
        ...state,
        products: action.newProducts
      };
    case "QUERY":
      return {
        ...state,
        query: action.query
      };

    case "CATEGORIES":
      return {
        ...state,
        categories: action.newCategories
      };

    case "SELECTED_DEPARTMENT":
      return {
        ...state,
        selectedDepartment: parseInt(action.newSelectedDepartment)
      };

    case "SELECTED_CATEGORY":
      return {
        ...state,
        selectedCategory: parseInt(action.newSelectedCategory)
      };

    case "SEARCH_WORD":
      return {
        ...state,
        searchWord: action.newSearchWord
      };

    case "USER":
      return {
        ...state,
        user: action.newUser
      };

    default:
      return state;
  }
};

export default rootReducer;
