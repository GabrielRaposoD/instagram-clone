import { FeedItem, Header, PostModal } from 'components';
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { ScreenProps } from 'typings/global';
import { auth } from 'services';
import feedStore from 'stores/feed';
import { useState } from 'react';

const HomeScreen = ({ navigation }: ScreenProps<'Home'>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const { feed: posts } = feedStore(auth.currentUser!.uid);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Header navigation={navigation} />
      <FlatList
        style={styles.postsContainer}
        data={posts}
        renderItem={({ item }) => (
          <FeedItem
            item={item}
            setCurrentItem={setCurrentPost}
            setModalVisible={setModalVisible}
            navigation={navigation}
          />
        )}
        keyExtractor={(post) => post.id}
      />
      <PostModal
        post={currentPost}
        isOpen={modalVisible}
        setIsOpen={setModalVisible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  postsContainer: {
    flexDirection: 'column',
    padding: 20,
  },
  postItem: {
    width: '100%',
    height: 400,
    marginBottom: 10,
    borderColor: '#1b1919',
    borderWidth: 1,
  },
});

export default HomeScreen;
