import { useState, useEffect } from 'react';
import { storage } from '../lib/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const useFsDownloadUrl = (fileName: string) => {
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [gettingDownloadUrl, setGettingDownloadUrl] = useState(false);

  useEffect(() => {
    if (fileName) {
      setGettingDownloadUrl(true);
      const storageRef = ref(storage, `/stepImages/${fileName}`);
      getDownloadURL(storageRef)
        .then((url) => {
          setDownloadUrl(url);
        })
        .catch((error) => {
          console.log(error);
          setDownloadUrl('');
        })
        .finally(() => {
          setGettingDownloadUrl(false);
        });
    }
  }, [fileName, setDownloadUrl]);

  return { downloadUrl, gettingDownloadUrl };
};

export default useFsDownloadUrl;
