import { auth, firebase } from './firebase';

import { User } from 'typings/global';
import { mediaService } from './media';

export const userService = {
  login: async (email: string, password: string) => {
    await auth.signInWithEmailAndPassword(email, password);
  },
  signOut: async () => {
    await firebase.auth().signOut();
  },
  register: async (data: Pick<User, 'email' | 'password' | 'name'>) => {
    await auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) =>
        firebase
          .firestore()
          .collection('users')
          .doc(userCredential.user?.uid)
          .set({
            id: userCredential.user?.uid,
            email: userCredential.user?.email,
            name: data.name,
            posts: [],
            followers: [],
            following: [],
            likes: [],
            profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              data.name
            )}`,
          })
      );
  },
  findOne: async (userId: string) =>
    await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then((r) => r.data()),
  follow: async (userId: string, followId: string) => {
    await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .update({
        following: firebase.firestore.FieldValue.arrayUnion(followId),
      });
    await firebase
      .firestore()
      .collection('users')
      .doc(followId)
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion(userId),
      });
  },
  unfollow: async (userId: string, followId: string) => {
    await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .update({
        following: firebase.firestore.FieldValue.arrayRemove(followId),
      });
    await firebase
      .firestore()
      .collection('users')
      .doc(followId)
      .update({
        followers: firebase.firestore.FieldValue.arrayRemove(userId),
      });
  },
  updateProfileImage: async (userId: string, imageUri: string) => {
    const url = await mediaService.upload(
      'profile' + userId + '.png',
      imageUri
    );
    await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .update({ profileImage: url });
  },
  createPost: async (userId: string, imageUri: string) => {
    const url = await mediaService.upload('post' + imageUri + '.png', imageUri);
    await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .update({
        posts: firebase.firestore.FieldValue.arrayUnion(userId + imageUri),
      });

    await firebase
      .firestore()
      .collection('posts')
      .doc()
      .set({
        imageUrl: url,
        likes: [],
        userId: userId,
        id: userId + imageUri,
        createdAt: new Date().toISOString(),
        user: userId,
      });
  },
  findPosts: async (userId: string) => {
    let data: firebase.firestore.DocumentData[] = [];
    const docs = await firebase
      .firestore()
      .collection('posts')
      .where('user', '==', userId)
      .get();

    docs.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  },
  likePosts: async (userId: string, postId: string) => {
    await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(postId),
      });
    await firebase
      .firestore()
      .collection('posts')
      .where('id', '==', postId)
      .get()
      .then((docs) =>
        docs.forEach((doc) => {
          doc.ref.update({
            likes: firebase.firestore.FieldValue.arrayUnion(userId),
          });
        })
      );
  },
  getFeed: async (userId: string) => {
    let feed: any = [];
    const user = await userService.findOne(userId);
    const userPosts = await userService.findPosts(user?.id);

    user?.following.forEach((userId: string) => {
      const data = firebase
        .firestore()
        .collection('posts')
        .where('user', '==', userId)
        .get();
      feed.push(data.then((r) => r.docs.map((r) => r.data())));
    });

    const parsedData = await (await Promise.all(feed)).flat();

    return [...parsedData, ...userPosts];
  },
  searchPosts: async (searchText: string) => {
    let posts: any = [];
    const users = await firebase
      .firestore()
      .collection('users')
      .where('name', '==', searchText)
      .get();

    users.forEach((doc) => {
      const data = userService.findPosts(doc.data().id);
      posts.push(data);
    });

    const data = await (await Promise.all(posts)).flat();

    return data;
  },
};
