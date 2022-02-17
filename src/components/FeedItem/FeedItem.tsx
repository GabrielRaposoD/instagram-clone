import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import userStore from 'stores/user';

const FeedItem = ({
  item,
  setCurrentItem,
  setModalVisible,
  navigation,
}: any) => {
  const { user } = userStore(item.user);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.infoContainer}
        onPress={() => navigation.navigate('Profile', { userId: user?.id })}
      >
        <Image style={styles.profileImage} source={{ uri: item.imageUrl }} />
        <Text style={styles.text}>{user?.name}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setCurrentItem(item);
          setModalVisible(true);
        }}
      >
        <Image style={styles.postItem} source={{ uri: item.imageUrl }} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  infoContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  text: { color: 'white', marginLeft: 10 },
  postItem: {
    width: '100%',
    height: 400,
    marginBottom: 10,
    borderColor: '#1b1919',
    borderWidth: 1,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginBottom: 5,
  },
});

export default FeedItem;
