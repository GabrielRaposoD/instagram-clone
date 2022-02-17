import { ActivityFeed, Messages, NewPost } from 'assets/icons';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { CurrentUserContext } from 'contexts';
import { pickImage } from 'utils/pickImage';
import { useContext } from 'react';
import { userService } from 'services';

const Header = ({ navigation }: any) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('assets/images/logo-typed.png')} />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={() => pickImage(userService.createPost, currentUser.id)}
        >
          <NewPost style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <ActivityFeed style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Messages style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
});

export default Header;
