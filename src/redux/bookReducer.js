// redux/movieReducer.js
const initialState = {
  booksSearch: [],
  isLoading: false
};
 
export default (state = initialState, action) => {
  switch (action.type) {
    case 'BOOK_FETCHING':
      console.log("---------------")
      console.log(action.payload);
      return {
        ...state,
        booksSearch: action.payload
      };
    case 'SHOW_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'HIDE_LOADING':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};