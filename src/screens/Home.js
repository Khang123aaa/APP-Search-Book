// src/screens/Home.js
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Card from '../components/Card';

const Home = ({ navigation }) => {
  const [keyword, setKeyword] = useState('');
  const { width } = useWindowDimensions();

  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigation.navigate('SearchResult', { keyword: keyword.trim() });
  };

  const inputWidth = Math.min(720, width - 48);
  const cardStyle = StyleSheet.flatten([styles.card, { width: inputWidth }]);

  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground
        source={require('../assets/images/background_dot.png')}
        resizeMode="repeat"
        style={styles.bg}
      >
        <View style={styles.container}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>Tìm sách nhanh — Nhận kết quả tức thì</Text>

          <Card style={cardStyle}>
            <View style={styles.searchRow}>
              <View style={styles.inputWrap}>
                <FontAwesome name="search" size={18} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  placeholder="Nhập tên sách, tác giả hoặc từ khóa..."
                  value={keyword}
                  onChangeText={setKeyword}
                  returnKeyType="search"
                  onSubmitEditing={handleSearch}
                  style={styles.input}
                  placeholderTextColor="#9CA3AF"
                />
                {keyword.length > 0 && (
                  <TouchableOpacity onPress={() => setKeyword('')} style={styles.clearButton}>
                    <FontAwesome name="times-circle" size={18} color="#9CA3AF" />
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity activeOpacity={0.85} style={styles.searchButton} onPress={handleSearch}>
                <FontAwesome name="arrow-right" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.quickRow}>
              <Text style={styles.quickText}>Gợi ý:</Text>
              <View style={styles.tags}>
                <TouchableOpacity style={styles.tag} onPress={() => setKeyword('React Native')}>
                  <Text style={styles.tagText}>React Native</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tag} onPress={() => setKeyword('Lập trình Web')}>
                  <Text style={styles.tagText}>Lập trình Web</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tag} onPress={() => setKeyword('JavaScript')}>
                  <Text style={styles.tagText}>JavaScript</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tag} onPress={() => setKeyword('electronics')}>
                  <Text style={styles.tagText}>electronics</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F3F6FF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // thêm dòng này để không bị ẩn thanh trạng thái
  },
  bg: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: { height: 120, marginTop: 12, marginBottom: 6 },
  subtitle: { color: '#475569', fontSize: 14, marginBottom: 16, textAlign: 'center' },

  card: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrap: {
    flex: 1,
    position: 'relative',
    marginRight: 12,
    justifyContent: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 2,
  },
  input: {
    height: 48,
    paddingLeft: 42,
    paddingRight: 42,
    borderRadius: 12,
    backgroundColor: '#F8FAFF',
    color: '#0e214dff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E6EEF8',
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    zIndex: 2,
  },

  searchButton: {
    width: 52,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 3,
  },

  quickRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickText: { color: '#94A3B8', marginRight: 12, fontSize: 13 },
  tags: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: { color: '#3730A3', fontSize: 13, fontWeight: '600' },
});

export default Home;
