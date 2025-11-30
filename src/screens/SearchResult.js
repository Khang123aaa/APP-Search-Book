// src/screens/SearchResult.js
import { Button, HStack } from 'native-base';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import FavoriteButton from '../components/FavoriteButton';
import { searchBooks } from '../redux/bookAction';

const SearchResult = ({ navigation, route }) => {
  // route.params should be an object like { keyword: '...' }
  const keyword = route?.params?.keyword ?? route?.params ?? "";
  const isLoading = useSelector(store => store.book.isLoading || false);
  const dispatch = useDispatch();
  const books = useSelector(store => store.book.booksSearch || []);

  useEffect(() => {  
    dispatch(searchBooks(keyword || "@"));
  }, [keyword, dispatch]);

  const renderBookItem = (item) => {
    console.log(item)
    return (
      <>
      <Card style={{width: "95%", margin: 10}}>
        <FavoriteButton book={item} />
        <HStack>
          <Image source={{ uri: item.volumeInfo?.imageLinks?.thumbnail || "https://vntalking.com/wp-content/uploads/2022/12/No_Image_Available.jpg"}} resizeMode='contain' style={styles.thumbnail} />
          <View style={{ marginHorizontal: 1, flex: 1, justifyContent:"center", alignContent:'center'}}>
            <Text style={styles.bookTitle}>{item.volumeInfo?.title || ""}</Text>
            <Text style={styles.subText}>Ngày xuất bản: {item.volumeInfo?.publishedDate || ""}</Text>
            <Text style={styles.subText}>Số trang: {item.volumeInfo?.pageCount || 0}</Text>
            <Text style={styles.subText}>Giá: {item.saleInfo?.listPrice?.amount || "0"} {item.saleInfo?.listPrice?.currencyCode || "VND"}</Text>
            <Button onPress={() => navigation.navigate("BookDetail", item)} size="md" style={styles.btn} variant="subtle" colorScheme="secondary">Chi tiết</Button>
          </View>
        </HStack>
      </Card>
      </>
    )
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={books}
        renderItem={({item}) => renderBookItem(item)}
        ListHeaderComponent={() => (!books.length ? 
          <View style={{flex: 1, justifyContent:'center', alignContent:'center', alignItems:'center', padding: 20}}>
            <Card><Text style={{color: "#41bc66", fontSize: 20, margin: 20}}>Không tìm thấy kết quả phù hợp</Text></Card>
          </View>
          : null)}
      />
      {/** Loading UI */}
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color="#cc3333" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
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
})

export default SearchResult;