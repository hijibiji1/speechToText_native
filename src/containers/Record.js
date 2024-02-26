import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Voice from '@react-native-voice/voice';
import {themeColors} from '../theme';

const Record = () => {
  const [speechText, setSpeechText] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleSave = async () => {
    console.log('save');
  };

  const handleClear = () => {
    setSpeechText('');
  };

  //function for speaking

  const speechStartHandler = e => {
    console.log('speechStart successful', e);
  };

  const speechEndHandler = e => {
    setLoading(false);
    console.log('stop handler', e);
  };

  const onSpeechError = e => {
    console.log('onSpeechError: ', JSON.stringify(e.error));
  };

  const speechResultsHandler = e => {
    const text = e.value[0];
    console.log('this is result', text);
    setSpeechText(prvText => prvText + text + ' ');
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.speechText}>Speech To Text</Text>
        <View style={styles.containerCard}>
          <TextInput
            multiline
            textAlignVertical="top"
            style={styles.textInput}
            onChangeText={setSpeechText}
            value={speechText}
            editable={true}
          />
          <View style={styles.buttonContainer}>
            <Pressable style={styles.otherBtn} onPress={handleSave}>
              <Icon
                name={'content-save'}
                size={30}
                strokeWidth={2}
                color={themeColors.white}
              />
            </Pressable>

            <Pressable style={styles.otherBtn} onPress={handleClear}>
              <Icon
                name={'delete'}
                size={30}
                strokeWidth={2}
                color={themeColors.white}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.voiceContainer}>
        <Pressable
          style={styles.recordingButton}
          onPress={!isLoading ? startRecording : stopRecording}>
          <Icon
            name={!isLoading ? 'microphone' : 'stop'}
            size={70}
            strokeWidth={2}
            color={themeColors.white}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.white,
  },
  inputContainer: {
    flex: 1,
    padding: 10,
  },
  containerCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  speechText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  textInput: {
    padding: 10,
    borderColor: '#d1d5db',
    borderWidth: 1,
    height: 200,
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recordingButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors.primary,
  },
  voiceContainer: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  otherBtn: {
    height: 50,
    width: 50,
    borderRadius: 30,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors.primary,
  },
});

export default Record;
