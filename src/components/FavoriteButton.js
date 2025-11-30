// src/components/FavoriteButton.js
import { Icon, IconButton } from 'native-base';
import { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { isFavorite, removeFavorite, saveFavorite } from './FavoriteService';

// Component này nhận vào *toàn bộ* đối tượng `book`
const FavoriteButton = ({ book }) => {
  const [isLiked, setIsLiked] = useState(false);

  // Kiểm tra trạng thái yêu thích khi component được tải
  useEffect(() => {
    const checkStatus = async () => {
      if (book?.id) {
        const status = await isFavorite(book.id);
        setIsLiked(status);
      }
    };
    checkStatus();
  }, [book]);

  // Hàm xử lý khi nhấn nút
  const toggleFavorite = async () => {
    if (isLiked) {
      // Nếu đang thích -> Xóa
      await removeFavorite(book.id);
      setIsLiked(false);
    } else {
      // Nếu chưa thích -> Lưu
      await saveFavorite(book);
      setIsLiked(true);
    }
  };

  if (!book?.id) return null; // Không hiển thị gì nếu không có thông tin sách

  return (
    <IconButton
      icon={
        <Icon
          as={FontAwesome}
          name={isLiked ? 'heart' : 'heart-o'} // 'heart' (đầy) hoặc 'heart-o' (viền)
          color={isLiked ? 'red.500' : 'gray.500'}
          size="md"
        />
      }
      onPress={toggleFavorite}
      variant="ghost" // Nút trong suốt
      colorScheme="red"
      position="absolute" // Đặt nút ở góc
      top={1}
      right={1}
      zIndex={1} // Nằm trên các thành phần khác
    />
  );
};

export default FavoriteButton;