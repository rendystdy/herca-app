import { StyleSheet, FlatList, Image, Pressable } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import Users from '../../constants/Users';
import IconArrowRight from '../../assets/images/icon-arrow-right.png';
import { Link, router } from 'expo-router';

interface IItem {
  item: {
    id: number;
    name: string;
    avatar: string;
    phone: string;
    email: string;
  }
}

export default function TabOneScreen() {
  const renderItem = ({item}: IItem) => {
    return (
      <Pressable onPress={() => {
        router.push('/detail_user');
        router.setParams({
          name: item.name,
          avatar: item.avatar,
          phone: item.phone,
          email: item.email,
          id: item.id.toString(),
        })
      }}>
        <View style={styles.wrapper}>
          <View style={styles.wrapperImg}>
            <Image resizeMode='cover' source={{uri: item.avatar}} style={styles.avatar} />
          </View>
          <View>
            <Text style={styles.name}>{item.name}</Text>
          </View>
              <Image source={IconArrowRight} style={styles.iconArrowRight} />
        </View>
      </Pressable>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={Users.data}
        contentContainerStyle={{
          paddingHorizontal: 6
        }}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
    borderRadius: 8
  },
  gap: {
    height: 6,
  },
  avatar: {
    flex: 1,
    width: '100%',
    height: 'auto',
    // borderRadius: 80 / 2
  },
  wrapperImg: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    marginRight: 8
  },
  name: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  iconArrowRight: {
    width: 32,
    height: 32
  }
});
