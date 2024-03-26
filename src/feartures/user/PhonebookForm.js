import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch} from 'react-redux';
import {create} from './userSlice';

export default function PhonebookForm(props) {
  const [isFocus, setIsFocus] = useState(false);
  const [provinsi, setProvinsi] = useState(null);
  const [kota, setKota] = useState(null);
  const [kecamatan, setKecamatan] = useState(null);
  const [kelurahan, setKelurahan] = useState(null);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: '',
    phone: '',
    biodata: '',
  });

  const [provinsiData, setProvinsiData] = useState([]);
  const [kotaData, setKotaData] = useState([]);
  const [kecamatanData, setKecamatanData] = useState([]);
  const [kelurahanData, setKelurahanData] = useState([]);

  // wilayah

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json',
    };

    axios(config)
      .then(function (response) {
        var provinsi = Object.keys(response.data).length;
        let provinsiArray = [];
        for (let i = 0; i < provinsi; i++) {
          provinsiArray.push({
            label: response.data[i].name,
            value: response.data[i].id,
          });
        }
        setProvinsiData(provinsiArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // provinsi
  const handleState = provinceId => {
    var config = {
      method: 'get',
      url: `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`,
    };

    axios(config)
      .then(function (response) {
        var kota = Object.keys(response.data).length;
        let kotaArray = [];
        for (let i = 0; i < kota; i++) {
          kotaArray.push({
            label: response.data[i].name,
            value: response.data[i].id,
          });
        }
        setKotaData(kotaArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // kota

  const handleKecamatan = regencyId => {
    var config = {
      method: 'get',
      url: `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${regencyId}.json`,
    };

    axios(config)
      .then(function (response) {
        var kecamatan = Object.keys(response.data).length;
        let kecamatanArray = [];
        for (let i = 0; i < kecamatan; i++) {
          kecamatanArray.push({
            label: response.data[i].name,
            value: response.data[i].id,
          });
        }
        setKecamatanData(kecamatanArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // kec
  const handleKelurahan = districtId => {
    var config = {
      method: 'get',
      url: `https://emsifa.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`,
    };
    axios(config)
      .then(function (response) {
        var kelurahan = Object.keys(response.data).length;
        let kecamatanArray = [];
        for (let i = 0; i < kelurahan; i++) {
          kecamatanArray.push({
            label: response.data[i].name,
            value: response.data[i].id,
          });
        }
        setKelurahanData(kecamatanArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = useCallback(() => {
    dispatch(create(user.name, user.phone, user.phone));
    setUser({name: '', phone: ''});
  }, [dispatch, user]);

  const handleCencel = () => {
    setUser({name: '', phone: ''});
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>First Name</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={name => setUser({...user, firstname})}
          defaultValue={user.firstname}
        />
      </View>
      <View>
        <Text style={styles.text}>Last Name</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={lastname => setUser({...user, lastname})}
          defaultValue={user.lastname}
        />
      </View>
      <View>
        <Text style={styles.text}>Biodata</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Biodata"
          multiline
          onChangeText={biodata => setUser({...user, biodata})}
          defaultValue={user.biodata}
        />
      </View>
      <View>
        <Text style={styles.text}>Provinsi</Text>
      </View>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={provinsiData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={provinsi}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setProvinsi(item.value);
          handleState(item.value);
          setIsFocus(false);
        }}
      />
      <View>
        <Text style={styles.text}>Kota</Text>
      </View>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={kotaData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={kota}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          handleKecamatan(item.value);
          setKota(item.value);
          setIsFocus(false);
        }}
      />
      <View>
        <Text style={styles.text}>Kecamatan</Text>
      </View>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={kecamatanData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={kecamatan}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          handleKelurahan(item.value);
          setKecamatan(item.value);
          setIsFocus(false);
        }}
      />
      <View>
        <Text style={styles.text}>Kelurahan</Text>
      </View>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={kelurahanData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={kelurahan}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setKelurahan(item.value);
          setIsFocus(false);
        }}
      />
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.line} />
        <View>
          <Text style={{width: 50, textAlign: 'center'}}>Form</Text>
        </View>
        <View style={styles.line} />
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
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontFamily: 'OpenSans-regular',
  },
  dropdown: {
    margin: 1,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
