import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { ActivityFeed } from 'assets/icons';
import { BlurView } from 'expo-blur';
import { CurrentUserContext } from 'contexts';
import { useContext } from 'react';
import { userService } from 'services';

const PostModal = ({ post, isOpen, setIsOpen }: any) => {
  const { currentUser } = useContext(CurrentUserContext);
  const date = new Date(post?.createdAt);
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(!isOpen);
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOpen(!isOpen);
        }}
      >
        <BlurView style={StyleSheet.absoluteFill} tint='dark' intensity={50} />
      </TouchableWithoutFeedback>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image style={styles.postItem} source={{ uri: post?.imageUrl }} />
          <View style={styles.infoContainer}>
            <Text style={styles.textStyle}>
              Created at:{' '}
              {date.getDate() +
                '/' +
                (date.getMonth() + 1) +
                '/' +
                date.getFullYear()}
            </Text>
            <Text style={styles.textStyle}>Likes: {post?.likes.length}</Text>
            <TouchableOpacity
              onPress={() => userService.likePosts(currentUser.id, post.id)}
            >
              <ActivityFeed color='black' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  postItem: { width: 300, height: 300 },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
});

export default PostModal;
