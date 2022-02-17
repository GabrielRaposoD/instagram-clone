import { firebase } from './firebase';

export const mediaService = {
  upload: async (imageName: string, imageUri: any) => {
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imageUri, true);
      xhr.send(null);
    });

    return await firebase
      .storage()
      .ref()
      .child(imageName)
      .put(blob, { contentType: 'image/png' })
      .then((r) => r.ref.getDownloadURL().then((r) => r.toString()));
  },
};
