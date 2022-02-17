import { FeedItem, Header, PostModal } from 'components';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useEffect, useState } from 'react';

import { ScreenProps } from 'typings/global';
import { userService } from 'services';

const SearchScreen = ({ navigation }: ScreenProps<'Home'>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [posts, setPosts] = useState<any>([]);
  const [searchText, setSearchText] = useState('');

  const getPosts = async (text: string) => {
    let posts = await userService.searchPosts(text);
    setPosts(posts);
  };

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      if (searchText.length) {
        getPosts(searchText);
      }
    }, 1000);

    return () => clearTimeout(debounceInput);
  }, [searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Header navigation={navigation} />
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={(e) => setSearchText(e)}
        placeholder='Search'
        placeholderTextColor='rgba(54,54,54,1)'
      />
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
  input: {
    backgroundColor: '#0a0a0a',
    borderColor: '#363535',
    borderStyle: 'solid',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: '#fafafa',
    borderRadius: 2,
    marginVertical: 10,
  },
});

export default SearchScreen;
