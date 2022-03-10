import React, { useContext } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { deleteTaskById } from '../API/todoAPI';
import { TokenContext } from '../Contexte/Context';

export default function TaskCard (props) {
    const [token, setToken] = useContext(TokenContext);

    return (
        <View style={[style.card, props.style]}>
            <Text style={{width: "85%"}} onPress={props.onPress}>{props.text}</Text>
            <TouchableOpacity onPress={() => {
                deleteTaskById(props.id, token)
                .then(json => {
                    props.setData(props.data.filter(item => (item.id != props.id)));
                })
                .catch(err => {
                    console.log(err);
                });
            }}>
                <Image style={style.bin} source={require("../assets/supprimer.png")}/>
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
        alignItems: 'center'
    },
    bin: {
        height: 30,
        width: 30,
    }
});