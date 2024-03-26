import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PhonebookItem from '../../componenst/PhonebookItem';

import {
  addUserAsync,
  loadUserAsync,
  loadmore,
  removeUserAsync,
  selectUser,
} from './userSlice';

export default function PhonebookList() {
  const users = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserAsync());
  }, [dispatch]);

  const scrolling = event => {
    dispatch(loadmore());
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>Name</Text>
        <Text style={styles.contact}>Contact </Text>
        <Text style={styles.action}>Action</Text>
      </View>
      <View>
        <FlatList
          data={users}
          renderItem={({item, index}) => (
            <PhonebookItem
              key={item.id}
              no={index + 1}
              user={item}
              remove={() => dispatch(removeUserAsync(item.id))}
              resend={() =>
                dispatch(
                  addUserAsync({
                    id: item.id,
                    name: item.name,
                    phone: item.phone,
                  }),
                )
              }
            />
          )}
          keyExtractor={users => users.id}
          onEndReached={scrolling}
          onEndReachedThreshold={0.3}
          style={{maxHeight: 300}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    right: 30,
  },
  name: {
    fontFamily: 'OpenSans-regular',
    left: 4,
  },
  contact: {
    fontFamily: 'OpenSans-regular',
    right: 20,
  },
  action: {
    fontFamily: 'OpenSans-regular',
    left: 30,
  },
});
