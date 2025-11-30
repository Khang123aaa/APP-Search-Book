// redux/movieAction.js
export function searchBooks(keyword) {
  console.log("action: " + keyword)
  return {
    type: 'FETCHING',
    payload: {keyword}
  };
};
 