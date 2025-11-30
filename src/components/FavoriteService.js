// src/services/FavoriteService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@book_favorites';

// Lấy tất cả sách yêu thích
export const getFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Lỗi khi đọc danh sách yêu thích:', e);
    return [];
  }
};

// Lưu một cuốn sách
export const saveFavorite = async (book) => {
  try {
    const currentFavorites = await getFavorites();
    // Thêm sách mới nếu nó chưa tồn tại
    if (!currentFavorites.find(item => item.id === book.id)) {
      const newFavorites = [...currentFavorites, book];
      const jsonValue = JSON.stringify(newFavorites);
      await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
      return true;
    }
    return false; // Sách đã tồn tại
  } catch (e) {
    console.error('Lỗi khi lưu sách yêu thích:', e);
    return false;
  }
};

// Xóa một cuốn sách khỏi danh sách yêu thích
export const removeFavorite = async (bookId) => {
  try {
    const currentFavorites = await getFavorites();
    const newFavorites = currentFavorites.filter(book => book.id !== bookId);
    const jsonValue = JSON.stringify(newFavorites);
    await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
    return true;
  } catch (e) {
    console.error('Lỗi khi xoá sách yêu thích:', e);
    return false;
  }
};

// Kiểm tra xem một cuốn sách có phải là yêu thích không
export const isFavorite = async (bookId) => {
  try {
    const currentFavorites = await getFavorites();
    return !!currentFavorites.find(book => book.id === bookId);
  } catch (e) {
    console.error('Lỗi khi kiểm tra sách yêu thích:', e);
    return false;
  }
};