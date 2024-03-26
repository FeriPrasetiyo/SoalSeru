import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PhonebookForm from './PhonebookForm';
import PhonebookUpload from './PhonebookUpload';
import PhonebookList from './PhonebookList';

export default function Phonebook(props) {
  const [add, setAdd] = useState({
    isAdd: true,
  });

  const handleAdd = () => {
    setAdd({
      isAdd: true,
    });
  };

  const handleSearch = () => {
    setAdd({
      isAdd: false,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Tes Apps</Text>
      </View>
      <View style={styles.colom}>
        <TouchableOpacity onPress={handleAdd}>
          <Text style={styles.label}>Formulir Klaim</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.colom}>
        <TouchableOpacity onPress={handleSearch}>
          <Text style={styles.label}>Foto SIM & STNK</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.colom}>
        <TouchableOpacity onPress={handleSearch}>
          <Text style={styles.label}>Klaim Kerusakan Kendaraan</Text>
        </TouchableOpacity>
      </View>
      <View>{add.isAdd ? <PhonebookForm /> : <PhonebookUpload />}</View>
      <View>
        <PhonebookList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    backgroundColor: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    height: 70,
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
  colom: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    fontFamily: 'OpenSans-regular',
    fontSize: 20,
  },
});
