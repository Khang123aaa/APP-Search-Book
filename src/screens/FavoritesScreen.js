// src/screens/FavoritesScreen.js
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { getFavorites } from '../components/FavoriteService';

// Import các component sẵn có của bạn để giữ sự đồng nhất
import { Button, HStack } from 'native-base';
import Card from '../components/Card';

const FavoritesScreen = ({ navigation }) => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  // useFocusEffect sẽ chạy lại mỗi khi bạn quay lại màn hình này
  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        try {
          const books = await getFavorites();
          setFavoriteBooks(books);
        } catch (e) {
          Alert.alert('Lỗi', 'Không thể tải danh sách yêu thích.');
        }
      };
      loadFavorites();
    }, [])
  );

  // Hàm render item, tương tự như trong SearchResult.js
  const renderBookItem = ({ item }) => (
    <Card style={{ width: "95%", margin: 10 }}>
      <HStack>
        <Image 
          source={{ uri: item.volumeInfo?.imageLinks?.thumbnail || "https://vntalking.com/wp-content/uploads/2022/12/No_Image_Available.jpg" }} 
          resizeMode='contain' 
          style={styles.thumbnail} 
        />
        <View style={{ marginHorizontal: 1, flex: 1, justifyContent: "center", alignContent: 'center' }}>
          <Text style={styles.bookTitle}>{item.volumeInfo?.title || ""}</Text>
          <Text style={styles.subText}>Giá: {item.saleInfo?.listPrice?.amount || "0"} {item.saleInfo?.listPrice?.currencyCode || "VND"}</Text>
          <Button 
            onPress={() => navigation.navigate("BookDetail", item)} // Giả sử bạn có "BookDetail" trong navigation
            size="md" 
            style={styles.btn} 
            variant="subtle" 
            colorScheme="secondary"
          >
            Chi tiết
          </Button>
        </View>
      </HStack>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header đơn giản */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tủ Sách Yêu Thích</Text>
      </View>

      {favoriteBooks.length > 0 ? (
        <FlatList
          data={favoriteBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tủ sách của bạn trống.</Text>
          <Text style={styles.emptySubText}>Hãy nhấn ❤️ để thêm sách vào đây.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

// Bạn có thể dùng lại các style từ Information.js hoặc SearchResult.js
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F3F6FF' // Màu nền từ Information.js
  },
  header: {
    paddingVertical: 14,
    backgroundColor: '#3B82F6', // Màu header từ Information.js
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  emptySubText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 8
  },
  // Styles copy từ SearchResult.js
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#41bc66",
    width: "90%",
  },
  subText: {
    fontSize: 17,
    color: "#000000"
  },
  btn: {
    marginVertical: 10
  }
});

export default FavoritesScreen;