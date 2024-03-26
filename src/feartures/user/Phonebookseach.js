import { useCallback, useState } from "react";
import { useDispatch } from 'react-redux'
import { TouchableOpacity, View, StyleSheet, TextInput, Text, Button } from 'react-native';

import {
    searchUser
} from './userSlice';

export default function PhonebookForm(props) {
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        name: '',
        phone: ''
    });

    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        dispatch(searchUser({ name: user.name, phone: user.phone }))
        setUser({ name: '', phone: '' })
    }, [dispatch, user])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Name</Text>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Type here to name"
                    onChangeText={name => setUser({ ...user, name })}
                    defaultValue={user.name}
                />
            </View>
            <View>
                <Text style={styles.text}>Phone</Text>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Type here to name"
                    onChangeText={phone => setUser({ ...user, phone })}
                    defaultValue={user.phone}
                />
            </View>
            <View >
                <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <TouchableOpacity>
                        <Button
                            color="limegreen"
                            title="Search"
                            onPress={handleSubmit}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.line} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center' }}>Search</Text>
                </View>
                <View style={styles.line} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        margin: 2,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'black'
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
})
