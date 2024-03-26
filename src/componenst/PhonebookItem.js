import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {updateUserAsync} from '../feartures/user/userSlice';

export default function PhonebookItem(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: props.user.name,
    phone: props.user.phone,
  });

  const [status, setStatus] = useState({
    isEdit: false,
  });

  const handleEdit = () => {
    setStatus({
      isEdit: true,
    });
  };

  const handleCencel = () => {
    setUser({
      name: props.user.name,
      phone: props.user.phone,
    });
    setStatus({
      isEdit: false,
    });
  };

  const saveEdit = () => {
    dispatch(
      updateUserAsync({id: props.user.id, name: user.name, phone: user.phone}),
    );
    setStatus({isEdit: false});
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconuser}>
        <Ionicon name="person-circle" size={50} />
      </View>
      <View style={styles.boxedit}>
        <View style={{flexDirection: 'row'}}>
          <Text style={status.isEdit ? styles.fonttextedit : styles.fonttext}>
            Name
          </Text>
          <Text style={status.isEdit ? styles.titikedit : styles.titik}>:</Text>
          {status.isEdit ? (
            <TextInput
              style={styles.input}
              placeholder="Type here to name"
              onChangeText={name => setUser({...user, name})}
              defaultValue={user.name}
            />
          ) : (
            <Text style={styles.fonttext}>{user.name}</Text>
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={status.isEdit ? styles.fonttextedit : styles.fonttext}>
            Phone
          </Text>
          <Text style={status.isEdit ? styles.titikedit : styles.titikphone}>
            :
          </Text>
          {status.isEdit ? (
            <TextInput
              style={styles.input}
              placeholder="Type here to name"
              onChangeText={phone => setUser({...user, phone})}
              defaultValue={user.phone}
            />
          ) : (
            <Text style={styles.fonttext}>{user.phone}</Text>
          )}
        </View>
      </View>
      <View style={styles.tableIcon}>
        <TouchableOpacity
          style={
            props.user.sent
              ? status.isEdit
                ? styles.save
                : styles.edit
              : styles.resend
          }
          onPress={
            props.user.sent
              ? status.isEdit
                ? saveEdit
                : handleEdit
              : props.resend
          }>
          <Text style={styles.icon}>
            {props.user.sent ? (
              <Text>
                {status.isEdit ? (
                  <Ionicon name="save-outline" size={30} />
                ) : (
                  <Ionicon name="create-outline" size={30} />
                )}
              </Text>
            ) : (
              <Text>
                <Ionicon name="checkmark-circle-outline" size={30} />
              </Text>
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            props.user.sent
              ? status.isEdit
                ? styles.cencel
                : styles.delete
              : false
          }
          onPress={
            props.user.sent
              ? status.isEdit
                ? handleCencel
                : props.remove
              : false
          }>
          <Text style={styles.icon}>
            {props.user.sent ? (
              <Text>
                {status.isEdit ? (
                  <Ionicon name="reload-outline" size={30} />
                ) : (
                  <Ionicon name="trash-outline" size={30} />
                )}
              </Text>
            ) : (
              false
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'lightgray',
  },
  edit: {
    color: 'green',
    backgroundColor: 'green',
    borderRadius: 60,
    width: 40,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
  },
  icon: {
    left: 5,
    top: 3,
    color: 'white',
  },
  delete: {
    color: 'red',
    backgroundColor: 'red',
    borderRadius: 60,
    width: 40,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
  },
  tableIcon: {
    flex: 1,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  fonttext: {
    fontFamily: 'OpenSans-Bold',
  },
  fonttextedit: {
    fontFamily: 'OpenSans-Bold',
    right: 10,
  },
  iconuser: {
    flex: 1,
    left: 10,
  },
  titik: {
    paddingLeft: 7,
    paddingRight: 2,
  },
  titikedit: {
    right: 10,
    paddingLeft: 7,
    paddingRight: 2,
  },
  boxedit: {
    flex: 2,
    right: 20,
    paddingTop: 5,
  },
  titikphone: {
    paddingLeft: 4,
    paddingRight: 2,
  },
  save: {
    color: 'blue',
    backgroundColor: 'blue',
    borderRadius: 60,
    width: 40,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
  },
  cencel: {
    color: 'darkorange',
    backgroundColor: 'darkorange',
    borderRadius: 60,
    width: 40,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
  },
  resend: {
    color: 'darkorange',
    backgroundColor: 'darkorange',
    borderRadius: 60,
    width: 40,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
  },
  input: {
    height: 40,
    margin: 5,
    marginStart: -10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontFamily: 'OpenSans-regular',
  },
});
