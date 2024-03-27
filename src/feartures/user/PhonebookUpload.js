import {useCallback, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {createCard} from './userSlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function PhonebookForm(props) {
  const dispatch = useDispatch();
  const [userNik, setUsernik] = useState({
    nik: '',
    imageUri: '',
  });

  const handleCencel = () => {
    setUsernik({nik: '', imageUri: ''});
  };

  const handleSubmit = useCallback(() => {
    dispatch(createCard(userNik.nik, userNik.imageUri));
    setUsernik({
      nik: '',
      imageUri: '',
    });
  }, [dispatch, userNik]);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setUsernik({...userNik, imageUri});
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        // Process the captured image
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setUsernik({...userNik, imageUri});
      }
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: '100px',
        }}>
        {userNik.imageUri !== '' ? (
          <Image
            source={{uri: userNik.imageUri}}
            style={{width: 150, height: 150}}
          />
        ) : null}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 20,
        }}>
        <Button title="Photo Library" onPress={openImagePicker} />
        <Button title="Capture Image" onPress={handleCameraLaunch} />
      </View>
      <View>
        <Text style={styles.text}>Nik</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Type here to name"
          onChangeText={nik => setUsernik({...userNik, nik})}
          defaultValue={userNik.nik}
        />
      </View>
      <View>
        <View style={{paddingTop: 10, paddingBottom: 10}}>
          <TouchableOpacity>
            <Button color="mediumblue" title="Save" onPress={handleSubmit} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Button color="orange" title="Cencel" onPress={handleCencel} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    margin: 2,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  input: {
    height: 40,
    margin: 5,
    marginStart: -1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontFamily: 'OpenSans-regular',
  },
});
