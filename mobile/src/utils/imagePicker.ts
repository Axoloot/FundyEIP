import * as ImagePicker from 'expo-image-picker';
import { ModifyUser } from '../Contexts/AuthContext';

const pickImage = async (cb: React.Dispatch<React.SetStateAction<ModifyUser>>): Promise<void> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== 'granted') return;

  const result = await ImagePicker.launchImageLibraryAsync({
    base64: true,
    quality: 0.05,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (!result.canceled) {
    cb({ profilePicture: `data:image/jpeg;base64,${result.assets[0].base64}`, edited: true });
  }
};

export default pickImage;
