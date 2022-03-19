import React, { useContext } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { deleteTaskLists } from '../API/todoAPI';
import { TokenContext } from '../Contexte/Context';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TodoCard (props) {
    const [token, setToken] = useContext(TokenContext);

    return (
        <View style={[style.card, props.style]}>
            <Text style={{width: "90%", fontWeight: 'bold', color: '#ddd'}} onPress={props.onPress}>{props.text}</Text>
            <TouchableOpacity onPress={() => {
                deleteTaskLists(props.id, token)
                .then(json => {
                    props.setData(props.data.filter(item => (item.id != props.id)));
                })
                .catch(err => {
                    console.log(err);
                });
            }}>
                <Icon color="#ddd" size={20} name="times"/>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    card: {
        borderRadius: 25,
        padding: 15,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#5450d6'
    },
    bin: {
        height: 30,
        width: 30,
    }
});