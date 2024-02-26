import React from 'react';
import MainNavigation from './navigation/MainNavigation';
import {PERMISSIONS} from 'react-native-permissions';
import {requestMultiplePermissions} from './Permission';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  let permissionsValue = '';

  if (Platform.OS === 'android') {
    permissionsValue = [
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ];
  }

  if (Platform.OS === 'ios') {
    permissionsValue = [PERMISSIONS.IOS.MICROPHONE];
  }

  requestMultiplePermissions(permissionsValue);

  return <MainNavigation />;
};

export default App;
