// src/sagas/bookSaga.js
import { put, takeLatest } from 'redux-saga/effects';
import callApi from '../axios';

// Google Books API configuration
export const API_BOOKS_KEY = 'AIzaSyDCnLgnECjxHM6kU0sFFRadGFeCzOp28Wk';
export const GOOGLE_BOOKS_URL = 'https://www.googleapis.com/books';
export const KEY_HEADER = '&key=' + API_BOOKS_KEY;
export const FREE_BOOKS_ENPOINT = '/v1/volumes?q=flowers&filter=free-ebooks';
export const ALL_EBOOKS_ENDPOInT = '/v1/volumes?q=';

export function* search({payload}) {
  // Hiển thị loading
  yield put({type: 'SHOW_LOADING'});

  // Trích xuất từ khóa (keyword) từ dữ liệu trong action gửi tới
  const {keyword} = payload;
  console.log(`OK: ` + keyword)

  // Kết nối API để lấy dữ liệu từ server. Sử dụng thư viện axios
  // Build the request URL using constants so it's easy to maintain
  const query = encodeURIComponent(keyword || '');
  const ENDPOINT = `${GOOGLE_BOOKS_URL}${ALL_EBOOKS_ENDPOInT}${query}${KEY_HEADER}`;
  let items = [];
  try {
    const res = yield callApi(ENDPOINT, "GET", null);
    // axios response usually has data
    if (res && res.data && Array.isArray(res.data.items)) {
      items = res.data.items;
    } else if (res && typeof res === 'string') {
      // callApi returned an error string
      console.error('[bookSaga] callApi error:', res);
    } else if (res && res.data && res.data.items == null) {
      // no items in response
      console.warn('[bookSaga] no items in response, response:', res);
    }
  } catch (e) {
    console.error('[bookSaga] callApi threw:', e && e.toString ? e.toString() : e);
  }

  // Fallback: try fetch directly (useful on web or if axios wrapper fails)
  if (!items.length) {
    try {
      const fallback = yield fetch(ENDPOINT);
      if (fallback && fallback.ok) {
        const json = yield fallback.json();
        if (json && Array.isArray(json.items)) items = json.items;
      } else {
        console.warn('[bookSaga] fetch fallback failed', fallback && fallback.statusText);
      }
    } catch (e) {
      console.error('[bookSaga] fetch fallback threw:', e && e.toString ? e.toString() : e);
    }
  }

  // Lấy được dữ liệu thì đẩy vào store để màn hình nào cũng truy xuất được.
  yield put({type: 'BOOK_FETCHING', payload: items});

  // Sau tất cả thì ẩn loading đi thôi
  yield put({type: 'HIDE_LOADING'});
}

// Hiểu nôm na là mapping hàm generator ở trên với action, 
// để khi ở đó gọi action này thì sẽ gọi tới hàm generator tương ứng này
export const SearchBooks = [
  takeLatest("FETCHING", search)
]