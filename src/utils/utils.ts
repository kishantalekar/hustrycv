import {Alert} from 'react-native';

//function to show alert from user then calling the callback function
export function showAlert(
  title: string,
  message: string,
  callback: () => void,
  cancelCallback?: () => void,
) {
  Alert.alert(title, message, [
    {
      text: 'Cancel',
      style: 'cancel',
      onPress: cancelCallback,
    },
    {
      text: 'OK',
      onPress: callback,
    },
  ]);
}
