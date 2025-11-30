// src/screens/BookDetail.js
import React from 'react';
import {
  Image,
  Linking,
  ScrollView, // <-- SỬA 1: Import ScrollView từ react-native
  StyleSheet,
  Text,
  View
} from 'react-native';

// SỬA 2: Xóa 'ScrollView' khỏi 'native-base' vì ta dùng của react-native
import { Button, Divider, HStack, VStack } from 'native-base';
import Card from '../components/Card';
// SỬA 3: Sửa đường dẫn import (giả định)
import FavoriteButton from '../components/FavoriteButton'; // Đường dẫn này có thể là '../components/FavoriteButton'

const BookDetail = ({ navigation, route }) => {
  const bookInfo = route?.params?.bookInfo ?? route?.params ?? {};
  const openURLButton = async  (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  }

  const previewLink = bookInfo?.volumeInfo?.previewLink;
  const buyLink = bookInfo?.saleInfo?.buyLink;
  const price = bookInfo.saleInfo?.listPrice?.amount || 0;
  const currency = bookInfo.saleInfo?.listPrice?.currencyCode || "VND";

  // SỬA 4: Bọc toàn bộ return bằng ScrollView
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Card style={{width: "95%", margin: 10}}>
        <FavoriteButton book={bookInfo} />
        <HStack>
          <Image source={{ uri: bookInfo?.volumeInfo?.imageLinks?.thumbnail }} resizeMode='contain' style={styles.thumbnail} />
          <View style={{ marginHorizontal: 1, flex: 1, justifyContent:"center", alignContent:'center'}}>
            <Text style={styles.bookTitle}>{bookInfo.volumeInfo?.title || ""}</Text>
            <Text style={styles.subText}>Ngày xuất bản: {bookInfo.volumeInfo?.publishedDate || ""}</Text>
            <Text style={styles.subText}>Số trang: {bookInfo.volumeInfo?.pageCount || 0}</Text>
            <Text style={styles.subText}>Giá: {price} {currency}</Text>
          </View>
        </HStack>
        <Divider style={{marginVertical: 10}}/>
        
        {/* SỬA 5: Xóa ScrollView lồng nhau (có maxHeight: 200) */}
        <Text style={styles.description}>{bookInfo?.volumeInfo?.description || "Không có miêu tả"}</Text>

        <VStack space={3} style={styles.buttonContainer}>
          
          {/* Nút 1: Đọc thử */}
          {previewLink && (
            <Button 
              onPress={() => openURLButton(previewLink)} 
              size="md"
              colorScheme="green"
            >
              <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">
                ĐỌC THỬ ONLINE
              </Text>
            </Button>
          )}

          {/* Nút 2: Mua sách */}
          {buyLink && (
            <Button 
              onPress={() => openURLButton(buyLink)} 
              size="md"
              colorScheme="secondary"
            >
              <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode="tail">
                MUA SÁCH ({price} {currency})
              </Text>
            </Button>
          )}
          
          {/* Nút 3: Quay lại (Giữ nguyên) */}
          <Button 
            onPress={() => navigation.goBack()}
            size="md" 
            variant="outline"
            colorScheme="secondary"
            // flex={1} (đã có trong file của bạn)
          >
            QUAY LẠI
          </Button>
        </VStack>
      </Card>
    </ScrollView> // <-- SỬA 4: Đóng thẻ ScrollView
  );
}

const styles = StyleSheet.create({
  // SỬA 7: Thêm style cho ScrollView
  scrollContainer: {
    flexGrow: 1, // Đảm bảo container có thể giãn ra
    alignItems: 'center', // Căn giữa Card
    paddingVertical: 10, // Thêm đệm trên/dưới
  },
  thumbnail: {
    width: 100, 
    height: 100,
    marginRight: 10,
  },
  bookTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#41bc66",
    width: "90%",
  },
  subText: {
    color: "#000000",
    fontSize: 17
  },
  description: {
    color: "#000000",
    fontSize: 17,
    marginVertical: 10, // Thêm margin cho text mô tả
  },
  buttonContainer: {
    marginVertical: 15,
    marginHorizontal: 10, 
  },
  buttonText: {
    color: 'white',       // Chữ màu trắng
    fontWeight: 'bold', // Chữ đậm
    fontSize: 14,       // Cỡ chữ (giống mặc định của Native Base)
    textAlign: 'center' // Căn giữa (đề phòng)
  }
})

export default BookDetail;