import { Image, StyleSheet } from 'react-native'
import { Text, View } from '../components/Themed';
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const DetailUser = () => {
  const params = useLocalSearchParams();

  const {avatar, name, email, phone} = params;

  return (
    <View style={styles.container}>
      <View>
        <Image resizeMode='cover' source={{uri: `${avatar}` }} style={styles.avatar} />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Name: {name}</Text>
        <Text style={styles.title}>Phone: {phone}</Text>
        <Text style={styles.title}>Email: {email}</Text>
      </View>
    </View>
  )
}

export default DetailUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  avatar: {
    width: '100%',
    height: 350
  },
  wrapper: {
    padding: 8
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24
  }
})