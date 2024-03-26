// import * as FileSystem from 'expo-file-system';
// import * as imagePicker from 'expo-image-picker';
import {useCallback, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {searchUser} from './userSlice';

// const imgDir = FileSystem.documentDirectory;
// +'image/';

// const ensureDirExists = async () => {
//   const dirInfo = await FileSystem.getInfoAsync(imgDir);
//   if (!dirInfo.exists) {
//     await FileSystem.makeDirectoryAsync(imgDir, {intermediates: true});
//   }
// };

export default function PhonebookForm(props) {
  const dispatch = useDispatch();
  const [userNik, setUsernik] = useState({
    nik: '',
  });

  // const selectImages = async Use => {
  //   const result = await imagePicker.launchCameraAsync({
  //     mediaTypes: imagePicker.MediaTypeOptions.Images,
  //   });

  //   if (!result.cenceled) {
  //     await FileSystem.copyAsync({
  //       from: result.uri,
  //       to: imgDir + result.uri.split('/').pop(),
  //     });
  //   }
  // };

  const handleCencel = () => {
    setUsernik({nik: ''});
  };

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      dispatch(searchUser({nik: user.nik}));
      setUsernik({nik: ''});
    },
    [dispatch, userNik],
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 20,
        }}>
        <Button title="Photo Library" onPress={() => selectImage(true)} />
        <Button title="Capture Image" onPress={() => selectImage(false)} />
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
