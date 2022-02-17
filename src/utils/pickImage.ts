import * as ImagePicker from 'expo-image-picker';

export const pickImage = async (action: any, userId: string) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    action(userId, result.uri);
  }
};
