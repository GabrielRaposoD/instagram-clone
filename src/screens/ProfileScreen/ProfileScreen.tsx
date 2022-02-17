import {
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header, PostModal } from 'components';
import { useContext, useState } from 'react';

import { CurrentUserContext } from 'contexts';
import { ScreenProps } from 'typings/global';
import { pickImage } from 'utils/pickImage';
import { userService } from 'services';
import userStore from 'stores/user';

const ProfileScreen = ({ navigation, route }: ScreenProps<'Profile'>) => {
  const { userId } = route.params;
  const { user, posts } = userStore(userId);
  const { currentUser } = useContext(CurrentUserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);

  const PostItem = ({ item }: any) => {
    return (
      <Pressable
        onPress={() => {
          setCurrentPost(item);
          setModalVisible(true);
        }}
      >
        <Image style={styles.postItem} source={{ uri: item.imageUrl }} />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Header navigation={navigation} />
      {user && (
        <>
          <View style={styles.profileContainer}>
            <View style={styles.infoContainer}>
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  onPress={async () => {
                    await pickImage(userService.updateProfileImage, userId);
                  }}
                >
                  <Image
                    style={styles.profileImage}
                    source={{
                      uri: user.profileImage,
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>{user.name}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{user.posts.length}</Text>
                <Text style={styles.text}>Posts</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{user.followers.length}</Text>
                <Text style={styles.text}>Followers</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{user.following.length}</Text>
                <Text style={styles.text}>Following</Text>
              </View>
              <Button
                title={'sign out'}
                onPress={() => userService.signOut()}
              />
              {currentUser.id != userId && (
                <Button
                  title={
                    currentUser?.following.includes(userId)
                      ? 'Unfollow'
                      : 'Follow'
                  }
                  onPress={() =>
                    currentUser?.following.includes(userId)
                      ? userService.unfollow(currentUser.id, userId)
                      : userService.follow(currentUser.id, userId)
                  }
                />
              )}
            </View>
          </View>
          <FlatList
            style={styles.postsContainer}
            data={posts}
            renderItem={PostItem}
            keyExtractor={(post) => post.id}
          />
          <PostModal
            post={currentPost}
            isOpen={modalVisible}
            setIsOpen={setModalVisible}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  profileContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'column',
    borderStyle: 'solid',
    borderColor: '#201f1f99',
    borderBottomWidth: 1,
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    marginBottom: 5,
  },
  text: {
    color: 'white',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
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

export default ProfileScreen;
