import React, { useContext } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { deleteTaskLists } from '../API/todoAPI';
import { TokenContext } from '../Contexte/Context';

export default function TodoCard (props) {
    const [token, setToken] = useContext(TokenContext);

    return (
        <View style={[style.card, props.style]}>
            <Text style={{width: "85%", fontWeight: 'bold'}} onPress={props.onPress}>{props.text}</Text>
            <TouchableOpacity onPress={() => {
                deleteTaskLists(props.id, token)
                .then(json => {
                    props.setData(props.data.filter(item => (item.id != props.id)));
                })
                .catch(err => {
                    console.log(err);
                });
            }}>
                <Image style={style.bin} source={require("../assets/remove.png")}/>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'snow'
    },
    bin: {
        height: 30,
        width: 30,
    }
});