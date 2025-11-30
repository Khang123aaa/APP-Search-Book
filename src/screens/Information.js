import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';

const members = [
  { id: '1', thumbnail: require('../assets/images/images (1).png'), name: 'Nguyễn Duy Khang', class: 'Lớp: CD DTTT 23MT', mssv: '0308231122' },
  { id: '2', thumbnail: require('../assets/images/images (2).png'), name: 'Nguyễn Anh Khoa', class: 'Lớp: CD DTTT 23MT', mssv: '0308231123' },
  { id: '3', thumbnail: require('../assets/images/images.png'), name: 'Trần Minh Lý', class: 'Lớp: CD DTTT 23MT', mssv: '0308231124' },
];

const Header = ({ width }) => (
  <View style={styles.header}>
    <Text style={[styles.title, { fontSize: width > 420 ? 24 : 20 }]}>Thành viên nhóm</Text>
    <Text style={styles.subtitle}>Nhóm phát triển ứng dụng SearchBook</Text>
  </View>
);

const MemberCard = ({ item, index }) => (
  <View style={styles.memberCard}>
    <View style={styles.avatarWrap}>
      <Image source={item.thumbnail} style={styles.avatar} />
      <View style={styles.indexBadge}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
    </View>

    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
    <Text style={styles.class}>{item.class}</Text>
    <Text style={styles.mssv}>MSSV: {item.mssv}</Text>
  </View>
);

export default function Information() {
  const { width, height } = useWindowDimensions();

  const centerStyle = [
  styles.centerWrap,
  // Luôn căn lề trên, bất kể chiều cao màn hình
  { justifyContent: 'flex-start', paddingTop: 18 } 
];

  return (
    <SafeAreaView style={styles.safe}>
      <Header width={width} />

      <View style={centerStyle}>
        <View style={styles.panel}>
          <FlatList
            data={members}
            keyExtractor={(i) => i.id}
            renderItem={({ item, index }) => <MemberCard item={item} index={index} />}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© {new Date().getFullYear()} Nhóm CD DTTT 23MT</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F6F8FF',
  },
  header: {
    paddingVertical: 18,
    paddingHorizontal: 0,
    backgroundColor: '#0F172A',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    alignItems: 'center',
    zIndex: 20,
    elevation: 20,
  },
  title: {
    color: '#fff',
    fontWeight: '800',
  },
  subtitle: {
    color: '#AEB8CC',
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  panel: {
    flex: 1,
    width: '100%',
    maxWidth: 720,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E8EEF8',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
    zIndex: 1,
  },
  list: { paddingVertical: 6 },
  separator: { height: 8 },
  memberCard: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: '#EEF2FF',
  },
  indexBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#2563EB',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  indexText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  name: {
    fontSize: 19,
    fontWeight: '700',
    color: '#000000ff',
    textAlign: 'center',
  },
  class: {
    marginTop: 6,
    color: '#005f69',
    fontSize: 15,
    textAlign: 'center',
  },
  mssv: {
    marginTop: 4,
    color: '#5c7495ff',
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  footerText: {
    color: '#9AA3B4',
    fontSize: 12,
  },
});
